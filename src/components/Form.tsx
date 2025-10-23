import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

const FormContext = createContext<null>(null);

function Form({
  children,
  onSubmit,
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <FormContext.Provider value={null}>
      <form
        onSubmit={onSubmit}
        className={cn("flex flex-col gap-5 ", className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: FieldPath<T>;
  errorMessage?: string;
  register: UseFormRegister<T>;
}

//input field in form
function Field<T extends FieldValues>({
  label,
  id,
  name,
  className,
  errorMessage,
  register,
  ...props
}: FieldProps<T>) {
  const formValues = useContext(FormContext);
  if (!formValues) {
    throw new Error("Field must be used inside a <Form> component");
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label className="font-bold text-md" htmlFor={id || name}>
          {label}
        </Label>
      )}
      <Input
        id={id || name}
        className={cn("h-14 !text-lg", className)}
        {...register(name)}
        {...props}
      />
      {errorMessage && (
        <span className="text-red-500 text-lg">{errorMessage + ""}</span>
      )}
    </div>
  );
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: string | React.ReactNode;
}

//submit form
function Submit({ children, size = "lg", ...props }: ButtonProps) {
  return (
    <Button size={size} type="submit" {...props}>
      {children}
    </Button>
  );
}

//move back to last page
function Cancel({
  children,
  variant = "outline",
  size = "lg",
  ...props
}: ButtonProps) {
  const navigate = useRouter();
  const cancel = () => navigate.back();
  return (
    <Button
      size={size}
      variant={variant}
      type="submit"
      onClick={cancel}
      {...props}
    >
      {children}
    </Button>
  );
}

Form.Field = Field;
Form.Submit = Submit;
Form.Cancel = Cancel;
export default Form;
