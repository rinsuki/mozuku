import * as React from 'react'
import { Moment } from 'moment'

import NameForm from '../containers/Settings/NameForm'

export default ({
  name,
  screenName,
  createdAt
}: {
  name: string
  screenName: string
  createdAt: Moment
}) => {
  return (
    <div className="settings">
      <div className="settingsItem__name">
        <span className="settingsItem__name__name">{name}</span>
        <span className="settingsItem__name__screenName">@{screenName}</span>
      </div>
      You are "{name}" (@{screenName}). This account was created at{' '}
      {createdAt.toLocaleString()}.
      <div className="settingsItem__title">Name</div>
      <NameForm name={name} />
    </div>
  )
}
