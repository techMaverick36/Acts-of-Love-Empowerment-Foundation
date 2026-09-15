# Button

`Button` defaults to the red Donate Now button in the navigation.

```tsx
import Button from "./Button";

<Button to="/donate">Donate Now</Button>
<Button variant="transparent" to="/get-involved">Get involved</Button>
<Button variant="secondary" size="lg" type="submit" disabled={saving}>
  {saving ? "Saving…" : "Save"}
</Button>
<Button variant="ghost" aria-label="Close" onClick={onClose}>
  <FiX />
</Button>
```

- `variant`: `primary` (red), `secondary` (blue), `accent` (custom background), `outline`, `transparent` (white text), or `ghost` (text, icon, and selection controls).
- `size`: `sm`, `md` (navigation), `lg`, `xl`, or `custom` for existing responsive spacing.
- `effect`: `navigation` (default hover and shadow), `raised` (existing red CTA effect), `elevated` (existing accent CTA effect), or `custom` for styles supplied by the caller.
- `layout`: `inline` (default) or `custom` to retain an existing block, full-width, or responsive layout.
- `to` renders a router link; `href` renders an anchor. Without either, it renders a native button with `type="button"`. Form submit buttons must specify `type="submit"`.
- Native props, event handlers, refs, ARIA attributes, and router navigation options pass through to the rendered element.

Use `className` and `style` for contextual details. Avoid conflicting utility classes: choose `size="custom"`, `layout="custom"`, or `effect="custom"` when replacing those defaults. Ghost controls default to custom size, layout, and effects so their existing appearance stays intact.
