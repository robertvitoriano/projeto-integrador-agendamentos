import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";

export function Access() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  return (
    <div className="bg-background flex h-screen flex-col items-center justify-center">
      {isLoggingIn ? <LoginForm /> : <SignUpForm />}
      <h1
        className="text-foreground hover:cursor-pointer hover:underline"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {isLoggingIn ? "Ainda não sou registrado" : "Voltar para o login"}
      </h1>
    </div>
  );
}
