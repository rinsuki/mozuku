import * as React from 'react'
const { useState, useRef } = React
import querystring from 'querystring'
const Ahdin = require('ahdin')

import seaClient from '../../util/seaClient'
import { useShortcut } from '../../stores/app'

import axios from 'axios'
import Config from '../../config'
import PostForm from '../../presenters/Home/PostForm'
import { setServers } from 'dns'
import { AlbumFile } from '../../models/post'

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
  const [images, setImages] = useState([] as AlbumFile[])
  const [isUploading, setIsUploading] = useState(false)
  const submitDraft = async () => {
    setDraftDisabled(true)
    if (draft.trim().length > 0 || images.length >= 1) {
      try {
        await seaClient.post('/v1/posts', {
          text: draft,
          fileIds: images.map(image => image.id)
        })
        setDraft('')
        setImages([])
      } catch (e) {
        // TODO: Add error reporting
        console.error(e)
      }
    }
    setDraftDisabled(false)
  }
  const fileUploader = (file: File) => {
    setIsUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result != null) {
        const blob = new Blob([new Uint8Array(reader.result)])
        Ahdin.compress(blob).then(comp => {
          const compressed = new File([comp], file.name)
          const form = new FormData()
          form.append('file', compressed)
          form.append('name', compressed.name)
          form.append('ifNameConflicted', 'add-date-string')
          seaClient
            .post('/v1/album/files', form)
            .then(file => {
              setImages(images => [...images, file])
              setIsUploading(false)
            })
            .catch(err => {
              console.error(err)
              setIsUploading(false)
            })
        })
      }
    }
    reader.readAsArrayBuffer(file)
  }
  const submitAlbum = async (event: React.ClipboardEvent) => {
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
      isUploding={isUploading}
    />
  )
}
