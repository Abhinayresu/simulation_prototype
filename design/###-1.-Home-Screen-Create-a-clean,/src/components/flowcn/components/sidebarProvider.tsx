"use client";

import * as React from "react";

import { cn } from "../core/index.ts";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";
/** The width below which the sidebar is a drawer over the page. */
const MOBILE_QUERY = "(max-width: 767px)";

export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}) {
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (openProp === undefined) _setOpen(openState);
      setOpenProp?.(openState);
    },
    [openProp, setOpenProp, open],
  );

  // Helper to toggle the sidebar: the drawer on a phone, the sidebar elsewhere.
  const toggleSidebar = React.useCallback(() => {
    if (window.matchMedia(MOBILE_QUERY).matches) {
      setOpenMobile((open) => !open);
    } else {
      setOpen((open) => !open);
    }
  }, [setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      side,
      variant,
      collapsible,
    }),
    [
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      side,
      variant,
      collapsible,
    ],
  );
  const look = contextValue;

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        className={cn(
          "flex w-full min-h-svh",
          look.side === "left" && "rtl:flex-row-reverse",
          look.side === "right" && "flex-row-reverse rtl:flex-row",
          look.variant === "inset" && "bg-sidebar",
          className,
        )}
        {...props}
      >
        {openMobile && (
          <div
            data-slot="sidebar-overlay"
            className={
              "bg-black/10 fixed z-50 inset-0 supports-backdrop-filter:backdrop-blur-xs md:hidden"
            }
            onClick={() => setOpenMobile(false)}
          />
        )}
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  const { variant, state } = useSidebar();

  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background flex relative flex-col flex-1 w-full",
        variant === "inset" && "shadow-sm rounded-xl my-2 mr-2 ml-0",
        variant === "inset" && state === "collapsed" && "md:ml-2",
        className,
      )}
      {...props}
    />
  );
}

export { SidebarContext, SidebarInset, SidebarProvider, useSidebar };
