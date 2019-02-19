# <Page/>

Page component is a wrapper component which allows you to use the sticky header component.\
The PageHeader component is the header implementation that will be changed when scrolling down inside the page.

## Usage

When using the `Page` component it container (PageContainer) should have a determined height (e.g. `height: 500px`, `height: 100vh`) otherwise the scroll won't work.

> The above applies only when setting `upgrade` prop to `true`. (New Layout API)

## Gradient

You can generate Gradient CSS [here](https://www.cssmatic.com/gradient-generator).

## Children

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| Page.Header | Page.Header | null | true | The PageHeader object which defines the components within the Header |
| Page.Tail | Page.Tail | null | false | A placeholder for a component which sticks to the bottom of the header. Page.Tail.children receive `minimized` flag |
| Page.Content | Page.Content | null | true | A placeholder for the page scrollable body, support `fullScreen` property which spans the content on the available area |
| Page.FixedContent | Page.FixedContent | null | false | A placeholder for a component which sticks to the bottom of the Tail (or bottom of Header if there is no Tail). It gets the same layout as the Page.Content. If Page.content `fullScreen` is enabled, then this FixedContent will be also full screen. |
