import Router from 'next/router'
import ErrorComponent from 'next/error'
import React from 'react'

export default (redirects) => (Component) => class extends React.Component {
  static async getInitialProps (ctx) {
    const { req, res, xhr, pathname } = ctx

    if(redirects.has(pathname)) {
      const rewrite = redirects.get(pathname)

      if(req) {
        res.writeHead(301, {
          Location: rewrite
        })
        res.end()
        return {}
      }

      Router.push(rewrite)
      return {}
    }

    let initialProps = {}
    if(Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx)
    }

    return initialProps
  }

  render () {
    return <Component {...this.props} />
  }
}
