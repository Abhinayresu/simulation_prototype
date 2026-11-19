"use client";

import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "../core/index.ts";

const OrientationContext = React.createContext<"horizontal" | "vertical">(
  "horizontal",
);

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <OrientationContext.Provider value={orientation}>
      <ResizablePrimitive.Group
        data-slot="resizable-panel-group"
        orientation={orientation}
        className={cn(
          "flex flex-nowrap size-full overflow-hidden",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className,
        )}
        {...props}
      />
    </OrientationContext.Provider>
  );
}

function ResizablePanel({
  className,
  ...props
}: ResizablePrimitive.PanelProps) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      className={cn("grow max-w-full max-h-full overflow-auto", className)}
      {...props}
    />
  );
}

function ResizableHandle({
  withHandle,
  className,
  gripClassName,
  children,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
  /** Classes for the grip `withHandle` draws, which holds the children. */
  gripClassName?: string;
  children?: React.ReactNode;
}) {
  const orientation = React.useContext(OrientationContext);

  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "touch-none ring-offset-background bg-border flex relative justify-center items-center grow-0 shrink-0 focus-visible:ring focus-visible:ring-ring focus-visible:outline-none",
        orientation === "horizontal"
          ? "cursor-col-resize w-px after:-translate-x-1/2 after:absolute after:inset-y-0 after:left-1/2 after:w-1"
          : "cursor-row-resize w-full h-px after:-translate-y-1/2 after:absolute after:top-0 after:left-0 after:w-full after:h-1",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "rounded-lg bg-border flex z-10 shrink-0 w-1 h-6",
            orientation === "vertical" && "rotate-90",
            gripClassName,
          )}
        >
          {children}
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
