# Really minimal localization module based on the new context api

![AppVeyor](https://img.shields.io/appveyor/ci/giuseppesalvo/react-simple-localize.svg)

[React Context Api](https://reactjs.org/docs/context.html)

Zero dependencies, only 3kb ( not minified )

## How to Use

```jsx

// main.jsx

import { LocalizeProvider } from 'react-simple-localize'
import { YourApp } from './yourapp'

const messages = {
    en: {
        message: "hello"
    },
    it: {
        message: "ciao",
    }
}

render(
    <LocalizeProvider locale="en" messages={messages}>
        <YourApp />
    </LocalizeProvider>,
    document.body.getElementById('yourapp')
)
```

```jsx

// yourapp.jsx

import { Localize } from 'react-simple-localization'

export function App() {
    return <div>
        <Localize path="message" />
        <Localize path="another.nested.message" />
        <Localize path="nested.message[0].inside_an_array" />
    </div>
}

```