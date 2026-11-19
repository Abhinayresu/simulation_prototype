/** @jsxImportSource ../core/template */

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import {
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants({ range: [true, false] });

export const Slider = defineElement({
  name: "Slider",
  as: SliderPrimitive.Root,
  variants,
});

export const SliderControl = defineElement({
  name: "SliderControl",
  as: SliderPrimitive.Control,
});

export const SliderTrack = defineElement({
  name: "SliderTrack",
  as: SliderPrimitive.Track,
});

export const SliderIndicator = defineElement({
  name: "SliderIndicator",
  as: SliderPrimitive.Indicator,
});

export const SliderThumb = defineElement({
  name: "SliderThumb",
  as: SliderPrimitive.Thumb,
});

export const SliderEndThumb = defineElement({
  name: "SliderEndThumb",
  as: SliderPrimitive.Thumb,
});

const styles = defineStyles<typeof variants>({
  base: {
    Slider:
      "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
    SliderControl:
      "touch-none select-none flex relative items-center w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-disabled:opacity-50",
    SliderTrack:
      "select-none rounded-full bg-muted relative grow overflow-hidden data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-full",
    SliderIndicator:
      "select-none bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
    SliderThumb:
      "transition-[color,box-shadow] select-none ring-ring/50 rounded-full bg-white border border-ring block relative shrink-0 size-3 after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-none active:ring-3 disabled:opacity-50 disabled:pointer-events-none data-disabled:pointer-events-none",
    SliderEndThumb:
      "transition-[color,box-shadow] select-none ring-ring/50 rounded-full bg-white border border-ring block relative shrink-0 size-3 after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-none active:ring-3 disabled:opacity-50 disabled:pointer-events-none data-disabled:pointer-events-none",
  },
});

const props = defineProps<typeof variants>({
  base: {
    Slider: {
      orientation: "horizontal",
      thumbAlignment: "edge",
      min: 0,
      max: 100,
    },
    SliderEndThumb: { present: false },
  },
  range: { true: { SliderEndThumb: { present: true } } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Slider>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb />
        <SliderEndThumb />
      </SliderControl>
    </Slider>
  ),
});
