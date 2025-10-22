import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface IFormContext {
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
}
const FormContext = createContext<IFormContext | null>(null);

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}
function Form({ children, onSubmit, ...props }: FormProps) {
  const { register, handleSubmit } = useForm();
  return (
    <FormContext.Provider value={{ handleSubmit, register }}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

//input field in form
function Field({ label, id, name, ...props }: FieldProps) {
  const formValues = useContext(FormContext);
  if (!formValues) {
    throw new Error("Field must be used inside a <Form> component");
  }
  const { register } = formValues;

  return (
    <div className="space-y-1">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <Input
        id={id || name}
        {...props}
        className={cn("h-14", props?.className)}
        {...register(name)}
      />
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
