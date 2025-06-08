import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useCallback, useMemo, useState } from "react";
import { CreateBatchRequest } from "@/domain/model/batch/CreateBatchRequest"; // Assuming this DTO is used
import { ROUTES } from "@/core/Routes";
import { toast } from "sonner"
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource";
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource";
import { CreateBatch } from "@/domain/usecase/batch/CreateBatch";

const formSchema = z.object({
  DrugName: z.string().min(1, "Drug name is required"),
  Amount: z.coerce.number().int().positive("Quantity must be a positive number"),
  ProductionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid production date",
  }),
  ExpiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid expiry date",
  }),
}).refine(data => new Date(data.ProductionDate) < new Date(data.ExpiryDate), {
  message: "Expiry date must be after production date",
  path: ["ExpiryDate"], // Point error to ExpiryDate field
});

type CreateBatchFormValues = z.infer<typeof formSchema>;

export default function UpdateBatchPageViewModel() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<CreateBatchFormValues>({
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

  const createBatchUseCase = useMemo(() => new CreateBatch(batchRepository), [batchRepository]);
  const createBatch = useCallback(async (request: CreateBatchRequest) => {
    return await createBatchUseCase.invoke(request);
  }, [createBatchUseCase]);

  const onSubmit = async (values: CreateBatchFormValues) => {
    setIsLoading(true);
    setApiError(null);

    const productionDateISO = new Date(values.ProductionDate).toISOString();
    const expiryDateISO = new Date(values.ExpiryDate).toISOString();

    const requestData: CreateBatchRequest = {
      ID: "",
      ...values,
      ProductionDate: productionDateISO,
      ExpiryDate: expiryDateISO,
    };

    try {
      const result = await createBatch(requestData);
      if (result.success && result.value) {
        toast.success("Batch Created", {
          description: `Batch ${result.value.ID} has been successfully created.`,
        });
        navigate(ROUTES.FULL_PATH_APP_BATCH);
      } else {
        const errorMessage = result.error?.message || "Failed to create batch. Please try again.";
        setApiError(errorMessage);
        toast.error("Error", {
          description: errorMessage,
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred.";
      setApiError(errorMessage);
      toast.error("Error", {
        description: errorMessage,
      });
    }
    setIsLoading(false);
  };

  return {
    form,
    onSubmit,
    apiError,
    isLoading,
  };
}
