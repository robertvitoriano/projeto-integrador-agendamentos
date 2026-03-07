import { loginUser } from "@/api/login-user";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.accessToken);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <>
      {isPending ? (
        <div> It is loading</div>
      ) : (
        <Card className="p-4">
          <h1 className="text-foreground text-center font-bold">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-2"
          >
            <FormInput
              {...register("email", { required: "Campo obrigatório" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <FormInput
              type="password"
              {...register("password", {
                minLength: 6,
                required: "Campo obrigatório",
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <Button type="submit">Login</Button>
          </form>
        </Card>
      )}
      {error ? <div>Login Failed</div> : null}
    </>
  );
}
