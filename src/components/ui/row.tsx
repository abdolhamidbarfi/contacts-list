import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rowVariants = cva(
  "w-full mx-auto transition-colors duration-300 flex", // flex پایه
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      padding: {
        none: "",
        sm: "p-2",
        md: "p-4",
        lg: "p-8",
      },
      maxWidth: {
        none: "max-w-full",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "7xl": "max-w-7xl",
      },
    },
    defaultVariants: {
      direction: "row",
      justify: "between",
      align: "stretch",
      padding: "md",
      maxWidth: "7xl",
    },
  }
);

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {
  asChild?: boolean;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    {
      className,
      direction,
      justify,
      align,
      padding,
      maxWidth,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(
          rowVariants({
            direction,
            justify,
            align,
            padding,
            maxWidth,
            className,
          })
        )}
      >
        {props.children}
      </Comp>
    );
  }
);

Row.displayName = "Row";

export { Row, rowVariants };
