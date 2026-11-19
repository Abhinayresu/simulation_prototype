/** @jsxImportSource ../core/template */

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
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

export const DropdownMenu = defineElement({
  name: "DropdownMenu",
  as: MenuPrimitive.Root,
  variants,
});

export const DropdownMenuTrigger = defineElement({
  name: "DropdownMenuTrigger",
  as: MenuPrimitive.Trigger,
});

export const DropdownMenuPortal = defineElement({
  name: "DropdownMenuPortal",
  as: MenuPrimitive.Portal,
});

export const DropdownMenuPositioner = defineElement({
  name: "DropdownMenuPositioner",
  as: MenuPrimitive.Positioner,
});

export const DropdownMenuContent = defineElement({
  name: "DropdownMenuContent",
  as: MenuPrimitive.Popup,
});

const itemVariants = defineVariants(
  { variant: ["default", "destructive"], inset: [true, false] },
  { defaults: { variant: "default" } },
);

export const DropdownMenuItem = defineElement({
  name: "DropdownMenuItem",
  as: MenuPrimitive.Item,
  variants: itemVariants,
});

export const DropdownMenuItemIcon = defineElement({
  name: "DropdownMenuItemIcon",
});

export const DropdownMenuItemText = defineElement({
  name: "DropdownMenuItemText",
  as: "span",
});

export const DropdownMenuShortcut = defineElement({
  name: "DropdownMenuShortcut",
  as: "span",
});

const checkboxItemVariants = defineVariants({ inset: [true, false] });

export const DropdownMenuCheckboxItem = defineElement({
  name: "DropdownMenuCheckboxItem",
  as: MenuPrimitive.CheckboxItem,
  variants: checkboxItemVariants,
});

export const DropdownMenuCheckboxItemIndicator = defineElement({
  name: "DropdownMenuCheckboxItemIndicator",
  as: "span",
});

export const DropdownMenuCheckboxItemMark = defineElement({
  name: "DropdownMenuCheckboxItemMark",
  as: MenuPrimitive.CheckboxItemIndicator,
});

export const DropdownMenuCheckboxItemIcon = defineElement({
  name: "DropdownMenuCheckboxItemIcon",
  icon: CheckIcon,
});

export const DropdownMenuRadioGroup = defineElement({
  name: "DropdownMenuRadioGroup",
  as: MenuPrimitive.RadioGroup,
});

const radioItemVariants = defineVariants({ inset: [true, false] });

export const DropdownMenuRadioItem = defineElement({
  name: "DropdownMenuRadioItem",
  as: MenuPrimitive.RadioItem,
  variants: radioItemVariants,
});

export const DropdownMenuRadioItemIndicator = defineElement({
  name: "DropdownMenuRadioItemIndicator",
  as: "span",
});

export const DropdownMenuRadioItemMark = defineElement({
  name: "DropdownMenuRadioItemMark",
  as: MenuPrimitive.RadioItemIndicator,
});

export const DropdownMenuRadioItemIcon = defineElement({
  name: "DropdownMenuRadioItemIcon",
  icon: CheckIcon,
});

export const DropdownMenuGroup = defineElement({
  name: "DropdownMenuGroup",
  as: MenuPrimitive.Group,
});

const labelVariants = defineVariants({ inset: [true, false] });

export const DropdownMenuLabel = defineElement({
  name: "DropdownMenuLabel",
  as: "div",
  variants: labelVariants,
});

export const DropdownMenuSeparator = defineElement({
  name: "DropdownMenuSeparator",
  as: MenuPrimitive.Separator,
});

export const DropdownMenuSub = defineElement({
  name: "DropdownMenuSub",
  as: MenuPrimitive.SubmenuRoot,
});

const subTriggerVariants = defineVariants({ inset: [true, false] });

export const DropdownMenuSubTrigger = defineElement({
  name: "DropdownMenuSubTrigger",
  as: MenuPrimitive.SubmenuTrigger,
  variants: subTriggerVariants,
});

export const DropdownMenuSubTriggerIcon = defineElement({
  name: "DropdownMenuSubTriggerIcon",
  icon: ChevronRightIcon,
});

export const DropdownMenuSubPortal = defineElement({
  name: "DropdownMenuSubPortal",
  as: MenuPrimitive.Portal,
});

export const DropdownMenuSubPositioner = defineElement({
  name: "DropdownMenuSubPositioner",
  as: MenuPrimitive.Positioner,
});

export const DropdownMenuSubContent = defineElement({
  name: "DropdownMenuSubContent",
  as: MenuPrimitive.Popup,
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
    DropdownMenuPositioner: "outline-none z-50 isolate",
    DropdownMenuContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 w-(--anchor-width) min-w-32 max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
    DropdownMenuItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative px-1.5 py-1 items-center gap-1.5 group/dropdown-menu-item focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    DropdownMenuItemIcon: "pointer-events-none shrink-0 size-4",
    DropdownMenuShortcut:
      "text-muted-foreground text-xs tracking-widest ml-auto group-focus/dropdown-menu-item:text-accent-foreground",
    DropdownMenuCheckboxItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    DropdownMenuCheckboxItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center",
    DropdownMenuCheckboxItemIcon: "pointer-events-none shrink-0 size-4",
    DropdownMenuRadioItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-8 pl-1.5 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    DropdownMenuRadioItemIndicator:
      "pointer-events-none flex absolute right-2 justify-center items-center",
    DropdownMenuRadioItemIcon: "pointer-events-none shrink-0 size-4",
    DropdownMenuLabel: "font-medium text-muted-foreground text-xs px-1.5 py-1",
    DropdownMenuSeparator: "bg-border -mx-1 my-1 h-px",
    DropdownMenuSubTrigger:
      "select-none cursor-default rounded-md text-sm outline-none flex px-1.5 py-1 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground",
    DropdownMenuSubTriggerIcon:
      "pointer-events-none ml-auto shrink-0 size-4 rtl:rotate-180",
    DropdownMenuSubPositioner: "outline-none z-50 isolate",
    DropdownMenuSubContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-lg rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 w-auto min-w-[96px] max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
  },
  inButtonGroup: {
    horizontal: {
      DropdownMenuTrigger:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      DropdownMenuTrigger:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  variant: {
    destructive: {
      DropdownMenuItem:
        "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20",
      DropdownMenuItemIcon: "text-destructive",
    },
  },
  inset: {
    true: {
      DropdownMenuItem: "pl-7",
      DropdownMenuCheckboxItem: "pl-7",
      DropdownMenuRadioItem: "pl-7",
      DropdownMenuLabel: "pl-7",
      DropdownMenuSubTrigger: "pl-7",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    DropdownMenuTrigger: { present: false },
    DropdownMenuPortal: { present: false },
    DropdownMenuPositioner: {
      side: "bottom",
      sideOffset: 4,
      align: "start",
      alignOffset: 0,
    },
    DropdownMenuItemIcon: { present: false },
    DropdownMenuShortcut: { present: false },
    DropdownMenuSubTrigger: { present: false },
    DropdownMenuSubPortal: { present: false },
    DropdownMenuSubPositioner: {
      side: "right",
      sideOffset: 0,
      align: "start",
      alignOffset: -3,
    },
    Children: { inMenu: true },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <DropdownMenu>
      <DropdownMenuTrigger />
      <DropdownMenuPortal>
        <DropdownMenuPositioner>
          <DropdownMenuContent>
            <DropdownMenuItem repeatable>
              <DropdownMenuItemIcon />
              <DropdownMenuItemText>
                <Children />
              </DropdownMenuItemText>
              <DropdownMenuShortcut />
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem repeatable>
              <DropdownMenuCheckboxItemIndicator>
                <DropdownMenuCheckboxItemMark>
                  <DropdownMenuCheckboxItemIcon />
                </DropdownMenuCheckboxItemMark>
              </DropdownMenuCheckboxItemIndicator>
              <Children />
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup repeatable>
              <DropdownMenuRadioItem repeatable>
                <DropdownMenuRadioItemIndicator>
                  <DropdownMenuRadioItemMark>
                    <DropdownMenuRadioItemIcon />
                  </DropdownMenuRadioItemMark>
                </DropdownMenuRadioItemIndicator>
                <Children />
              </DropdownMenuRadioItem>
              <Children />
            </DropdownMenuRadioGroup>
            <DropdownMenuGroup repeatable>
              <Children />
            </DropdownMenuGroup>
            <DropdownMenuLabel repeatable />
            <DropdownMenuSeparator repeatable />
            <DropdownMenuSub repeatable>
              <DropdownMenuSubTrigger>
                <Children />
                <DropdownMenuSubTriggerIcon />
              </DropdownMenuSubTrigger>
              <DropdownMenuSubPortal>
                <DropdownMenuSubPositioner>
                  <DropdownMenuSubContent>
                    <Children />
                  </DropdownMenuSubContent>
                </DropdownMenuSubPositioner>
              </DropdownMenuSubPortal>
            </DropdownMenuSub>
            <Children />
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
});
