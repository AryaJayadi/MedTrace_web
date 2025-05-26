import { ROUTES } from "@/core/Routes";
import { AuthApiDataSource } from "@/data/datasource/api/AuthApiDataSource";
import { OrganizationApiDataSource } from "@/data/datasource/api/OrganizationApiDataSource";
import { AuthMockDataSource } from "@/data/datasource/mock/AuthMockDataSource";
import { AuthRequest } from "@/data/datasource/mock/request/AuthRequest";
import { AuthRepositoryDataSource } from "@/data/repository/AuthRepositoryDataSource";
import { OrganizationRepositoryDataSource } from "@/data/repository/OrganizationRepositoryDataSource";
import { Login } from "@/domain/usecase/auth/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { toast } from "sonner"
import { useAuth } from "@/presentation/context/AuthContext";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

const formSchema = z.object({
  organization: z.string().min(4, {
    message: "Organization name must be at least 4 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Define a type for the login response data
interface LoginResponseData {
  token: string;
  orgId: string;
  message?: string;
}

export default function LoginPageViewModel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      password: "",
    },
  });

  const authDataSource = useMemo(() => new AuthApiDataSource(), [])
  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), [])

  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource])
  const organizationRepository = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource])

  const loginUseCase = useMemo(() => new Login(authRepository, organizationRepository), [authRepository, organizationRepository])
  const login = useCallback(async (request: AuthRequest) => {
    return await loginUseCase.invoke(request);
  }, [loginUseCase])

  const organizationRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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

  async function handleSubmit() {
    if (!organizationRef.current || !passwordRef.current) {
      toast.error("Login failed!", {
        description: `Failed to bind refs!`,
      });
      return;
    }
    if (organizationRef.current['value'] == "" || passwordRef.current['value'] == "") {
      toast.error("Login failed!", {
        description: `Please make sure to fill all fields!`,
      });
      return;
    }

    const organization: string = organizationRef.current['value'];
    const password: string = passwordRef.current['value'];

    try {
      const res = await login({
        organization: organization,
        password: password
      } as AuthRequest);

      if (res.error) {
        toast.error("Login failed!", {
          description: `${res.error.message}`,
        });
        return;
      } else if (res.value == null || !res.value.token || !res.value.orgId) {
        toast.error("Login failed!", {
          description: `Failed to retrieve token or orgId from login response.`,
        });
        return;
      }

      auth.login(res.value.token, res.value.orgId);

      toast.success("Login success!", {
        description: res.value.message ?? `Welcome, ${res.value.orgId}! `,
      });

      organizationRef.current['value'] = "";
      passwordRef.current['value'] = "";
    } catch (e: any) {
      toast.error("Login error!", {
        description: e.message || "An unexpected error occurred.",
      });
    }
  }

  return {
    form,
    onSubmit,
    handleSubmit,
    organizationRef,
    passwordRef,
    apiError,
    isLoading,
  }
}
