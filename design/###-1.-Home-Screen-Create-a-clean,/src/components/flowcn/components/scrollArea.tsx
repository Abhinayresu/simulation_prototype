/** @jsxImportSource ../core/template */

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const ScrollArea = defineElement({
  name: "ScrollArea",
  as: ScrollAreaPrimitive.Root,
});

export const ScrollAreaViewport = defineElement({
  name: "ScrollAreaViewport",
  as: ScrollAreaPrimitive.Viewport,
});

export const ScrollBar = defineElement({
  name: "ScrollBar",
  as: ScrollAreaPrimitive.Scrollbar,
});

export const ScrollAreaThumb = defineElement({
  name: "ScrollAreaThumb",
  as: ScrollAreaPrimitive.Thumb,
});

export const ScrollBarHorizontal = defineElement({
  name: "ScrollBarHorizontal",
  as: ScrollAreaPrimitive.Scrollbar,
});

export const ScrollBarHorizontalThumb = defineElement({
  name: "ScrollBarHorizontalThumb",
  as: ScrollAreaPrimitive.Thumb,
});

const styles = defineStyles({
  base: {
    ScrollArea: "relative",
    ScrollAreaViewport:
      "transition-[color,box-shadow] outline-none size-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline",
    ScrollBar:
      "transition-colors touch-none select-none flex p-px data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:h-full",
    ScrollAreaThumb: "rounded-full bg-border relative flex-1",
    ScrollBarHorizontal:
      "transition-colors touch-none select-none flex p-px data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:h-full",
    ScrollBarHorizontalThumb: "rounded-full bg-border relative flex-1",
  },
});

const props = defineProps({
  base: {
    ScrollAreaViewport: { present: true },
    ScrollBar: { orientation: "vertical" },
    ScrollBarHorizontal: { orientation: "horizontal", present: false },
  },
});

defineComponent({
  styles,
  props,
  structure: (
    <ScrollArea>
      <ScrollAreaViewport>
        <Children />
      </ScrollAreaViewport>
      <ScrollBar>
        <ScrollAreaThumb />
      </ScrollBar>
      <ScrollBarHorizontal>
        <ScrollBarHorizontalThumb />
      </ScrollBarHorizontal>
      <ScrollAreaPrimitive.Corner />
    </ScrollArea>
  ),
});
