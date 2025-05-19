import { ROUTES } from "@/core/Routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  // API/Server-side error state
  const [apiError, setApiError] = useState("");

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      password: "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setApiError(""); // Clear previous API errors
    setIsLoading(true);
    console.log("Form values being submitted:", values);

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success/failure
      if (values.organization === "testorg" && values.password === "password123") {
        console.log("Login successful simulation");
        // Redirect to the batches page after successful login
        navigate(ROUTES.FULL_PATH_APP_BATCH || "/app/batches");
      } else {
        console.log("Login failed simulation");
        setApiError("Invalid organization or password.");
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
