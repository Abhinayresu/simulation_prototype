/** @jsxImportSource ../core/template */

import {
  Children,
  defineComponent,
  defineElement,
  defineProps,
  defineStyles,
  defineVariants,
} from "../core/index.ts";

const variants = defineVariants(
  { tone: ["default", "inverted"] },
  { defaults: { tone: "default" } },
);

export const Kbd = defineElement({ name: "Kbd", as: "kbd", variants });

export const KbdIcon = defineElement({ name: "KbdIcon" });

export const KbdText = defineElement({ name: "KbdText", as: "span" });

const styles = defineStyles<typeof variants>({
  base: {
    Kbd: "font-sans font-medium select-none pointer-events-none rounded-sm text-xs inline-flex px-1 justify-center items-center gap-1 w-fit h-5 min-w-5",
    KbdIcon: "size-3",
  },
  tone: {
    default: { Kbd: "bg-muted text-muted-foreground" },
    inverted: {
      Kbd: "bg-background/20 text-background relative z-50 isolate dark:bg-background/10",
    },
  },
});

const props = defineProps<typeof variants>({
  base: { KbdIcon: { present: false } },
});

defineComponent({
  styles,
  props,
  structure: (
    <Kbd>
      <KbdIcon />
      <KbdText>
        <Children />
      </KbdText>
    </Kbd>
  ),
});
