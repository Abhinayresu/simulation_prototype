/** @jsxImportSource ../core/template */

import { defineComponent, defineElement, defineStyles } from "../core/index.ts";

export const Paragraph = defineElement({ name: "Paragraph", as: "p" });

const styles = defineStyles({ base: { Paragraph: "mb-4 last:mb-0" } });

defineComponent({ styles, structure: <Paragraph /> });
