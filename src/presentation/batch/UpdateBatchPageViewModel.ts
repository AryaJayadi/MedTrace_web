import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useCallback, useMemo, useState, useEffect } from "react";
import { ROUTES } from "@/core/Routes";
import { toast } from "sonner";
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource";
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource";
import { GetBatchByID } from "@/domain/usecase/batch/GetBatchByID";
import { UpdateBatch } from "@/domain/usecase/batch/UpdateBatch";
import { UpdateBatchRequest } from "@/domain/model/batch/UpdateBatchRequest";
import { useApiRequest } from "@/core/hooks/useApiRequest";
import { Batch } from "@/domain/model/batch/Batch";
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource";
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource";
import { GetDrugsByBatch } from "@/domain/usecase/drug/GetDrugsByBatch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { formatDateForInput } from "@/lib/utils";

// Define a type for the combined fetched data
interface InitialData {
  batch: Batch;
  drugCount: number;
}

const formSchema = z.object({
  DrugName: z.string().min(1, "Drug name is required"),
  Amount: z.coerce.number().int().nonnegative("Quantity must be a non-negative number"),
  ProductionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid production date",
  }),
  ExpiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid expiry date",
  }),
}).refine(data => new Date(data.ProductionDate) < new Date(data.ExpiryDate), {
  message: "Expiry date must be after production date",
  path: ["ExpiryDate"],
});

type UpdateBatchFormValues = z.infer<typeof formSchema>;

export default function UpdateBatchPageViewModel(batchID: string) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<UpdateBatchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DrugName: "",
      Amount: 0,
      ProductionDate: "",
      ExpiryDate: "",
    },
  });

  const batchDataSource = useMemo(() => new BatchApiDataSource(), []);
  const batchRepository = useMemo(() => new BatchRepositoryDataSource(batchDataSource), [batchDataSource]);
  const drugDataSource = useMemo(() => new DrugApiDataSource(), []);
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource]);

  const getBatchByIDUseCase = useMemo(() => new GetBatchByID(batchRepository), [batchRepository]);
  const getDrugsByBatchUseCase = useMemo(() => new GetDrugsByBatch(drugRepository), [drugRepository]);

  const fetchInitialData = useCallback(async (): Promise<BaseValueResponse<InitialData>> => {
    try {
      const batchResult = await getBatchByIDUseCase.execute(batchID);
      const drugsResult = await getDrugsByBatchUseCase.execute(batchID);

      if (!batchResult.success) {
        return { success: false, error: batchResult.error || { code: 500, message: "Failed to fetch batch data." } };
      }
      if (!drugsResult.success) {
        return { success: false, error: drugsResult.error || { code: 500, message: "Failed to fetch drug data for batch." } };
      }

      // After checks, batchResult.value should not be undefined if success is true
      if (!batchResult.value) {
        return { success: false, error: { code: 404, message: "Batch not found." } };
      }

      return {
        success: true,
        value: {
          batch: batchResult.value,
          drugCount: drugsResult.list?.length || 0,
        },
      };
    } catch (e: any) {
      return { success: false, error: { code: 500, message: e.message || "An unexpected error occurred." } };
    }
  }, [batchID, getBatchByIDUseCase, getDrugsByBatchUseCase]);

  const {
    data: initialData,
    isLoading: isFetchingInitialData,
    error: fetchError,
    execute: fetchAllInitialData
  } = useApiRequest<InitialData, []>(fetchInitialData);

  const updateBatchUseCase = useMemo(() => new UpdateBatch(batchRepository), [batchRepository]);
  const updateBatch = useCallback(async (request: UpdateBatchRequest) => {
    return updateBatchUseCase.execute(request);
  }, [updateBatchUseCase]);

  useEffect(() => {
    if (batchID) {
      fetchAllInitialData();
    }
  }, [batchID, fetchAllInitialData]);

  useEffect(() => {
    if (initialData) {
      form.reset({
        DrugName: initialData.batch.DrugName,
        Amount: initialData.drugCount,
        ProductionDate: formatDateForInput(initialData.batch.ProductionDate),
        ExpiryDate: formatDateForInput(initialData.batch.ExpiryDate),
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: UpdateBatchFormValues) => {
    setIsSubmitting(true);
    setApiError(null);

    const requestData: UpdateBatchRequest = {
      ID: batchID,
      DrugName: values.DrugName,
      ProductionDate: new Date(values.ProductionDate).toISOString(),
      ExpiryDate: new Date(values.ExpiryDate).toISOString(),
    };

    try {
      const result = await updateBatch(requestData);
      if (result.success && result.value) {
        toast.success("Batch Updated", {
          description: `Batch ${result.value.ID} has been successfully updated.`,
        });
        navigate(ROUTES.FULL_PATH_APP_BATCH);
      } else {
        const errorMessage = result.error?.message || "Failed to update batch. Please try again.";
        setApiError(errorMessage);
        toast.error("Update Failed", { description: errorMessage });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred.";
      setApiError(errorMessage);
      toast.error("Update Error", { description: errorMessage });
    }
    setIsSubmitting(false);
  };

  return {
    form,
    onSubmit,
    apiError,
    isLoading: isSubmitting || isFetchingInitialData,
    isFetchingInitialData,
    fetchError,
  };
}
