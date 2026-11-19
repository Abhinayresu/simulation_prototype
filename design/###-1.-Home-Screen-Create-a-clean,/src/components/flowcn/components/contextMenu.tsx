/** @jsxImportSource ../core/template */

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({ inButtonGroup: ["horizontal", "vertical"] });

export const ContextMenu = defineElement({
  name: "ContextMenu",
  as: ContextMenuPrimitive.Root,
  variants,
});

export const ContextMenuTrigger = defineElement({
  name: "ContextMenuTrigger",
  as: ContextMenuPrimitive.Trigger,
});

export const ContextMenuPortal = defineElement({
  name: "ContextMenuPortal",
  as: ContextMenuPrimitive.Portal,
});

export const ContextMenuPositioner = defineElement({
  name: "ContextMenuPositioner",
  as: ContextMenuPrimitive.Positioner,
});

export const ContextMenuContent = defineElement({
  name: "ContextMenuContent",
  as: ContextMenuPrimitive.Popup,
});

const itemVariants = defineVariants(
  { variant: ["default", "destructive"], inset: [true, false] },
  { defaults: { variant: "default" } },
);

export const ContextMenuItem = defineElement({
  name: "ContextMenuItem",
  as: ContextMenuPrimitive.Item,
  variants: itemVariants,
});

export const ContextMenuItemIcon = defineElement({
  name: "ContextMenuItemIcon",
});

export const ContextMenuItemText = defineElement({
  name: "ContextMenuItemText",
  as: "span",
});

export const ContextMenuShortcut = defineElement({
  name: "ContextMenuShortcut",
  as: "span",
});

const checkboxItemVariants = defineVariants({ inset: [true, false] });

export const ContextMenuCheckboxItem = defineElement({
  name: "ContextMenuCheckboxItem",
  as: ContextMenuPrimitive.CheckboxItem,
  variants: checkboxItemVariants,
});

export const ContextMenuCheckboxItemIndicator = defineElement({
  name: "ContextMenuCheckboxItemIndicator",
  as: "span",
});

export const ContextMenuCheckboxItemMark = defineElement({
  name: "ContextMenuCheckboxItemMark",
  as: ContextMenuPrimitive.CheckboxItemIndicator,
});

export const ContextMenuCheckboxItemIcon = defineElement({
  name: "ContextMenuCheckboxItemIcon",
  icon: CheckIcon,
});

export const ContextMenuRadioGroup = defineElement({
  name: "ContextMenuRadioGroup",
  as: ContextMenuPrimitive.RadioGroup,
});

const radioItemVariants = defineVariants({ inset: [true, false] });

export const ContextMenuRadioItem = defineElement({
  name: "ContextMenuRadioItem",
  as: ContextMenuPrimitive.RadioItem,
  variants: radioItemVariants,
});

export const ContextMenuRadioItemIndicator = defineElement({
  name: "ContextMenuRadioItemIndicator",
  as: "span",
});

export const ContextMenuRadioItemMark = defineElement({
  name: "ContextMenuRadioItemMark",
  as: ContextMenuPrimitive.RadioItemIndicator,
});

export const ContextMenuRadioItemIcon = defineElement({
  name: "ContextMenuRadioItemIcon",
  icon: CheckIcon,
});

export const ContextMenuGroup = defineElement({
  name: "ContextMenuGroup",
  as: ContextMenuPrimitive.Group,
});

const labelVariants = defineVariants({ inset: [true, false] });

export const ContextMenuLabel = defineElement({
  name: "ContextMenuLabel",
  as: "div",
  variants: labelVariants,
});

export const ContextMenuSeparator = defineElement({
  name: "ContextMenuSeparator",
  as: ContextMenuPrimitive.Separator,
});

export const ContextMenuSub = defineElement({
  name: "ContextMenuSub",
  as: ContextMenuPrimitive.SubmenuRoot,
});

const subTriggerVariants = defineVariants({ inset: [true, false] });

export const ContextMenuSubTrigger = defineElement({
  name: "ContextMenuSubTrigger",
  as: ContextMenuPrimitive.SubmenuTrigger,
  variants: subTriggerVariants,
});

export const ContextMenuSubTriggerIcon = defineElement({
  name: "ContextMenuSubTriggerIcon",
  icon: ChevronRightIcon,
});

export const ContextMenuSubPortal = defineElement({
  name: "ContextMenuSubPortal",
  as: ContextMenuPrimitive.Portal,
});

export const ContextMenuSubPositioner = defineElement({
  name: "ContextMenuSubPositioner",
  as: ContextMenuPrimitive.Positioner,
});

export const ContextMenuSubContent = defineElement({
  name: "ContextMenuSubContent",
  as: ContextMenuPrimitive.Popup,
});

const styles = defineStyles<
  typeof variants &
    typeof itemVariants &
    typeof checkboxItemVariants &
    typeof radioItemVariants &
    typeof labelVariants &
    typeof subTriggerVariants
>({
  base: {
    ContextMenuTrigger: "select-none",
    ContextMenuPositioner: "outline-none z-50 isolate",
    ContextMenuContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 min-w-36 max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
    ContextMenuItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative px-1.5 py-1 items-center gap-1.5 group/context-menu-item focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    ContextMenuItemIcon: "pointer-events-none shrink-0 size-4",
    ContextMenuShortcut:
      "text-muted-foreground text-xs tracking-widest ml-auto group-focus/context-menu-item:text-accent-foreground",
    ContextMenuCheckboxItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    ContextMenuCheckboxItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center",
    ContextMenuCheckboxItemIcon: "pointer-events-none shrink-0 size-4",
    ContextMenuRadioItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    ContextMenuRadioItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center",
    ContextMenuRadioItemIcon: "pointer-events-none shrink-0 size-4",
    ContextMenuLabel: "font-medium text-muted-foreground text-xs px-1.5 py-1",
    ContextMenuSeparator: "bg-border -mx-1 my-1 h-px",
    ContextMenuSubTrigger:
      "select-none cursor-default rounded-md text-sm outline-none flex px-1.5 py-1 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground",
    ContextMenuSubTriggerIcon:
      "pointer-events-none ml-auto shrink-0 size-4 rtl:rotate-180",
    ContextMenuSubPositioner: "outline-none z-50 isolate",
    ContextMenuSubContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-lg rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 min-w-36 max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
  },
  inButtonGroup: {
    horizontal: {
      ContextMenuTrigger:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      ContextMenuTrigger:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  variant: {
    destructive: {
      ContextMenuItem:
        "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20",
      ContextMenuItemIcon: "text-destructive",
    },
  },
  inset: {
    true: {
      ContextMenuItem: "pl-7",
      ContextMenuCheckboxItem: "pl-7",
      ContextMenuRadioItem: "pl-7",
      ContextMenuLabel: "pl-7",
      ContextMenuSubTrigger: "pl-7",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    ContextMenuTrigger: { present: false },
    ContextMenuPortal: { present: false },
    ContextMenuPositioner: {
      side: "right",
      sideOffset: 0,
      align: "start",
      alignOffset: 4,
    },
    ContextMenuItemIcon: { present: false },
    ContextMenuShortcut: { present: false },
    ContextMenuSubTrigger: { present: false },
    ContextMenuSubPortal: { present: false },
    ContextMenuSubPositioner: {
      side: "right",
      sideOffset: 0,
      align: "start",
      alignOffset: 4,
    },
    Children: { inMenu: true },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <ContextMenu>
      <ContextMenuTrigger />
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuContent>
            <ContextMenuItem repeatable>
              <ContextMenuItemIcon />
              <ContextMenuItemText>
                <Children />
              </ContextMenuItemText>
              <ContextMenuShortcut />
            </ContextMenuItem>
            <ContextMenuCheckboxItem repeatable>
              <ContextMenuCheckboxItemIndicator>
                <ContextMenuCheckboxItemMark>
                  <ContextMenuCheckboxItemIcon />
                </ContextMenuCheckboxItemMark>
              </ContextMenuCheckboxItemIndicator>
              <Children />
            </ContextMenuCheckboxItem>
            <ContextMenuRadioGroup repeatable>
              <ContextMenuRadioItem repeatable>
                <ContextMenuRadioItemIndicator>
                  <ContextMenuRadioItemMark>
                    <ContextMenuRadioItemIcon />
                  </ContextMenuRadioItemMark>
                </ContextMenuRadioItemIndicator>
                <Children />
              </ContextMenuRadioItem>
              <Children />
            </ContextMenuRadioGroup>
            <ContextMenuGroup repeatable>
              <Children />
            </ContextMenuGroup>
            <ContextMenuLabel repeatable />
            <ContextMenuSeparator repeatable />
            <ContextMenuSub repeatable>
              <ContextMenuSubTrigger>
                <Children />
                <ContextMenuSubTriggerIcon />
              </ContextMenuSubTrigger>
              <ContextMenuSubPortal>
                <ContextMenuSubPositioner>
                  <ContextMenuSubContent>
                    <Children />
                  </ContextMenuSubContent>
                </ContextMenuSubPositioner>
              </ContextMenuSubPortal>
            </ContextMenuSub>
            <Children />
          </ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  ),
});
