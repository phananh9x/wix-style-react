# `BadgeSelectItemBuilder`

> An option builder for the `<DropdownLayout/>` component and its consumers.

```js
import { badgeSelectItemBuilder } from 'wix-style-react/BadgeSelectItemBuilder';
```

This builder is being used in `<BadgeSelect/>` under the hood.

### `badgeSelectItemBuilder({ id: string | number, text: string, skin: string }): DropdownLayoutOption`

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id`   | `string`, `number` | `true` | The id of the option, should be unique. |
| `text` | `string` | `true` | The text to render within the badge. |
| `skin` | `string` | `true` | The badge's skin. See the `<Badge/>` story for the full list of available skins. |

## Examples
