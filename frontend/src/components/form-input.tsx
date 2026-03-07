import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

export function FormInput(props: FormInputProps) {
  return (
    <input
      className="rounded border border-foreground p-2"
      {...props}
    />
  );
}
