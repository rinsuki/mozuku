import * as React from 'react'
const { useState, useRef } = React
import querystring from 'querystring'

import seaClient from '../../util/seaClient'
import { useShortcut } from '../../stores/app'

import axios from 'axios'
import Config from '../../config'
import PostForm from '../../presenters/Home/PostForm'

export default () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // 110 = n
  useShortcut(110, ev => {
    const el = textareaRef.current!
    if (el.isEqualNode(document.activeElement)) return
    ev.preventDefault()
    textareaRef.current!.focus()
  })

  const [draft, setDraft] = useState('')
  const [draftDisabled, setDraftDisabled] = useState(false)
  const [images, addImage] = useState([])
  const submitDraft = async () => {
    setDraftDisabled(true)
    if (draft.trim().length > 0) {
      try {
        await seaClient.post('/v1/posts', { text: draft })
        setDraft('')
      } catch (e) {
        // TODO: Add error reporting
        console.error(e)
      }
    }
    setDraftDisabled(false)
  }
  const submitGyazo = async (event: React.ClipboardEvent) => {
    if (!Config.gyazo_client_id) {
      return null
    }
    if (event.clipboardData.getData('Text').includes('https://gyazo.com')) {
      axios
        .get('https://gyazo.now.sh/info', {
          params: {
            url: event.clipboardData.getData('Text').trim()
          }
        })
        .then(resp => {
          setDraft(`${draft} ${resp.data.url}`)
        })
    }
    Array.from(event.clipboardData.files)
      .filter(file => file.type.split('/')[0] == 'image')
      .forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const binary = reader.result
          axios
            .post('https://gyazo.now.sh/upload', {
              client_id: Config.gyazo_client_id,
              referer_url: window.location.origin,
              image_url: binary
            })
            .then(resp => {
              window.open(resp.data, '_blank', 'width=720,height=405')
            })
        }
        reader.readAsDataURL(file)
      })
  }

  return (
    <PostForm
      ref={textareaRef}
      draft={draft}
      setDraft={setDraft}
      draftDisabled={draftDisabled}
      submitDraft={submitDraft}
      submitGyazo={submitGyazo}
      images={images}
    />
  )
}
