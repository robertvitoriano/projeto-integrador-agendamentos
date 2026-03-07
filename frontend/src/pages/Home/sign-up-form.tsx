import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";

type SignUpFormData = {
  email: string;
  password: string;
};

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data);
  };

  return (
    <Card className="p-4">
      <h1 className="text-foreground text-center font-bold">Cadastro</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email", { required: "Campo obrigatório" })}
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <FormInput
          type="password"
          placeholder="Senha"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Uma senha deve ter no mínimo 6 caractéres",
            },
            required: "Campo obrigatório",
          })}
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit">Cadastrar</Button>
      </form>
    </Card>
  );
}
