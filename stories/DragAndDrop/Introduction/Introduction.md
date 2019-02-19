# Drag and Drop Introduction
## Drag and Drop in wix-style-react
`wix-style-react` aims to provide following solutions:
1. ADD the Drag and Drop functionality to existing components (Tags for example)
2. Reusable D&D components and common stylesheets.

### How does it work
Behind the scenes, `wix-style-react` uses [`react-dnd`](http://react-dnd.github.io/react-dnd/), a set of React higher-order components to help you build complex drag and drop interfaces. As `react-dnd` has a complex API, `wix-style-react` provides simple building blocks to solve common use case.

### Usage
The most useful building block you should be aware of is the `<SortableList/>` component. It has a very simple sorting capability and is up to the consumer to style it according to different requirements.

### Example
Here is a simple usage of the `<SortableList/>` component with basic styles (Give it a try)!

