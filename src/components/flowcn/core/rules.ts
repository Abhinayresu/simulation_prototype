/**
 * The third rule as data: the Tailwind constructs that let a class style an
 * element other than the one it sits on. `src/__tests__/selectors.test.ts`
 * runs it over FlowCn's components; it is exported as
 * `@flowstepdesign/flowcn/rules` so an app that builds its own components with
 * the engine can hold them to the same rule. The reasons for each entry are in
 * that test's header.
 */

export type Offence = { token: string; why: string };

/** Strips block and line comments, so documentation can quote what it replaced. */
export const stripComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/.*$/gm, "$1");

/**
 * Every token inside a string or template literal — a superset of the classes.
 *
 * `role="group"` (or `role: "group"`) is dropped first. It is an ARIA role,
 * not a class, and it is the only place a bare `group` legitimately appears:
 * `groupName()` always produces `group/<name>`, so any other bare `group` in
 * this source is the unnamed one the rules reject.
 */
export const tokensOf = (source: string): string[] => {
  const literals =
    source
      .replace(/\brole(?:=|:\s*)("|')[^"']*\1/g, " ")
      .match(/"[^"\n]*"|'[^'\n]*'|`[^`]*`/g) ?? [];
  return literals
    .flatMap((literal) => literal.slice(1, -1).split(/\s+/))
    .filter(Boolean);
};

/**
 * Whether an arbitrary variant — the `[…]` in `[…]:` — relates this element to
 * another one: a combinator anywhere at the top level of the selector, outside
 * the attribute brackets, or `&` that is not the selector's subject.
 */
const arbitraryCrosses = (token: string): boolean => {
  for (const match of token.matchAll(/(^|:)\[((?:[^[\]]|\[[^\]]*\])*)\]:/g)) {
    const selector = match[2]!.replace(/\[[^\]]*\]/g, "");
    if (/[_>+~]/.test(selector)) return true;
  }
  return false;
};

export const RULES: { why: string; test: (token: string) => boolean }[] = [
  {
    // `[&` alone is not the offence — `[&[data-x]]:` and `[&:hover]:` compound
    // conditions onto the element itself and cross nothing. What crosses is a
    // combinator, wherever it sits: a descendant (`[&_svg]`, `[&[data-x]_svg]`),
    // a child (`[&>svg]`), a sibling (`[&+x]`, `[&~x]`), or an ancestor written
    // on the other side (`[.parent_&]`, `[:hover>&]`).
    why: "an arbitrary variant that relates the element to another through a combinator",
    test: arbitraryCrosses,
  },
  {
    why: ":has(), which styles an element based on what it contains",
    test: (token) =>
      /(^|:)(not-)?has-/.test(token) && !/(^|:)group-has-/.test(token),
  },
  {
    why: "group-has-*, which searches a whole subtree from an ancestor",
    test: (token) => token.includes("group-has-"),
  },
  {
    why: "in-*, which styles an element based on an ancestor",
    test: (token) => /(^|:)in-/.test(token),
  },
  {
    why: "peer-*, which reads a sibling's state",
    test: (token) => token === "peer" || /(^|:)peer[-/]/.test(token),
  },
  {
    why: "a child or descendant variant (*: or **:)",
    test: (token) => /(^|:)\*{1,2}:/.test(token),
  },
  {
    why: "space-*/divide-*, which style every child but the last",
    test: (token) => /(^|:)-?(space-[xy]|divide-[xy]?)(-|$)/.test(token),
  },
  {
    // What remains of the named group is state only Base UI knows while the
    // component is in use — `aria-expanded`, `data-popup-open`, `data-swiping`
    // — and `group-focus`. A read of a component's own props (`size`,
    // `variant`, `orientation`) is the component asking itself a question it
    // can answer in JavaScript, and wiring the answer onto the part.
    why: "a named group that reads a prop (group-data-[…], group-data-horizontal/vertical) — the component knows it, so it wires the class",
    test: (token) =>
      /(^|:)group-data-\[/.test(token) ||
      /(^|:)group-data-(horizontal|vertical)\//.test(token),
  },
  {
    // Where an element sits is asked two ways only, so that a component's data
    // holds two conditions: `first:` and `last:`, stacked for the only child
    // (`first:last:`). A negative is written the other way round —
    // `rounded-l-none first:rounded-l-lg`, not `not-first:rounded-l-none` —
    // and `odd:`, `even:`, `nth-*:`, `only:` and `*-of-type:` are not asked at
    // all. The model holds `not-first:` and `not-last:` for overrides; the
    // library writes each position one way.
    why: "a position other than first or last — write the default, and the exception under first: or last:",
    test: (token) =>
      /(^|:)(not-(first|last|only|odd|even)|odd|even|only|empty|not-empty|nth-[^:]+|(first|last|only)-of-type|not-(first|last|only)-of-type):/.test(
        token,
      ),
  },
  {
    // A class says which side it means. `ms-2`, `pe-4`, `start-0`,
    // `rounded-s-md`, `border-e` and `text-start` mean left or right depending
    // on the direction the page is read in, which the style model does not
    // hold: it stores a side, so they come back from the data as left or right
    // and lose the argument with an override written the logical way. A class
    // that should change sides in right-to-left text says so with `rtl:`.
    why: "a logical side (start or end) — write left or right, and the other side under rtl:",
    test: (token) =>
      /(^|:)!?-?((m[se]|p[se]|scroll-m[se]|scroll-p[se]|start|end)-|border-[se](-|$)|rounded-(s|e|ss|se|es|ee)(-|$)|text-(start|end)$|float-(start|end)$|clear-(start|end)$|(space|divide)-x-reverse$)/.test(
        token,
      ),
  },
  {
    why: "an unnamed group — `.group` is matched by any ancestor that has one",
    test: (token) =>
      /(^|:)group(-[a-z][\w-]*)?(?![\w-])/.test(token) && !token.includes("/"),
  },
  {
    // A class spliced together at runtime is one this test cannot read, so it
    // cannot be allowed: `[&${x}]:size-4` could say anything.
    why: "a class built by interpolation, which cannot be checked",
    test: (token) => token.includes("${") && /[:[]/.test(token),
  },
  {
    /**
     * `!important`, which is the third rule stated backwards.
     *
     * A `!` wins an argument between two selectors about one element's style.
     * Rule 3 means there is only ever one selector in the argument — every
     * class is on the element it describes — so a `!` is either doing nothing
     * or hiding something that should have been resolved where it was written.
     *
     * shadcn needs it: `pl-1.5!` on a pagination link exists to beat
     * `has-data-[icon=inline-start]:pl-2`, a `:has()` selector that outranks a
     * plain class and that `twMerge` cannot see as a conflict. FlowCn turned
     * that selector into a condition, so both paddings are ordinary classes in
     * one `cn` chain and the later one simply wins.
     */
    why: "!important, which only exists to win a fight rule 3 prevents",
    // Any `!` at all, including one buried in an arbitrary value
    // (`[color:red!important]`). Nothing in a self-targeting class list has a
    // use for one, so there is no form worth allowing.
    test: (token) => token.includes("!"),
  },
];

/** Every class-shaped token in `source` that reaches outside its element. */
export const offencesIn = (source: string): Offence[] =>
  tokensOf(stripComments(source)).flatMap((token) =>
    RULES.filter((rule) => rule.test(token)).map((rule) => ({
      token,
      why: rule.why,
    })),
  );
