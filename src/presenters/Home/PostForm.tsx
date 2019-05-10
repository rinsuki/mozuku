import * as React from 'react'
const { forwardRef } = React

type T = {
  draftDisabled: boolean
  submitDraft: () => void
  setDraft: (t: string) => void
  draft: string
  submitGyazo: (e: React.ClipboardEvent) => void
  images: string[]
}
export default forwardRef<HTMLTextAreaElement, T>(
  (
    { draftDisabled, submitDraft, setDraft, draft, submitGyazo, images },
    ref
  ) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      submitDraft()
    }
    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((event.ctrlKey || event.metaKey) && event.keyCode == 13) {
        submitDraft()
      }
    }
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDraft(event.target.value)
    }
    const onPaste = (event: React.ClipboardEvent) => {
      submitGyazo(event)
    }

    return (
      <>
        <form className="postForm" onSubmit={onSubmit}>
          <textarea
            className="postForm__textarea"
            disabled={draftDisabled}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onPaste={onPaste}
            ref={ref}
            placeholder="What's up Otaku?"
            value={draft}
          />
          <button
            className="postForm__button"
            type="submit"
            disabled={draftDisabled}
          >
            Send to Sea
          </button>
        </form>
      </>
    )
  }
)
