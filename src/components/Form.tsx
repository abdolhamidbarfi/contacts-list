import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";
import { ZodTypeDef } from "zod/v3";

interface IFormContext {
  register: ReturnType<typeof useForm>["register"];
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  errors: any;
}
const FormContext = createContext<IFormContext | null>(null);

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  zodSchema: ZodType<any, ZodTypeDef, any>;
}
function Form({
  children,
  onSubmit,
  zodSchema,
  className,
  ...props
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  console.log(errors);
  return (
    <FormContext.Provider value={{ handleSubmit, register, errors }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-5 ", className)}
        {...props}
      >
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
function Field({ label, id, name, className, ...props }: FieldProps) {
  const formValues = useContext(FormContext);
  if (!formValues) {
    throw new Error("Field must be used inside a <Form> component");
  }
  const { register, errors } = formValues;

  return (
    <div className="space-y-2">
      {label && (
        <Label className="font-bold text-md" htmlFor={id || name}>
          {label}
        </Label>
      )}
      <Input
        id={id || name}
        {...register(name)}
        className={cn("h-14 !text-lg", className)}
        {...props}
      />
      {errors[name] && (
        <span className="text-red-500 text-lg">{errors[name].message}</span>
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
