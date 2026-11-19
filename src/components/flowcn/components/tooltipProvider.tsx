/** @jsxImportSource ../core/template */

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { defineComponent, defineElement, defineProps } from "../core/index.ts";

export const TooltipProvider = defineElement({
  name: "TooltipProvider",
  as: TooltipPrimitive.Provider,
});

const props = defineProps({ base: { TooltipProvider: { delay: 0 } } });

defineComponent({ props, structure: <TooltipProvider /> });
