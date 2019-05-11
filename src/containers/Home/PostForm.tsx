import * as React from 'react'
const { useState, useRef } = React
import querystring from 'querystring'

import seaClient from '../../util/seaClient'
import { useShortcut } from '../../stores/app'

import axios from 'axios'
import Config from '../../config'
import PostForm from '../../presenters/Home/PostForm'
import { setServers } from 'dns'

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
  const [images, setImages] = useState([])
  const joinImages = () => {
    return `${draft} ${images.join(' ')}`
  }
  const submitDraft = async () => {
    setDraftDisabled(true)
    if (draft.trim().length > 0 || images.length >= 1) {
      try {
        await seaClient.post('/v1/posts', { text: joinImages() })
        setDraft('')
      } catch (e) {
        // TODO: Add error reporting
        console.error(e)
      }
    }
    setDraftDisabled(false)
  }
  const fileUploader = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result != null) {
        axios
          .post(
            '/imgur/upload',
            querystring.stringify({
              image: reader.result.toString().split(',')[1],
              type: 'base64'
            }),
            {
              headers: {
                Authorization: `Client-ID ${Config.imgur_client_id}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
          .then(resp => {
            setImages([...images, resp.data.data.link])
            localStorage.setItem(
              `imgur_${resp.data.data.id}`,
              JSON.stringify(resp.data.data)
            )
          })
      }
    }
    reader.readAsDataURL(file)
  }
  const submitAlbum = async (event: React.ClipboardEvent) => {
    if (!Config.imgur_client_id) {
      return null
    }
    if (event.clipboardData.getData('Text').includes('https://gyazo.com')) {
      event.preventDefault()
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
        fileUploader(file)
      })
  }
  const submitAlbumFromFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files != null) {
      Array.from(event.target.files).forEach(file => fileUploader(file))
    }
  }

  return (
    <PostForm
      ref={textareaRef}
      draft={draft}
      setDraft={setDraft}
      draftDisabled={draftDisabled}
      submitDraft={submitDraft}
      submitAlbum={submitAlbum}
      submitAlbumFromFile={submitAlbumFromFile}
      images={images}
    />
  )
}
