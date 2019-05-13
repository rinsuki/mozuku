import * as React from 'react'
const { useState, useEffect } = React
import Axios from 'axios'

import { OGP } from '../models/post'

export default ({ link }: { link: string }) => {
  const [ogp, setOGP] = useState(null as OGP | null)
  useEffect(() => {
    Axios.get('https://analizzatore.prezzemolo.org', {
      params: {
        url: link
      }
    })
      .then(resp => {
        setOGP(new OGP(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      {ogp ? (
        <div className="post__ogp">
          {ogp.image && <img className="post__ogp__img" src={ogp.image} />}
          <a href={link} target="_blank" rel="noreferrer">
            <div className="post__ogp__info">
              <div className="post__ogp__info__title">{ogp.title}</div>
              <div className="post__ogp__info__link">{link}</div>
              {ogp.description && (
                <div className="post__ogp__info__description">
                  {ogp.description}
                </div>
              )}
              {ogp.site_name && (
                <div className="post__ogp__info__author">{ogp.site_name}</div>
              )}
            </div>
          </a>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
