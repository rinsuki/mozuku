import * as React from 'react'
const { useState } = React

import seaClient from '../../util/seaClient'

import appStore from '../../stores/app'
import NameForm from '../../presenters/Settings/NameForm'

export default ({ name }: { name: string }) => {
  const [nameDraft, setNameDraft] = useState(name)
  const [nameDraftDisabled, setNameDraftDisabled] = useState(false)
  const [message, setMessage] = useState('')
  const submitNameDraft = async () => {
    setNameDraftDisabled(true)
    if (name.trim().length > 0) {
      try {
        await seaClient.patch('/v1/account', { name: nameDraft })
        setMessage(`Your new name: ${nameDraft}`)
        appStore.updateMyAccount()
      } catch (e) {
        // TODO: Add error reporting
        console.error(e)
      }
    }
    setNameDraftDisabled(false)
  }

  return (
    <NameForm
      nameDraftDisabled={nameDraftDisabled}
      setNameDraft={setNameDraft}
      submitNameDraft={submitNameDraft}
      nameDraft={nameDraft}
      message={message}
    />
  )
}
