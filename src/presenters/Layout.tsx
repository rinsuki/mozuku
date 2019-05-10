import * as React from 'react'

import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'

import { Account } from '../models'

import Home from './Home'
import Me from '../containers/Me'
import Settings from '../containers/Settings'
import NotFound from './NotFound'

import logo from '../static/logo.png'

export default ({ me }: { me?: Account }) => {
  return (
    <div className="mozuku-layout">
      <div className="mozuku-header-wrapper">
        <div className="mozuku-header">
          <h1 className="mozuku-header__logo">
            <Link to={{ pathname: '/' }}>
              <img src={logo} width="64" height="64" alt="Mozuku" />
            </Link>
          </h1>
          <div>
            {me ? (
              <>
                {me.name} (@{me.screenName})
              </>
            ) : (
              <span>
                <i>[誰?]</i>
              </span>
            )}
          </div>
          <div>
            <Link to={{ pathname: '/settings' }}>
              <button>⚙</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mozuku-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/me" component={Me} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}
