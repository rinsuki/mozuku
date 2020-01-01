import * as React from 'react'
import { useObserver } from 'mobx-react-lite'

import Container from '../_authenticated_container'
import { appStore } from '../../uso/stores'
import AuthenticatedContainer from '../_authenticated_container'
import { LocalTimeline } from '../../uso/containers'

const { useEffect } = React

const LocalTimelinePage: React.FC = () => {
  useEffect(() => {
    appStore.init()
  }, [])
  return useObserver(() => {
    return (
      <AuthenticatedContainer me={appStore.me}>
        <LocalTimeline />
      </AuthenticatedContainer>
    )
  })
}
export default LocalTimelinePage
