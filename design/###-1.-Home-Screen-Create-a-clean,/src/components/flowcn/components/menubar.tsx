/** @jsxImportSource ../core/template */

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

export const Menubar = defineElement({ name: "Menubar", as: MenubarPrimitive });

const menuVariants = defineVariants({
  inButtonGroup: ["horizontal", "vertical"],
});

export const MenubarMenu = defineElement({
  name: "MenubarMenu",
  as: MenuPrimitive.Root,
  variants: menuVariants,
});

export const MenubarTrigger = defineElement({
  name: "MenubarTrigger",
  as: MenuPrimitive.Trigger,
});

export const MenubarPortal = defineElement({
  name: "MenubarPortal",
  as: MenuPrimitive.Portal,
});

export const MenubarPositioner = defineElement({
  name: "MenubarPositioner",
  as: MenuPrimitive.Positioner,
});

export const MenubarContent = defineElement({
  name: "MenubarContent",
  as: MenuPrimitive.Popup,
});

const itemVariants = defineVariants(
  { variant: ["default", "destructive"], inset: [true, false] },
  { defaults: { variant: "default" } },
);

export const MenubarItem = defineElement({
  name: "MenubarItem",
  as: MenuPrimitive.Item,
  variants: itemVariants,
});

export const MenubarItemIcon = defineElement({ name: "MenubarItemIcon" });

export const MenubarItemText = defineElement({
  name: "MenubarItemText",
  as: "span",
});

export const MenubarShortcut = defineElement({
  name: "MenubarShortcut",
  as: "span",
});

const checkboxItemVariants = defineVariants({ inset: [true, false] });

export const MenubarCheckboxItem = defineElement({
  name: "MenubarCheckboxItem",
  as: MenuPrimitive.CheckboxItem,
  variants: checkboxItemVariants,
});

export const MenubarCheckboxItemIndicator = defineElement({
  name: "MenubarCheckboxItemIndicator",
  as: "span",
});

export const MenubarCheckboxItemMark = defineElement({
  name: "MenubarCheckboxItemMark",
  as: MenuPrimitive.CheckboxItemIndicator,
});

export const MenubarCheckboxItemIcon = defineElement({
  name: "MenubarCheckboxItemIcon",
  icon: CheckIcon,
});

export const MenubarRadioGroup = defineElement({
  name: "MenubarRadioGroup",
  as: MenuPrimitive.RadioGroup,
});

const radioItemVariants = defineVariants({ inset: [true, false] });

export const MenubarRadioItem = defineElement({
  name: "MenubarRadioItem",
  as: MenuPrimitive.RadioItem,
  variants: radioItemVariants,
});

export const MenubarRadioItemIndicator = defineElement({
  name: "MenubarRadioItemIndicator",
  as: "span",
});

export const MenubarRadioItemMark = defineElement({
  name: "MenubarRadioItemMark",
  as: MenuPrimitive.RadioItemIndicator,
});

export const MenubarRadioItemIcon = defineElement({
  name: "MenubarRadioItemIcon",
  icon: CheckIcon,
});

export const MenubarGroup = defineElement({
  name: "MenubarGroup",
  as: MenuPrimitive.Group,
});

const labelVariants = defineVariants({ inset: [true, false] });

export const MenubarLabel = defineElement({
  name: "MenubarLabel",
  as: "div",
  variants: labelVariants,
});

export const MenubarSeparator = defineElement({
  name: "MenubarSeparator",
  as: MenuPrimitive.Separator,
});

export const MenubarSub = defineElement({
  name: "MenubarSub",
  as: MenuPrimitive.SubmenuRoot,
});

const subTriggerVariants = defineVariants({ inset: [true, false] });

export const MenubarSubTrigger = defineElement({
  name: "MenubarSubTrigger",
  as: MenuPrimitive.SubmenuTrigger,
  variants: subTriggerVariants,
});

export const MenubarSubTriggerIcon = defineElement({
  name: "MenubarSubTriggerIcon",
  icon: ChevronRightIcon,
});

export const MenubarSubPortal = defineElement({
  name: "MenubarSubPortal",
  as: MenuPrimitive.Portal,
});

export const MenubarSubPositioner = defineElement({
  name: "MenubarSubPositioner",
  as: MenuPrimitive.Positioner,
});

export const MenubarSubContent = defineElement({
  name: "MenubarSubContent",
  as: MenuPrimitive.Popup,
});

const styles = defineStyles<
  typeof menuVariants &
    typeof itemVariants &
    typeof checkboxItemVariants &
    typeof radioItemVariants &
    typeof labelVariants &
    typeof subTriggerVariants
>({
  base: {
    Menubar: "rounded-lg border flex p-[3px] items-center gap-0.5 h-8",
    MenubarTrigger:
      "font-medium select-none rounded-sm text-sm outline-none flex px-1.5 py-[2px] items-center hover:bg-muted aria-expanded:bg-muted",
    MenubarPositioner: "outline-none z-50 isolate",
    MenubarContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-md rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 w-(--anchor-width) min-w-36 max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
    MenubarItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative px-1.5 py-1 items-center gap-1.5 group/menubar-item focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    MenubarItemIcon: "pointer-events-none shrink-0 size-4",
    MenubarShortcut:
      "text-muted-foreground text-xs tracking-widest ml-auto group-focus/menubar-item:text-accent-foreground",
    MenubarCheckboxItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-1.5 pl-7 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    MenubarCheckboxItemIndicator:
      "pointer-events-none flex absolute left-1.5 justify-center items-center size-4",
    MenubarCheckboxItemIcon: "pointer-events-none shrink-0 size-4",
    MenubarRadioItem:
      "select-none cursor-default rounded-md text-sm outline-none flex relative py-1 pr-1.5 pl-7 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-disabled:opacity-50 data-disabled:pointer-events-none",
    MenubarRadioItemIndicator:
      "pointer-events-none flex absolute left-1.5 justify-center items-center size-4",
    MenubarRadioItemIcon: "pointer-events-none shrink-0 size-4",
    MenubarLabel: "font-medium text-muted-foreground text-sm px-1.5 py-1",
    MenubarSeparator: "bg-border -mx-1 my-1 h-px",
    MenubarSubTrigger:
      "select-none cursor-default rounded-md text-sm outline-none flex px-1.5 py-1 items-center gap-1.5 focus:bg-accent focus:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground",
    MenubarSubTriggerIcon:
      "pointer-events-none ml-auto shrink-0 size-4 rtl:rotate-180",
    MenubarSubPositioner: "outline-none z-50 isolate",
    MenubarSubContent:
      "origin-(--transform-origin) duration-100 ring ring-foreground/10 shadow-lg rounded-lg bg-popover text-popover-foreground outline-none z-50 p-1 w-auto min-w-32 max-h-(--available-height) overflow-x-hidden overflow-y-auto data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:overflow-hidden",
  },
  inButtonGroup: {
    horizontal: {
      MenubarTrigger:
        "rounded-none border-l-0 first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:relative focus-visible:z-10",
    },
    vertical: {
      MenubarTrigger:
        "rounded-none border-t-0 first:rounded-t-lg first:border-t last:rounded-b-lg focus-visible:relative focus-visible:z-10",
    },
  },
  variant: {
    destructive: {
      MenubarItem:
        "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20",
      MenubarItemIcon: "text-destructive",
    },
  },
  inset: {
    true: {
      MenubarItem: "pl-7",
      MenubarCheckboxItem: "pl-7",
      MenubarRadioItem: "pl-7",
      MenubarLabel: "pl-7",
      MenubarSubTrigger: "pl-7",
    },
  },
});

const props = defineProps({
  base: {
    MenubarTrigger: { present: false },
    MenubarPortal: { present: false },
    MenubarPositioner: {
      side: "bottom",
      sideOffset: 8,
      align: "start",
      alignOffset: -4,
    },
    MenubarItemIcon: { present: false },
    MenubarShortcut: { present: false },
    MenubarSubTrigger: { present: false },
    MenubarSubPortal: { present: false },
    MenubarSubPositioner: {
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
    <Menubar>
      <MenubarMenu repeatable>
        <MenubarTrigger />
        <MenubarPortal>
          <MenubarPositioner>
            <MenubarContent>
              <MenubarItem repeatable>
                <MenubarItemIcon />
                <MenubarItemText>
                  <Children />
                </MenubarItemText>
                <MenubarShortcut />
              </MenubarItem>
              <MenubarCheckboxItem repeatable>
                <MenubarCheckboxItemIndicator>
                  <MenubarCheckboxItemMark>
                    <MenubarCheckboxItemIcon />
                  </MenubarCheckboxItemMark>
                </MenubarCheckboxItemIndicator>
                <Children />
              </MenubarCheckboxItem>
              <MenubarRadioGroup repeatable>
                <MenubarRadioItem repeatable>
                  <MenubarRadioItemIndicator>
                    <MenubarRadioItemMark>
                      <MenubarRadioItemIcon />
                    </MenubarRadioItemMark>
                  </MenubarRadioItemIndicator>
                  <Children />
                </MenubarRadioItem>
                <Children />
              </MenubarRadioGroup>
              <MenubarGroup repeatable>
                <Children />
              </MenubarGroup>
              <MenubarLabel repeatable />
              <MenubarSeparator repeatable />
              <MenubarSub repeatable>
                <MenubarSubTrigger>
                  <Children />
                  <MenubarSubTriggerIcon />
                </MenubarSubTrigger>
                <MenubarSubPortal>
                  <MenubarSubPositioner>
                    <MenubarSubContent>
                      <Children />
                    </MenubarSubContent>
                  </MenubarSubPositioner>
                </MenubarSubPortal>
              </MenubarSub>
              <Children />
            </MenubarContent>
          </MenubarPositioner>
        </MenubarPortal>
      </MenubarMenu>
    </Menubar>
  ),
});
