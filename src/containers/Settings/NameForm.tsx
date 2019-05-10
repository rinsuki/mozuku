import * as React from 'react'
const { useState, useRef } = React

import seaClient from '../../util/seaClient'

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
        // TODO: Update Name (No Rel)
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
