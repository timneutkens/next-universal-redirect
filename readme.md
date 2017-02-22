# Next.js universal redirect

Higher order component to handle both client and server side redirecting with [Next.js](https://github.com/zeit/next.js)

Note: this package is made for Next.js 2.0+

Example: [with-universal-redirect.now.sh](https://with-universal-redirect.now.sh/)

## Installation

`npm install --save next-universal-redirect`

## Usage

Create a `_error.js` file in the `pages` directory of your project

`pages/_error.js`:

```js
import ErrorComponent from 'next/error'
import redirect from 'next-universal-redirect'

// This renders the default Next.js error/404 component
class Error extends React.Component {
  static getInitialProps ({ req, res, xhr, pathname }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  render () {
    return <ErrorComponent statusCode={this.props.statusCode} />
  }
}

// Create a map of redirects
const list = new Map()
list.set('/example', '/example2')

// Calling `rewrite(list)(<ComponentHere />)` will return a HOC that will match the provided list against incoming page requests and will redirect accordingly.
export default redirect(list)(Error)
```
