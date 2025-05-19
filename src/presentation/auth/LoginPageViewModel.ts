import { ROUTES } from "@/core/Routes";
import { OrganizationApiDataSource } from "@/data/datasource/api/OrganizationApiDataSource";
import { AuthMockDataSource } from "@/data/datasource/mock/AuthMockDataSource";
import { AuthRequest } from "@/data/datasource/mock/request/AuthRequest";
import { AuthRepositoryDataSource } from "@/data/repository/AuthRepositoryDataSource";
import { OrganizationRepositoryDataSource } from "@/data/repository/OrganizationRepositoryDataSource";
import { Login } from "@/domain/usecase/auth/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  organization: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPageViewModel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      password: "",
    },
  });

  const authDataSource = useMemo(() => new AuthMockDataSource(), [])
  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), [])

  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource])
  const organizationRepository = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource])

  const loginUseCase = useMemo(() => new Login(authRepository, organizationRepository), [authRepository, organizationRepository])
  const login = useCallback(async (request: AuthRequest) => {
    return await loginUseCase.invoke(request);
  }, [loginUseCase])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setApiError(""); // Clear previous API errors
    setIsLoading(true);
    console.log("Form values being submitted:", values);

    try {
      const request = {
        organization: values.organization,
        password: values.password
      } as AuthRequest;

      const resp = await login(request);

      if (resp.success) {
        console.log("Login successful:", resp);
        navigate(ROUTES.FULL_PATH_APP_BATCH);
      } else if (!resp.success && resp.error != undefined) {
        console.error("Login failed:", resp.error);
        setApiError(resp.error.message);
      }
    } catch (err) {
      console.error("API Error:", err);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    onSubmit,
    apiError,
    isLoading,
  }
}
