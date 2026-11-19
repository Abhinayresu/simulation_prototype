/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
} from "../core/index.ts";

export const InputGroupText = defineElement({
  name: "InputGroupText",
  as: "span",
});

export const InputGroupTextIcon = defineElement({ name: "InputGroupTextIcon" });

const styles = defineStyles({
  base: {
    InputGroupText: "text-muted-foreground text-sm flex items-center gap-2",
    InputGroupTextIcon: "pointer-events-none size-4",
  },
});

const props = defineProps({ base: { InputGroupTextIcon: { present: false } } });

defineComponent({
  styles,
  props,
  structure: (
    <InputGroupText>
      <InputGroupTextIcon />
      <Children />
    </InputGroupText>
  ),
});
