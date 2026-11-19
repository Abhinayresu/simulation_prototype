/** @jsxImportSource ../core/template */

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

import { Kbd } from "./kbd.tsx";

const variants = defineVariants({ withKbd: [true, false] });

export const Tooltip = defineElement({
  name: "Tooltip",
  as: TooltipPrimitive.Root,
  variants,
});

export const TooltipTrigger = defineElement({
  name: "TooltipTrigger",
  as: TooltipPrimitive.Trigger,
});

export const TooltipPortal = defineElement({
  name: "TooltipPortal",
  as: TooltipPrimitive.Portal,
});

export const TooltipPositioner = defineElement({
  name: "TooltipPositioner",
  as: TooltipPrimitive.Positioner,
});

export const TooltipContent = defineElement({
  name: "TooltipContent",
  as: TooltipPrimitive.Popup,
});

export const TooltipArrow = defineElement({
  name: "TooltipArrow",
  as: TooltipPrimitive.Arrow,
});

const styles = defineStyles<typeof variants>({
  base: {
    TooltipPositioner: "z-50 isolate",
    TooltipContent:
      "origin-(--transform-origin) rounded-md bg-foreground text-background text-xs inline-flex z-50 px-3 py-1.5 items-center gap-1.5 w-fit max-w-xs data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    TooltipArrow:
      "rotate-45 fill-foreground rounded-[2px] bg-foreground absolute z-50 size-2.5 data-[side=bottom]:translate-y-[calc(50%+2px)] data-[side=bottom]:bottom-full data-[side=inline-end]:translate-x-[calc(50%+1px)] data-[side=inline-end]:right-full data-[side=inline-start]:translate-x-[calc(-1*(50%+1px))] data-[side=inline-start]:left-full data-[side=left]:translate-x-[calc(-1*(50%+1px))] data-[side=left]:left-full data-[side=right]:translate-x-[calc(50%+1px)] data-[side=right]:right-full data-[side=top]:translate-y-[calc(-1*(50%+2px))] data-[side=top]:top-full",
  },
  withKbd: { true: { TooltipContent: "pr-1.5" } },
});

const props = defineProps<typeof variants>({
  base: {
    TooltipTrigger: { present: false },
    TooltipPortal: { present: false },
    TooltipPositioner: {
      side: "top",
      sideOffset: 4,
      align: "center",
      alignOffset: 0,
    },
    Kbd: { tone: "inverted" },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <Tooltip>
      <TooltipTrigger />
      <TooltipPortal>
        <TooltipPositioner>
          <TooltipContent>
            <Kbd repeatable />
            <Children />
            <TooltipArrow />
          </TooltipContent>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  ),
});
