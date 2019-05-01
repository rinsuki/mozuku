/*
 * mozuku - One Mozuku
 * Copyright (C) 2019 otofune <otofune@otofune.me>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as React from 'react'
import usePromise from 'react-use-promise'

import Config from '../config'
import Auth from '../auth'

export default () => {
  const { authorization } = Auth
  const [my, error, state] = usePromise(
    () => fetch(Config.api + '/accounts/my', {
      headers: {
        authorization
      }
    }).then(r => r.json()),
    []
  )

  if (state !== 'resolved') return (<>Being shown...</>)

  return (
    <>
      {my.name} @{my.screenName}
    </>
  )
}
