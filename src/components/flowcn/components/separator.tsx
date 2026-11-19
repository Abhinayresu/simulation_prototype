/** @jsxImportSource ../core/template */

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import {
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const Separator = defineElement({
  name: "Separator",
  as: SeparatorPrimitive,
});

const styles = defineStyles({
  base: {
    Separator:
      "bg-border shrink-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-px data-[orientation=vertical]:self-stretch data-[orientation=vertical]:w-px",
  },
});

const props = defineProps({
  base: { Separator: { orientation: "horizontal" } },
});

defineComponent({ styles, props, structure: <Separator /> });
