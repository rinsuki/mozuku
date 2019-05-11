import * as React from 'react'
import { Moment } from 'moment'

import Config from '../config'
import NameForm from '../containers/Settings/NameForm'

export default ({
  name,
  screenName,
  createdAt,
  onClickLogout
}: {
  name: string
  screenName: string
  createdAt: Moment
  onClickLogout: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <div className="settings">
      <div className="settingsItem__name">
        <span className="settingsItem__name__name">{name}</span>
        <span className="settingsItem__name__screenName">@{screenName}</span>
      </div>
      <div className="settingsItem__title">Account</div>
      Created at: {createdAt.toLocaleString()}
      <div className="settingsItem__subtitle">Name</div>
      <NameForm name={name} />
      <div className="settingsItem__subtitle">Session</div>
      <button className="settingsItem__logout" onClick={onClickLogout}>
        Logout
      </button>
      <div className="settingsItem__title">About</div>
      mozuku info
      <ul>
        <li>
          API:{' '}
          <a href={Config.api} target="_blank" rel="noreferrer">
            {Config.api}
          </a>
        </li>
        <li>
          OAuth:{' '}
          <a href={Config.oauth} target="_blank" rel="noreferrer">
            {Config.oauth}
          </a>
        </li>
        <li>
          Repository:{' '}
          {Config.repository_url ? (
            <a
              href={`https://${Config.repository_url}`}
              target="_blank"
              rel="noreferrer"
            >
              {Config.repository_url}
            </a>
          ) : (
            'unknown'
          )}
        </li>
        <li>Commit: {Config.commit || 'unknown'}</li>
        <li>Imgur: {Config.imgur_client_id ? 'ready!' : 'not configured'}</li>
      </ul>
    </div>
  )
}
