/** @jsxImportSource ../core/template */

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  {
    swipeDirection: ["down", "up", "left", "right"],
    modal: [true, false, "trap-focus"],
    snapping: [true, false],
    showSwipeHandle: [true, false],
  },
  { defaults: { swipeDirection: "down", modal: true } },
);

export const Drawer = defineElement({
  name: "Drawer",
  as: DrawerPrimitive.Root,
  variants,
});

export const DrawerTrigger = defineElement({
  name: "DrawerTrigger",
  as: DrawerPrimitive.Trigger,
});

export const DrawerPortal = defineElement({
  name: "DrawerPortal",
  as: DrawerPrimitive.Portal,
});

export const DrawerOverlay = defineElement({
  name: "DrawerOverlay",
  as: DrawerPrimitive.Backdrop,
});

export const DrawerViewport = defineElement({
  name: "DrawerViewport",
  as: DrawerPrimitive.Viewport,
});

export const DrawerContent = defineElement({
  name: "DrawerContent",
  as: DrawerPrimitive.Popup,
});

export const DrawerSwipeHandle = defineElement({
  name: "DrawerSwipeHandle",
  as: "div",
});

export const DrawerBody = defineElement({
  name: "DrawerBody",
  as: DrawerPrimitive.Content,
});

export const DrawerHeader = defineElement({ name: "DrawerHeader", as: "div" });

export const DrawerTitle = defineElement({
  name: "DrawerTitle",
  as: DrawerPrimitive.Title,
});

export const DrawerDescription = defineElement({
  name: "DrawerDescription",
  as: DrawerPrimitive.Description,
});

export const DrawerFooter = defineElement({ name: "DrawerFooter", as: "div" });

export const DrawerClose = defineElement({
  name: "DrawerClose",
  as: DrawerPrimitive.Close,
});

const styles = defineStyles<typeof variants>({
  base: {
    DrawerOverlay:
      "transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none opacity-[max(0,calc(1-var(--drawer-swipe-progress)))] bg-black/10 fixed z-50 inset-0 min-h-dvh data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:opacity-0 data-ending-style:pointer-events-none data-starting-style:opacity-0 data-swiping:duration-0 data-ending-style:data-swiping:duration-0 supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute",
    DrawerViewport: "select-none pointer-events-none fixed z-50 inset-0",
    DrawerContent:
      "will-change-transform [transition:transform_450ms_cubic-bezier(0.22,1,0.36,1),height_450ms_cubic-bezier(0.22,1,0.36,1),opacity_450ms_cubic-bezier(0.22,1,0.36,1),filter_450ms_cubic-bezier(0.22,1,0.36,1)] [interpolate-size:allow-keywords] select-none pointer-events-auto bg-popover text-popover-foreground text-sm outline-none flex fixed z-50 flex-col h-[var(--drawer-height,auto)] min-h-0 group/drawer-content after:pointer-events-none after:bg-popover after:absolute data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-ending-style:opacity-[99.99%] data-nested-drawer-open:brightness-95 data-nested-drawer-open:overflow-hidden data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
    DrawerSwipeHandle:
      "transition-opacity duration-200 cursor-grab flex relative z-10 shrink-0 group-data-nested-drawer-open/drawer-content:opacity-0 group-data-nested-drawer-swiping/drawer-content:opacity-100 group-data-nested-drawer-open/drawer-content:group-data-nested-drawer-swiping/drawer-content:opacity-100 after:rounded-full after:bg-muted after:block after:shrink-0 active:cursor-grabbing",
    DrawerBody:
      "transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text flex flex-col flex-1 min-h-0 overflow-hidden overscroll-contain group-data-nested-drawer-open/drawer-content:opacity-0 group-data-nested-drawer-swiping/drawer-content:opacity-100 group-data-nested-drawer-open/drawer-content:group-data-nested-drawer-swiping/drawer-content:opacity-100 group-data-swiping/drawer-content:select-none",
    DrawerHeader:
      "flex px-4 pt-4 pb-0 flex-col shrink-0 gap-0.5 md:text-left md:gap-0.5",
    DrawerTitle: "font-medium text-foreground text-base",
    DrawerDescription: "text-balance text-muted-foreground text-sm",
    DrawerFooter: "flex mt-auto px-4 pt-0 pb-4 flex-col shrink-0 gap-2",
  },
  modal: { true: { DrawerViewport: "pointer-events-auto" } },
  swipeDirection: {
    down: {
      DrawerContent:
        "transform-[translate3d(0px,calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-max(0px,calc((var(--nested-drawers)-clamp(0,var(--drawer-swipe-progress),1))*1rem))-(1-clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))*var(--drawer-frontmost-height,var(--drawer-height,0px))),0px)_scale(clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1),clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))] origin-bottom rounded-t-xl border-t inset-x-0 bottom-0 max-h-[calc(100dvh-6rem)] after:inset-x-0 after:top-full after:h-[3rem] data-ending-style:transform-[translate3d(0px,calc(100%+2px),0px)] data-nested-drawer-open:h-[var(--drawer-frontmost-height,var(--drawer-height,0px))] data-starting-style:transform-[translate3d(0px,calc(100%+2px),0px)]",
      DrawerSwipeHandle:
        "justify-center items-end w-full h-3 after:w-24 after:h-1",
      DrawerBody: "rounded-t-xl",
      DrawerHeader: "text-center md:text-center",
    },
    up: {
      DrawerContent:
        "transform-[translate3d(0px,calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+max(0px,calc((var(--nested-drawers)-clamp(0,var(--drawer-swipe-progress),1))*1rem))+(1-clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))*var(--drawer-frontmost-height,var(--drawer-height,0px))),0px)_scale(clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1),clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))] origin-top rounded-b-xl border-b inset-x-0 top-0 max-h-[calc(100dvh-6rem)] after:inset-x-0 after:bottom-full after:h-[3rem] data-ending-style:transform-[translate3d(0px,calc(-100%-2px),0px)] data-nested-drawer-open:h-[var(--drawer-frontmost-height,var(--drawer-height,0px))] data-starting-style:transform-[translate3d(0px,calc(-100%-2px),0px)]",
      DrawerSwipeHandle:
        "justify-center items-start order-last w-full h-3 after:w-24 after:h-1",
      DrawerBody: "rounded-b-xl",
      DrawerHeader: "text-center md:text-center",
    },
    left: {
      DrawerContent:
        "transform-[translate3d(calc(var(--drawer-swipe-movement-x)+max(0px,calc((var(--nested-drawers)-clamp(0,var(--drawer-swipe-progress),1))*1rem))+(1-clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))*100%),0px,0px)_scale(clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1),clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))] origin-left rounded-r-xl border-r inset-y-0 left-0 flex-row w-3/4 after:inset-y-0 after:right-full after:w-[3rem] data-ending-style:transform-[translate3d(calc(-100%-2px),0px,0px)] data-starting-style:transform-[translate3d(calc(-100%-2px),0px,0px)] sm:w-[24rem]",
      DrawerSwipeHandle:
        "justify-start items-center order-last w-3 h-full after:w-1 after:h-24",
      DrawerBody: "rounded-r-xl",
    },
    right: {
      DrawerContent:
        "transform-[translate3d(calc(var(--drawer-swipe-movement-x)-max(0px,calc((var(--nested-drawers)-clamp(0,var(--drawer-swipe-progress),1))*1rem))-(1-clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))*100%),0px,0px)_scale(clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1),clamp(0,calc(max(0,calc(1-var(--nested-drawers)*0.05))+0.05*clamp(0,var(--drawer-swipe-progress),1)),1))] origin-right rounded-l-xl border-l inset-y-0 right-0 flex-row w-3/4 after:inset-y-0 after:left-full after:w-[3rem] data-ending-style:transform-[translate3d(calc(100%+2px),0px,0px)] data-starting-style:transform-[translate3d(calc(100%+2px),0px,0px)] sm:w-[24rem]",
      DrawerSwipeHandle:
        "justify-end items-center w-3 h-full after:w-1 after:h-24",
      DrawerBody: "rounded-l-xl",
    },
  },
  snapping: {
    true: {
      DrawerOverlay: "opacity-[max(0.5,calc(1-var(--drawer-swipe-progress)))]",
      DrawerContent: "h-dvh",
    },
  },
});

const props = defineProps<typeof variants>({
  base: {
    DrawerTrigger: { present: false },
    DrawerPortal: { present: false },
    DrawerSwipeHandle: { "aria-hidden": "true", present: false },
    DrawerHeader: { present: false },
    DrawerDescription: { present: false },
    DrawerFooter: { present: false },
  },
  modal: {
    false: { DrawerOverlay: { present: false } },
    "trap-focus": { DrawerOverlay: { present: false } },
  },
  showSwipeHandle: { true: { DrawerSwipeHandle: { present: true } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Drawer>
      <DrawerTrigger />
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerViewport>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerBody>
              <DrawerHeader>
                <DrawerTitle>
                  <Children />
                </DrawerTitle>
                <DrawerDescription />
              </DrawerHeader>
              <Children />
              <DrawerFooter />
            </DrawerBody>
          </DrawerContent>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  ),
});
