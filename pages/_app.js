import '../styles/globals.css'
import React from 'react'
import App from 'next/app'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'next/router'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(fas, fab)

class MainApp extends App {
  static async getInitialProps({Component, ctx}) {
    const isServer = !process.browser
    const componentInitProps = Component.getInitialProps ? await Component.getInitialProps({...ctx, isServer}) : {}
    return {
      pageProps: componentInitProps
    }
  }

  render() {
    const {Component, router, pageProps} = this.props
    return <Component router={router} {...pageProps} />
  }
}

export default withRouter(MainApp)
