import * as React from 'react'

export default ({
  nameDraftDisabled,
  setNameDraft,
  submitNameDraft,
  nameDraft,
  message
}: {
  nameDraftDisabled: boolean
  setNameDraft: (t: string) => void
  submitNameDraft: () => void
  nameDraft: string
  message: string
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitNameDraft()
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameDraft(event.target.value)
  }

  return (
    <>
      <form className="nameForm" onSubmit={onSubmit}>
        <input
          className="nameForm__textarea"
          disabled={nameDraftDisabled}
          onChange={onChange}
          placeholder="What's your name?"
          value={nameDraft}
        />
        <button
          className="nameForm__button"
          type="submit"
          disabled={nameDraftDisabled}
        >
          Update Name
        </button>
      </form>
      {message}
    </>
  )
}
