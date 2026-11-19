import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The same `cn` shadcn uses, and FlowCn leans on it harder.
 *
 * Every slot's class list is built in three layers — the component's own
 * default, whatever the parent wires in for this instance, then the
 * override the author wrote — so "later wins" is not a nicety here, it is the
 * override mechanism. `twMerge` is what makes `hidden` + `inline-flex` resolve
 * to `inline-flex` instead of both landing in the attribute and letting source
 * order decide.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * `cn` for a list already merged and the one that comes after it. With nothing
 * after, the merged list is the answer, and is not merged again.
 */
export const after = (
  merged: string | undefined,
  later: string | undefined,
): string => (later ? cn(merged, later) : (merged ?? ""));
