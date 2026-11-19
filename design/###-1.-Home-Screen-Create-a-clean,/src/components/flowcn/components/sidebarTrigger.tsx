"use client";

import { PanelLeftIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../core/index.ts";

import { Button, ButtonIcon, ButtonText } from "./button.tsx";
import { SidebarContext } from "./sidebarProvider.tsx";

function SidebarTrigger({
  className,
  onClick,
  icon = PanelLeftIcon,
  iconClassName,
  label = "Toggle Sidebar",
  labelClassName,
  ...props
}: React.ComponentProps<typeof Button> & {
  /** The glyph, and its classes. */
  icon?: React.ComponentProps<typeof ButtonIcon>["icon"];
  iconClassName?: string;
  /** What a screen reader says the button does, and its classes. */
  label?: string;
  labelClassName?: string;
}) {
  // Outside a provider it toggles nothing, as a trigger written alone.
  const provider = React.useContext(SidebarContext);

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        provider?.toggleSidebar();
      }}
      {...props}
    >
      <ButtonIcon icon={icon} className={cn("rtl:rotate-180", iconClassName)} />
      <ButtonText className={cn("sr-only", labelClassName)}>{label}</ButtonText>
    </Button>
  );
}

export { SidebarTrigger };
