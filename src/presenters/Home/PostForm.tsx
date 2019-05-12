import * as React from 'react'
const { forwardRef } = React

type T = {
  draftDisabled: boolean
  submitDraft: () => void
  setDraft: (t: string) => void
  draft: string
  submitAlbum: (e: React.ClipboardEvent) => void
  submitAlbumFromFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  images: string[]
  isUploding: boolean
}
export default forwardRef<HTMLTextAreaElement, T>(
  (
    {
      draftDisabled,
      submitDraft,
      setDraft,
      draft,
      submitAlbum,
      submitAlbumFromFile,
      images,
      isUploding
    },
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
      submitAlbum(event)
    }
    const onFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      submitAlbumFromFile(e)
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
        <div className="postForm__images-area">
          <form>
            <label
              className="postForm__images-area__form__label"
              htmlFor="fileupload"
            >
              {isUploding ? (
                <span className="postForm__images-area__form__label_loading">
                  🤔
                </span>
              ) : (
                '+'
              )}
              <input
                type="file"
                id="fileupload"
                className="postForm__images-area__form__input"
                onChange={onFileSubmit}
              />
            </label>
          </form>

          <div className="postForm__images-area__collection">
            {images.map(image => (
              <img key={image} src={image} />
            ))}
          </div>
        </div>
      </>
    )
  }
)
