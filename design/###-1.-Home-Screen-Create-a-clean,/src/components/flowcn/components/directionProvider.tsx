/** @jsxImportSource ../core/template */

import { DirectionProvider as DirectionProviderPrimitive } from "@base-ui/react/direction-provider";

import { Children, defineComponent, defineElement } from "../core/index.ts";

export const DirectionProvider = defineElement({
  name: "DirectionProvider",
  as: DirectionProviderPrimitive,
});

defineComponent({
  structure: (
    <DirectionProvider>
      <Children />
    </DirectionProvider>
  ),
});
