"use client";

import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { cn } from "../core/index.ts";

/** Whether the command is a command dialog's, which says so. */
const InDialogContext = React.createContext(false);

function Command({
  className,
  inDialog = false,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & { inDialog?: boolean }) {
  return (
    <InDialogContext.Provider value={inDialog}>
      <CommandPrimitive
        data-slot="command"
        className={cn(
          "rounded-xl bg-popover text-popover-foreground flex p-1 flex-col size-full overflow-hidden",
          className,
        )}
        {...props}
      />
    </InDialogContext.Provider>
  );
}

function CommandInput({
  className,
  wrapperClassName,
  groupClassName,
  addonClassName,
  iconClassName,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  /** Classes for the box around the input, its group, the addon and the icon in it. */
  wrapperClassName?: string;
  groupClassName?: string;
  addonClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn("px-1 pt-1 pb-0", wrapperClassName)}
    >
      <div
        role="group"
        className={cn(
          "transition-colors shadow-none rounded-lg bg-input/30 border border-input/30 outline-none flex relative items-center w-full h-8 min-w-0 dark:bg-input/30",
          groupClassName,
        )}
      >
        <div
          role="group"
          className={cn(
            "font-medium select-none cursor-text text-muted-foreground text-sm flex py-1.5 pl-2 justify-center items-center gap-2 h-auto",
            addonClassName,
          )}
        >
          <SearchIcon
            className={cn("opacity-50 shrink-0 size-4", iconClassName)}
          />
        </div>
        <CommandPrimitive.Input
          data-slot="command-input"
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "text-sm outline-none pl-1.5 w-full disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "scrollbar-none outline-none scroll-py-1 max-h-72 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("text-center text-sm py-6", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground p-1 overflow-hidden",
        "**:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  checked = false,
  checkClassName,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  checked?: boolean;
  /** Classes for the check a checked item draws. */
  checkClassName?: string;
}) {
  const inDialog = React.useContext(InDialogContext);

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      data-checked={checked}
      className={cn(
        // cmdk marks the highlighted item and a disabled one with "true", and
        // the others with "false".
        "select-none cursor-default rounded-sm text-sm outline-none flex relative px-2 py-1.5 items-center gap-2 group/command-item data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none",
        inDialog && "rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      {checked && (
        <CheckIcon
          className={cn(
            "pointer-events-none ml-auto shrink-0 size-4 group-data-[selected=true]/command-item:text-foreground",
            checkClassName,
          )}
        />
      )}
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground text-xs tracking-widest ml-auto group-data-[selected=true]/command-item:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
