/** @jsxImportSource ../core/template */

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({ align: ["start", "center", "end"] });

export const NavigationMenu = defineElement({
  name: "NavigationMenu",
  as: NavigationMenuPrimitive.Root,
  variants,
});

export const NavigationMenuList = defineElement({
  name: "NavigationMenuList",
  as: NavigationMenuPrimitive.List,
});

export const NavigationMenuItem = defineElement({
  name: "NavigationMenuItem",
  as: NavigationMenuPrimitive.Item,
});

export const NavigationMenuTrigger = defineElement({
  name: "NavigationMenuTrigger",
  as: NavigationMenuPrimitive.Trigger,
});

export const NavigationMenuTriggerText = defineElement({
  name: "NavigationMenuTriggerText",
  as: "span",
});

export const NavigationMenuTriggerIcon = defineElement({
  name: "NavigationMenuTriggerIcon",
  icon: ChevronDownIcon,
});

export const NavigationMenuIndicator = defineElement({
  name: "NavigationMenuIndicator",
  as: NavigationMenuPrimitive.Icon,
});

export const NavigationMenuIndicatorArrow = defineElement({
  name: "NavigationMenuIndicatorArrow",
  as: "div",
});

const contentVariants = defineVariants(
  { inContent: [true, false] },
  { defaults: { inContent: true } },
);

export const NavigationMenuContent = defineElement({
  name: "NavigationMenuContent",
  as: NavigationMenuPrimitive.Content,
  variants: contentVariants,
});

const linkVariants = defineVariants({ variant: ["default", "trigger"] });

export const NavigationMenuLink = defineElement({
  name: "NavigationMenuLink",
  as: NavigationMenuPrimitive.Link,
  variants: linkVariants,
});

export const NavigationMenuLinkIcon = defineElement({
  name: "NavigationMenuLinkIcon",
});

export const NavigationMenuPortal = defineElement({
  name: "NavigationMenuPortal",
  as: NavigationMenuPrimitive.Portal,
});

export const NavigationMenuPositioner = defineElement({
  name: "NavigationMenuPositioner",
  as: NavigationMenuPrimitive.Positioner,
});

export const NavigationMenuPopup = defineElement({
  name: "NavigationMenuPopup",
  as: NavigationMenuPrimitive.Popup,
});

export const NavigationMenuViewport = defineElement({
  name: "NavigationMenuViewport",
  as: NavigationMenuPrimitive.Viewport,
});

const styles = defineStyles<
  typeof variants & typeof contentVariants & typeof linkVariants
>({
  base: {
    NavigationMenu:
      "flex relative justify-center items-center flex-1 max-w-max",
    NavigationMenuList:
      "list-none flex justify-center items-center flex-1 gap-0",
    NavigationMenuItem: "relative",
    NavigationMenuTrigger:
      "font-medium transition-all rounded-lg text-sm outline-none inline-flex px-2.5 py-1.5 justify-center items-center w-max h-9 group/navigation-menu-trigger hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline disabled:opacity-50 disabled:pointer-events-none data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted focus:data-popup-open:bg-muted/50 hover:focus:data-popup-open:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted data-popup-open:data-open:hover:bg-muted data-popup-open:data-open:focus:bg-muted data-open:hover:focus:data-popup-open:bg-muted data-active:data-popup-open:hover:bg-muted data-active:hover:focus:data-popup-open:bg-muted data-active:data-open:hover:bg-muted data-active:data-open:focus:bg-muted data-active:data-popup-open:data-open:hover:bg-muted data-active:data-popup-open:data-open:focus:bg-muted data-active:data-open:hover:focus:data-popup-open:bg-muted",
    NavigationMenuTriggerIcon:
      "transition duration-300 relative top-px ml-1 size-3 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180",
    NavigationMenuIndicator:
      "flex z-1 top-full justify-center items-end h-1.5 overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:animate-in data-[state=visible]:fade-in-0",
    NavigationMenuIndicatorArrow:
      "rotate-45 shadow-md rounded-tl-sm bg-border relative top-3/5 size-2",
    NavigationMenuContent:
      "[transition:opacity_0.35s_cubic-bezier(0.22,1,0.36,1),transform_0.35s_cubic-bezier(0.22,1,0.36,1),translate_0.35s_cubic-bezier(0.22,1,0.36,1)] p-1 w-auto h-full data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2",
    NavigationMenuLink:
      "transition-all rounded-lg text-sm outline-none flex p-2 items-center gap-2 hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted",
    NavigationMenuLinkIcon: "size-4",
    NavigationMenuPositioner:
      "[transition:top_0.35s_cubic-bezier(0.22,1,0.36,1),left_0.35s_cubic-bezier(0.22,1,0.36,1),right_0.35s_cubic-bezier(0.22,1,0.36,1),bottom_0.35s_cubic-bezier(0.22,1,0.36,1)] z-50 w-(--positioner-width) h-(--positioner-height) max-w-(--available-width) isolate data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-[10px]",
    NavigationMenuPopup:
      "origin-(--transform-origin) [transition:opacity_0.35s_cubic-bezier(0.22,1,0.36,1),transform_0.35s_cubic-bezier(0.22,1,0.36,1),width_0.35s_cubic-bezier(0.22,1,0.36,1),height_0.35s_cubic-bezier(0.22,1,0.36,1),scale_0.35s_cubic-bezier(0.22,1,0.36,1),translate_0.35s_cubic-bezier(0.22,1,0.36,1)] ring ring-foreground/10 shadow-sm rounded-lg bg-popover text-popover-foreground outline-none relative w-(--popup-width) h-(--popup-height) data-ending-style:scale-90 data-ending-style:duration-150 data-ending-style:ease-[ease] data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
    NavigationMenuViewport: "relative size-full overflow-hidden",
  },
  inContent: {
    true: { NavigationMenuLink: "rounded-md focus:ring-0 focus:outline-none" },
  },
  variant: {
    trigger: {
      NavigationMenuLink:
        "font-medium transition-all rounded-lg text-sm outline-none inline-flex px-2.5 py-1.5 justify-center items-center w-max h-9 hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline disabled:opacity-50 disabled:pointer-events-none data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted focus:data-popup-open:bg-muted/50 hover:focus:data-popup-open:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted data-popup-open:data-open:hover:bg-muted data-popup-open:data-open:focus:bg-muted data-open:hover:focus:data-popup-open:bg-muted data-active:data-popup-open:hover:bg-muted data-active:hover:focus:data-popup-open:bg-muted data-active:data-open:hover:bg-muted data-active:data-open:focus:bg-muted data-active:data-popup-open:data-open:hover:bg-muted data-active:data-popup-open:data-open:focus:bg-muted data-active:data-open:hover:focus:data-popup-open:bg-muted",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    NavigationMenuList: { present: true },
    NavigationMenuTrigger: { present: false },
    NavigationMenuIndicator: { present: false },
    NavigationMenuLinkIcon: { present: false },
    NavigationMenuPositioner: {
      side: "bottom",
      sideOffset: 8,
      align: "start",
      alignOffset: 0,
    },
  },
  align: {
    start: { NavigationMenuPositioner: { align: "start" } },
    center: { NavigationMenuPositioner: { align: "center" } },
    end: { NavigationMenuPositioner: { align: "end" } },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem repeatable>
          <NavigationMenuTrigger>
            <NavigationMenuTriggerText>
              <Children />
            </NavigationMenuTriggerText>
            <NavigationMenuTriggerIcon />
          </NavigationMenuTrigger>
          <NavigationMenuIndicator>
            <NavigationMenuIndicatorArrow />
          </NavigationMenuIndicator>
          <NavigationMenuContent repeatable>
            <NavigationMenuLink repeatable>
              <NavigationMenuLinkIcon />
              <Children />
            </NavigationMenuLink>
            <Children />
          </NavigationMenuContent>
          <Children />
        </NavigationMenuItem>
        <Children />
      </NavigationMenuList>
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  ),
});
