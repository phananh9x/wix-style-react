# Page

## Migration from 6.x to 7.x (or using upgrade prop)

### TL;DR

- Opt-In for new Page: `<Page upgrade/>`
- **Flex Parent**: No need for Page parent to be a flex container with flow 'column'
- **Content Stretch**: `<Page.Content/>` now allows it's children to stretch vertically.
- **Bottom-Padding**: If you had any bottom-padding hacks, remove them!
- **`<Page.FixedContent/>`**: Is now rendered as the new `<Page.Sticky/>` (See Exmples in docs).

### Page Container

Previously we reuired that the Page's parent container will have these styles:

```css
height: 100vh;
display: flex;
flex-flow: column;
min-height: 0;
```

Now it is enought that the parent has a determined height.

```js
<div style={{height: '100vh'}}>
  <Page/>
</div>
```

IMPORTANT: If you page is already in an App structure, your Page container may already have a determined height!

```raw
+--------------------------------------------------
|                    Header (48px)
+--------------------------------------------------
| Sidebar       |           <Page/>
| (100vh - 48px)|
|               |
|               |
+---------------+----------------------------------
```

#### Horizontal Scroll & min/max width

Horizontal scrolling and min/max width are already supported,
so you can remove any Page wrapper `<div>`'s you might have previously added in order to implement it.

### Content Stretch

This will stretch:

```js
<Page.Content>
  <Container stretchVertically>
    <Row stretchViewsVertically>
      <Col>
        <Card stretchVertically>
          <Card.Content>
             Hello World
          </Card.Content>
        </Card>
      </Col>
    </Row>
  </Container>
</Page.Content>
```
