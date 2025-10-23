"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { createPortal } from "react-dom";

interface DialogContextProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

interface RootProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function DialogRoot({ children, defaultOpen = false }: RootProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

interface TriggerProps {
  children: ReactNode;
  className?: string;
}

export function DialogTrigger({ children, className }: TriggerProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within DialogRoot");

  const toggle = () => context.setOpen(!context.open);

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: ContentProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within DialogRoot");
  if (!context.open) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4",
        className
      )}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        {children}
      </div>
    </div>,
    document.body
  );
}

interface TitleProps {
  children: ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: TitleProps) {
  return (
    <h2 className={cn("text-lg font-bold text-right", className)}>
      {children}
    </h2>
  );
}

interface DescriptionProps {
  children: ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DescriptionProps) {
  return (
    <p
      className={cn("text-sm text-right mt-2 text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}

interface ActionsProps {
  children: ReactNode;
  className?: string;
}

export function DialogActions({ children, className }: ActionsProps) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)}>
      {children}
    </div>
  );
}

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
}

export function DialogAction({
  children,
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      {...props}
      className={cn(buttonVariants({ variant }), "cursor-pointer")}
    >
      {children}
    </Button>
  );
}

interface CancelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function DialogCancel({ children, ...props }: CancelButtonProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogCancel must be used within DialogRoot");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    context.setOpen(false);
    if (props.onClick) props.onClick(event);
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      variant="outline"
      className="cursor-pointer"
    >
      {children}
    </Button>
  );
}

// Compound export
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: DialogActions,
  Action: DialogAction,
  Cancel: DialogCancel,
};
