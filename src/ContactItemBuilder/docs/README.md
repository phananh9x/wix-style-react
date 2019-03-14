# `ContactItemBuilder`

> An option builder for the `<DropdownLayout/>` component and its consumers.

```js
import { ContactItemBuilder } from contactItemBuilder;
```

### `contactItemBuilder({ id: string | number, title: string, subtitle: string, imageUrl: string }): DropdownLayoutOption`

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `id` | `string` | `true` | the option id. |
| `title` | `string` | `true` | the option title. |
| `subtitle`| `string` | `false` | the option subtitle |
| `imageUrl` | `string` | `false` | an image url, when given, avatar will display it. if not given, the avatar will display title initials |

## Examples
