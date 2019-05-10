import * as React from 'react'
const { useEffect } = React
import { useObserver } from 'mobx-react-lite'

import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'

import appStore from '../stores/app'
import Layout from '../presenters/Layout'

import logo from '../static/logo.png'

export default () => {
  useEffect(() => {
    appStore.init()
  }, [])
  return useObserver(() => {
    if (!appStore.initialized)
      return (
        <div className="mozuku-layout">
          <div className="mozuku-header-wrapper">
            <div className="mozuku-header">
              <h1 className="mozuku-header__logo">
                <Link to={{ pathname: '/' }}>
                  <img src={logo} width="64" height="64" alt="Mozuku" />
                </Link>
              </h1>
            </div>
          </div>
        </div>
      )
    return (
      <>
        <Layout me={appStore.me} />
      </>
    )
  })
}
