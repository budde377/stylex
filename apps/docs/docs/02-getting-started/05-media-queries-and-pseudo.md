---
sidebar_position: 5
---

# Media Queries And Pseudo Classes

StyleX uses a slightly different pattern than most other CSS solutions when it
comes to Media Queries and Pseudo Selectors. Instead of writing your "base
styles", your "mobile styles" and your "hover styles", you write just one object
of styles. Within this object, your values can declaratively change based on
browser conditions.

At first, this may take a little getting used to. This approach forces you to
think holistically about your styles rather than thinking about different states
in isolation.

This approach also makes your styles more predictable when you're composing
styles.

Within Inline Styles, there are no Media Queries or Pseudo Classes. Instead
you're forced to use Javascript to conditionally change the Inline Styles you're
applying. StyleX just lets you define those "conditions" declaratively within
your style values themselves.

## Pseudo Classes

Pseudo Classes can be nested within style definitions, similar to how they work
tools such Sass and other CSS-in-JS libraries.

```tsx
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    color: {
      default: 'var(--blue-link)',
      ':hover': 'scale(1.1)',
      ':active': 'scale(0.9)',
    },
  },
});
```

And you can use the styles as usual:

```tsx
<button className={stylex(styles.button)} />
// OR
<button {...stylex.spread(styles.button)} />
```

## Media Queries

Media Queries can, similarly, be nested within style definitions.

```tsx
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    width: {
      default: 800,
      '@media (max-width: 800)': '100%',
    },
  },
});
```

Using styles remains the same

```tsx
<div className={stylex(styles.base)} />
// OR
<div {...stylex.spread(styles.base)} />
```

## Combining Conditions

Your Style Values can be be nested more than one level deep when you need to
combine Media Queries and Pseudo Selectors

```tsx
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    color: {
      default: 'var(--blue-link)',
      ':hover': {
        default: null,
        '@media (hover: hover)': 'scale(1.1)',
      },
      ':active': 'scale(0.9)',
    },
  },
});
```

:::info

The `default` case is required when authoring conditional styles. If you don't
want any style to be applied in the default case, you can use `null` as the
value.

:::

## Pseudo Elements

:::note

If possible, we do not recommend using Pseudo Elements and suggest using actual
HTML elements instead. `::before` and `::after`, in particular can usually be
replaced with simple `div` or `span` child elements.

:::

Other than Pseudo Classes (which start with a single `:`) and At Rules (which
start with `@`) CSS also contains "Pseudo Elements". Pseudo Elements are
different from Pseudo Classes as they start with `::`. Some common examples of
Pseudo Elements are:

- `::before`
- `::after`
- `::placeholder`

Pseudo Elements are very different from Pseudo Elements (despite the similar
name) because they do not represent some kind of state. Instead, they are CSS's
way to target a completely different DOM element, that doesn't actually exist in
the HTML itself.

Therefore, in the cases where you need to target Pseudo Elements, you define
those styles in a top-level condition separate from the styles for the HTML
element itself.

```tsx
const styles = stylex.create({
  input: {
    color: {
      default: '#333',
      ':invalid': 'red',
    },
    '::placeholder': {
      color: '#999',
    },
  },
});
```