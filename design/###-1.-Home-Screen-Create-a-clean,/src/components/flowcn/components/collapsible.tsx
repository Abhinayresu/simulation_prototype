/** @jsxImportSource ../core/template */

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
} from "../core/index.ts";

export const Collapsible = defineElement({
  name: "Collapsible",
  as: CollapsiblePrimitive.Root,
});

export const CollapsibleTrigger = defineElement({
  name: "CollapsibleTrigger",
  as: CollapsiblePrimitive.Trigger,
});

export const CollapsibleContent = defineElement({
  name: "CollapsibleContent",
  as: CollapsiblePrimitive.Panel,
});

const props = defineProps({ base: { CollapsibleTrigger: { present: false } } });

defineComponent({
  props,
  structure: (
    <Collapsible>
      <CollapsibleTrigger />
      <CollapsibleContent>
        <Children />
      </CollapsibleContent>
    </Collapsible>
  ),
});
