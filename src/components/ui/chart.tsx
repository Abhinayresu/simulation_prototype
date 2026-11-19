import * as React from "react";
import { ResponsiveContainer } from "recharts";

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<string, string>;
  }
>;

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: ChartConfig;
    children: React.ReactElement;
  }
>(({ id, className, children, config, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
});
ChartContainer.displayName = "Chart";
