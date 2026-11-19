"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "../core/index.ts";

import { Input } from "./input.tsx";
import { Separator } from "./separator.tsx";
import { Skeleton } from "./skeleton.tsx";
import {
  type SidebarCollapsible,
  type SidebarSide,
  SidebarContext,
  type SidebarVariant,
} from "./sidebarProvider.tsx";

/** What a sidebar's parts are drawn by: its side, variant and collapsing, and its state. */
type Look = {
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
  state: "expanded" | "collapsed";
  openMobile: boolean;
  onToggle?: () => void;
};

const LookContext = React.createContext<Look>({
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
  state: "expanded",
  openMobile: false,
});

/** What a menu item's button, action and badge are drawn by. */
type Item = {
  size: "sm" | "default" | "lg";
  isActive: boolean;
  withAction: boolean;
};

const ItemContext = React.createContext<Item>({
  size: "default",
  isActive: false,
  withAction: false,
});

function Sidebar({
  side: sideProp,
  variant: variantProp,
  collapsible: collapsibleProp,
  onToggle,
  className,
  gapClassName,
  containerClassName,
  innerClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  /** Told when the rail is clicked. */
  onToggle?: () => void;
  /** Classes for the gap it keeps in the page, its fixed container, and the box inside. */
  gapClassName?: string;
  containerClassName?: string;
  innerClassName?: string;
}) {
  // Inside a provider it is the provider's; on its own, an open sidebar.
  const provider = React.useContext(SidebarContext);
  const look: Look = {
    side: sideProp ?? provider?.side ?? "left",
    variant: variantProp ?? provider?.variant ?? "sidebar",
    collapsible: collapsibleProp ?? provider?.collapsible ?? "offcanvas",
    state: provider?.state ?? "expanded",
    openMobile: provider?.openMobile ?? false,
    onToggle,
  };

  return (
    <LookContext.Provider value={look}>
      <div
        data-slot="sidebar"
        data-state={look.state}
        className={cn(
          "text-sidebar-foreground",
          look.collapsible === "none" && "bg-sidebar flex flex-col w-64 h-full",
          className,
        )}
        {...props}
      >
        {look.collapsible !== "none" && (
          <div
            data-slot="sidebar-gap"
            className={cn(
              "[transition:width_200ms_linear] bg-transparent relative w-64 max-md:hidden",
              look.collapsible === "offcanvas" &&
                look.state === "collapsed" &&
                "md:w-0",
              look.collapsible === "icon" &&
                look.state === "collapsed" &&
                "md:w-12",
              look.collapsible === "icon" &&
                look.state === "collapsed" &&
                look.variant === "floating" &&
                "md:w-16",
              look.collapsible === "icon" &&
                look.state === "collapsed" &&
                look.variant === "inset" &&
                "md:w-16",
              gapClassName,
            )}
          />
        )}
        <div
          data-slot="sidebar-container"
          className={cn(
            "[transition:left_200ms_linear,right_200ms_linear,width_200ms_linear] flex fixed z-10 inset-y-0 w-64 h-svh max-md:shadow-lg max-md:z-50 max-md:w-72",
            look.side === "right" && "right-0 max-md:border-l",
            look.side === "left" && "left-0 max-md:border-r",
            look.variant === "inset" && "p-2",
            look.variant === "floating" && "p-2",
            look.collapsible === "none" && "contents",
            look.variant === "sidebar" && look.side === "left" && "border-r",
            look.variant === "sidebar" && look.side === "right" && "border-l",
            look.collapsible === "offcanvas" &&
              look.state === "collapsed" &&
              look.side === "left" &&
              "md:-left-64",
            look.collapsible === "offcanvas" &&
              look.state === "collapsed" &&
              look.side === "right" &&
              "md:-right-64",
            look.collapsible === "icon" &&
              look.state === "collapsed" &&
              "md:w-12",
            look.collapsible === "icon" &&
              look.state === "collapsed" &&
              look.variant === "floating" &&
              "md:w-[calc(4rem+2px)]",
            look.collapsible === "icon" &&
              look.state === "collapsed" &&
              look.variant === "inset" &&
              "md:w-[calc(4rem+2px)]",
            look.collapsible === "offcanvas" &&
              !look.openMobile &&
              "max-md:hidden",
            look.collapsible === "icon" && !look.openMobile && "max-md:hidden",
            containerClassName,
          )}
        >
          <div
            data-slot="sidebar-inner"
            className={cn(
              "bg-sidebar flex flex-col size-full",
              look.variant === "floating" &&
                "ring ring-sidebar-border shadow-sm rounded-lg",
              look.collapsible === "none" && "contents",
              innerClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </LookContext.Provider>
  );
}

function SidebarRail({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const look = React.useContext(LookContext);
  const provider = React.useContext(SidebarContext);

  return (
    <button
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      title="Toggle Sidebar"
      onClick={(event) => {
        onClick?.(event);
        look.onToggle?.();
        provider?.toggleSidebar();
      }}
      className={cn(
        "-translate-x-1/2 transition-all ease-linear hidden absolute z-20 inset-y-0 w-4 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex rtl:after:right-1/2 rtl:after:left-auto",
        look.side === "right" && "cursor-e-resize left-0",
        look.side === "left" && "cursor-w-resize -right-4",
        look.side === "left" &&
          look.state === "collapsed" &&
          "md:cursor-e-resize",
        look.side === "right" &&
          look.state === "collapsed" &&
          "md:cursor-w-resize",
        look.collapsible === "offcanvas" &&
          look.state === "collapsed" &&
          "md:translate-x-0 md:after:left-full md:hover:bg-sidebar",
        look.collapsible === "offcanvas" &&
          look.state === "collapsed" &&
          look.side === "left" &&
          "md:-right-2",
        look.collapsible === "offcanvas" &&
          look.state === "collapsed" &&
          look.side === "right" &&
          "md:-left-2",
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      className={cn("shadow-none bg-background w-full h-8", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex p-2 flex-col gap-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex p-2 flex-col gap-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  const look = React.useContext(LookContext);

  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "scrollbar-none flex flex-col flex-1 gap-0 min-h-0 overflow-auto",
        look.collapsible === "icon" &&
          look.state === "collapsed" &&
          "md:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex relative p-2 flex-col w-full min-w-0", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  const look = React.useContext(LookContext);

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "font-medium [transition:margin_200ms_linear,opacity_200ms_linear] ring-sidebar-ring rounded-md text-sidebar-foreground/70 text-xs outline-none flex px-2 items-center shrink-0 h-8 focus-visible:ring-2",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            "md:opacity-0 md:-mt-8",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-group-label" },
  });
}

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  const look = React.useContext(LookContext);

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "transition-transform ring-sidebar-ring rounded-md text-sidebar-foreground outline-none flex absolute top-3.5 right-3 p-0 justify-center items-center w-5 aspect-square after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            "md:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-group-action" },
  });
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("text-sm w-full", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-0 w-full min-w-0", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({
  size = "default",
  isActive = false,
  withAction = false,
  className,
  ...props
}: React.ComponentProps<"li"> & {
  /** The row's size and whether it is the current one: its button's, action's and badge's. */
  size?: Item["size"];
  isActive?: boolean;
  /** Whether it holds an action, which its button leaves room for. */
  withAction?: boolean;
}) {
  const item = React.useMemo(
    () => ({ size, isActive, withAction }),
    [size, isActive, withAction],
  );

  return (
    <ItemContext.Provider value={item}>
      <li
        data-slot="sidebar-menu-item"
        data-active={isActive || undefined}
        className={cn("relative group/sidebar-menu-item", className)}
        {...props}
      />
    </ItemContext.Provider>
  );
}

function SidebarMenuButton({
  render,
  variant = "default",
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    variant?: "default" | "outline";
  }) {
  const look = React.useContext(LookContext);
  const item = React.useContext(ItemContext);

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "text-left transition-[width,height,padding] ring-sidebar-ring rounded-md text-sm outline-none flex p-2 items-center gap-2 w-full h-8 overflow-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground",
          variant === "outline" &&
            "shadow-[0px_0px_0px_1px_var(--sidebar-border)] bg-background hover:shadow-[0px_0px_0px_1px_var(--sidebar-accent)]",
          item.size === "lg" && "h-12",
          item.size === "sm" && "text-xs h-7",
          item.withAction && "pr-8",
          item.isActive &&
            "font-medium bg-sidebar-accent text-sidebar-accent-foreground",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            "md:p-2 md:size-8",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            item.size === "lg" &&
            "md:p-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-menu-button", active: item.isActive },
  });
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean;
  }) {
  const look = React.useContext(LookContext);
  const item = React.useContext(ItemContext);

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "transition-transform ring-sidebar-ring rounded-md text-sidebar-foreground outline-none flex absolute top-1.5 right-1 p-0 justify-center items-center w-5 aspect-square group-hover/sidebar-menu-item:text-sidebar-accent-foreground after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden",
          item.size === "lg" && "top-2.5",
          item.size === "sm" && "top-1",
          showOnHover &&
            "group-focus-within/sidebar-menu-item:opacity-100 group-hover/sidebar-menu-item:opacity-100 aria-expanded:opacity-100 md:opacity-0",
          showOnHover && item.isActive && "text-sidebar-accent-foreground",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            "md:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-menu-action" },
  });
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const look = React.useContext(LookContext);
  const item = React.useContext(ItemContext);

  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn(
        "font-medium tabular-nums select-none pointer-events-none rounded-md text-sidebar-foreground text-xs flex absolute top-1.5 right-1 px-1 justify-center items-center h-5 min-w-5 group-hover/sidebar-menu-item:text-sidebar-accent-foreground",
        item.size === "lg" && "top-2.5",
        item.size === "sm" && "top-1",
        item.isActive && "text-sidebar-accent-foreground",
        look.collapsible === "icon" &&
          look.state === "collapsed" &&
          "md:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  iconClassName,
  textClassName,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
  /** Classes for the icon's and the text's placeholders. */
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={cn("rounded-md flex px-2 items-center gap-2 h-8", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton className={cn("rounded-md size-4", iconClassName)} />
      )}
      <Skeleton className={cn("flex-1 h-4 max-w-[70%]", textClassName)} />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  const look = React.useContext(LookContext);

  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "translate-x-px border-y-sidebar-border border-r-sidebar-border border-l border-l-sidebar-border flex mx-3.5 px-2.5 py-0.5 flex-col gap-1 min-w-0",
        look.collapsible === "icon" &&
          look.state === "collapsed" &&
          "md:hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
  }) {
  const look = React.useContext(LookContext);

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "-translate-x-px ring-sidebar-ring rounded-md text-sidebar-foreground text-sm outline-none flex px-2 items-center gap-2 h-7 min-w-0 overflow-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
          size === "sm" && "text-xs",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
          look.collapsible === "icon" &&
            look.state === "collapsed" &&
            "md:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "sidebar-menu-sub-button", active: isActive },
  });
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
};
