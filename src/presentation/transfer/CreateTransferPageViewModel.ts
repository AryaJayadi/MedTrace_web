import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useApiRequest } from "@/core/hooks/useApiRequest";
import { OrganizationApiDataSource } from "@/data/datasource/api/OrganizationApiDataSource";
import { OrganizationRepositoryDataSource } from "@/data/repository/OrganizationRepositoryDataSource";
import { Organization } from "@/domain/model/organization/Organization";
import { GetOrganizations } from "@/domain/usecase/organization/GetOrganizations";
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource";
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource";
import { Batch } from "@/domain/model/batch/Batch";
import { GetAllBatches } from "@/domain/usecase/batch/GetAllBatches";
import { TransferApiDataSource } from "@/data/datasource/api/TransferApiDataSource";
import { TransferRepositoryDataSource } from "@/data/repository/TransferRepositoryDataSource";
import { CreateTransfer } from "@/domain/usecase/transfer/CreateTransfer";
import { CreateTransferRequest } from "@/domain/model/dto/CreateTransferRequest";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ROUTES } from "@/core/Routes";

// UI specific Batch model for the form
interface VMBatch extends Batch {
  remainingQty: number;
  selectedQty: string; // Input is string, will be parsed
  isSelected: boolean;
}

const selectedBatchSchema = z.object({
  ID: z.string(),
  DrugName: z.string(), // Keep for UI, though not directly sent
  remainingQty: z.number(),
  selectedQty: z.string() // Keep as string for input, parse on submit
    .refine(val => val === "" || /^[0-9]+$/.test(val), { message: "Must be a number" })
    .refine(val => val === "" || parseInt(val, 10) >= 0, { message: "Cannot be negative" }),
  isSelected: z.boolean(),
});

const formSchema = z.object({
  receiverId: z.string().min(1, "Receiver company is required."),
  // uiBatches are managed by local state but their selections feed into the final submission logic
  // We validate the final selection on submit, not directly via react-hook-form for the whole table
});

type CreateTransferFormValues = z.infer<typeof formSchema>;

export default function CreateTransferPageViewModel() {
  const navigate = useNavigate();

  // Form using react-hook-form
  const form = useForm<CreateTransferFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverId: "",
    },
  });

  // API States
  const [overallApiError, setOverallApiError] = useState<string | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  // Organizations
  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), []);
  const orgRepo = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource]);
  const getOrganizationsUseCase = useMemo(() => new GetOrganizations(orgRepo), [orgRepo]);
  const getOrganizations = useCallback(async () => {
    return await getOrganizationsUseCase.invoke();
  }, [getOrganizationsUseCase]);
  const { list: organizations, isLoading: organizationsIsLoading, error: organizationsError, execute: fetchOrganizations } = useApiRequest<Organization, []>(getOrganizations);

  // Batches
  const batchDataSource = useMemo(() => new BatchApiDataSource(), []);
  const batchRepo = useMemo(() => new BatchRepositoryDataSource(batchDataSource), [batchDataSource]);
  const getAllBatchesUseCase = useMemo(() => new GetAllBatches(batchRepo), [batchRepo]);
  const getAllBatches = useCallback(async () => {
    return await getAllBatchesUseCase.execute();
  }, [getAllBatchesUseCase]);
  const { list: availableBatchesFromApi, isLoading: batchesIsLoading, error: batchesError, execute: fetchBatches } = useApiRequest<Batch, []>(getAllBatches);

  // Create Transfer Use Case
  const transferDataSource = useMemo(() => new TransferApiDataSource(), []);
  const transferRepo = useMemo(() => new TransferRepositoryDataSource(transferDataSource), [transferDataSource]);
  const createTransferUseCase = useMemo(() => new CreateTransfer(transferRepo), [transferRepo]);

  // UI State for Batches (separate from react-hook-form values for complex list interaction)
  const [batchSearchQuery, setBatchSearchQuery] = useState("");
  const [uiBatches, setUiBatches] = useState<VMBatch[]>([]);

  useEffect(() => {
    fetchOrganizations();
    fetchBatches();
  }, [fetchOrganizations, fetchBatches]);

  useEffect(() => {
    if (availableBatchesFromApi) {
      setUiBatches(availableBatchesFromApi.map(b => ({
        ...b,
        // CRITICAL TODO: Replace placeholder. Accurate remainingQty requires fetching drugs for this batch 
        // or an API update to include this count directly in the Batch model.
        remainingQty: 100, // Placeholder value
        selectedQty: "",
        isSelected: false,
      })));
    }
  }, [availableBatchesFromApi]);

  const handleBatchSelectionChange = (batchId: string, isSelected: boolean) => {
    setUiBatches(prev => prev.map(b => b.ID === batchId ? { ...b, isSelected } : b));
  };

  const handleBatchQuantityChange = (batchId: string, quantity: string) => {
    setUiBatches(prev => prev.map(b => {
      if (b.ID === batchId) {
        const numQty = parseInt(quantity, 10);
        const currentRemaining = b.remainingQty;
        return {
          ...b,
          selectedQty: quantity === "" || isNaN(numQty) ? "" : String(Math.max(0, Math.min(numQty, currentRemaining)))
        };
      }
      return b;
    }));
  };

  const filteredUiBatches = useMemo(() => {
    return uiBatches.filter(
      (batch) =>
        (batch.DrugName?.toLowerCase().includes(batchSearchQuery.toLowerCase()) ||
          batch.ID.toLowerCase().includes(batchSearchQuery.toLowerCase())) &&
        batch.remainingQty > 0
    );
  }, [uiBatches, batchSearchQuery]);

  const onSubmit = async (data: CreateTransferFormValues) => {
    setIsSubmittingForm(true);
    setOverallApiError(null);

    const selectedForSubmission = uiBatches
      .filter(b => b.isSelected && b.selectedQty !== "" && parseInt(b.selectedQty, 10) > 0 && parseInt(b.selectedQty, 10) <= b.remainingQty)
      .map(b => ({
        id: b.ID,
        quantity: parseInt(b.selectedQty, 10),
        // CRITICAL TODO: This generates placeholder drug IDs. The backend expects real, existing drug IDs.
        // This logic needs to be replaced with a mechanism to select/allocate actual drug IDs.
        drugIDs: Array.from({ length: parseInt(b.selectedQty, 10) }, (_, i) => `${b.ID}-drug-${i + 1}`)
      }));

    if (selectedForSubmission.length === 0) {
      const msg = "Please select at least one batch and specify a valid quantity.";
      setOverallApiError(msg);
      toast.error("Validation Error", { description: msg });
      setIsSubmittingForm(false);
      return;
    }

    const allDrugIDsToTransfer = selectedForSubmission.reduce((acc, curr) => acc.concat(curr.drugIDs || []), [] as string[]);
    const request: CreateTransferRequest = {
      ReceiverID: data.receiverId,
      DrugsID: allDrugIDsToTransfer,
    };

    try {
      const result = await createTransferUseCase.execute(request);
      if (result.success && result.value) {
        toast.success("Transfer Created", { description: `Transfer ${result.value.ID} initiated.` });
        navigate(ROUTES.FULL_PATH_APP_TRANSFER);
      } else {
        const errorMsg = result.error?.message || "Failed to create transfer.";
        setOverallApiError(errorMsg);
        toast.error("Submission Failed", { description: errorMsg });
      }
    } catch (error: any) {
      const errorMsg = error.message || "An unexpected error occurred.";
      setOverallApiError(errorMsg);
      toast.error("Submission Error", { description: errorMsg });
    }
    setIsSubmittingForm(false);
  };

  return {
    form,
    onSubmit,
    overallApiError,
    isSubmittingForm,
    organizations,
    organizationsIsLoading,
    organizationsError,
    availableUiBatches: filteredUiBatches,
    batchesIsLoading,
    batchesError,
    batchSearchQuery,
    setBatchSearchQuery,
    handleBatchSelectionChange,
    handleBatchQuantityChange,
    uiBatches, // Pass uiBatches for direct mapping in the table view
    setUiBatches // If direct manipulation needed from component (e.g. onBlur of quantity input)
  };
}
