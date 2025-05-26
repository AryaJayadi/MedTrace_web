import { ROUTES } from "@/core/Routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { toast } from "sonner"
import { useAuth } from "@/presentation/context/AuthContext";
import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { useEffect, useState } from "react";

const formSchema = z.object({
  organization: z.string().min(4, "Organization is required"),
  password: z.string().min(8, "Password is required"),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPageViewModel() {
  const navigate = useNavigate();
  const {
    handleLogin,
    isAuthenticated
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.FULL_PATH_APP_BATCH);
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);

    const request: LoginRequest = {
      organization: values.organization,
      password: values.password,
    };

    const res = await handleLogin(request);
    if (res && res.value && res.success) {
      toast.success("Login Successful", {
        description: `Welcome, ${res.value.OrgID}!`,
      });
      setApiError(null);
      navigate(ROUTES.FULL_PATH_APP_BATCH);
    } else {
      const errorMessage = res.error?.message || "Login failed. Please check your credentials.";
      toast.error("Login Failed", { description: errorMessage });
      setApiError(errorMessage);
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
