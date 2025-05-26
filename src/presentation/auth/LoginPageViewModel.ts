import { ROUTES } from "@/core/Routes";
import { AuthApiDataSource } from "@/data/datasource/api/AuthApiDataSource";
import { AuthRepositoryDataSource } from "@/data/repository/AuthRepositoryDataSource";
import { Login as LoginUseCase } from "@/domain/usecase/auth/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { toast } from "sonner"
import { useAuth } from "@/presentation/context/AuthContext";
import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { useCallback, useEffect, useMemo, useState } from "react";

const formSchema = z.object({
  organization: z.string().min(4, "Organization is required"),
  password: z.string().min(8, "Password is required"),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPageViewModel() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    login
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      password: "",
    },
  });

  const authDataSource = useMemo(() => new AuthApiDataSource(), []);
  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource]);
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), [authRepository]);
  const submitLogin = useCallback(async (request: LoginRequest) => {
    return await loginUseCase.execute(request);
  }, [loginUseCase]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/beranda")
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);

    const request: LoginRequest = {
      organization: values.organization,
      password: values.password,
    };

    try {
      const result = await submitLogin(request);
      if (result.success && result.value) {
        login(result.value.Token, result.value.OrgID);
        toast.success("Login Successful", {
          description: `Welcome, ${result.value.OrgID}!`,
        });
        navigate(ROUTES.FULL_PATH_APP_BATCH);
      } else {
        const errorMessage = result.error?.message || "Login failed. Please check your credentials.";
        setApiError(errorMessage);
        toast.error("Login Failed", { description: errorMessage });
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred during login.";
      setApiError(errorMessage);
      toast.error("Login Error", { description: errorMessage });
    }
    setIsLoading(false);
  };

  return {
    form,
    onSubmit,
    apiError,
    isLoading,
  }
}
