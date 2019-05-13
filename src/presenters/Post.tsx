import * as React from 'react'
import moment from 'moment-timezone'
const { useState } = React

import OGP from './OGP'

import {
  Post,
  BODYPART_TYPE_LINK,
  BODYPART_TYPE_LINK_IMAGE,
  BODYPART_TYPE_BOLD
} from '../models'

export default ({ post }: { post: Post }) => {
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)
  const [zoom, setZoom] = useState(1)
  const setXY = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = e.currentTarget.parentElement!.parentElement!.getBoundingClientRect()
    setZoom(2)
    setMoveX(
      120 -
        ((e.clientX - rect.left + e.currentTarget.width / 2) /
          e.currentTarget.width) *
          120
    )
    setMoveY(
      120 -
        ((e.clientY - rect.top + e.currentTarget.height / 2) /
          e.currentTarget.height) *
          120
    )
  }
  return (
    <div className="post">
      <div className="post__head post-head">
        <div className="post-head__name">
          <span className="post-head__name__name">
            {[].filter
              .call(
                post.author.name.trim(),
                (c: string) => c.charCodeAt(0) !== 8203
              )
              .join('')
              .replace(/[\u200B-\u200D\uFEFF]/g, '')
              .replace(/[\uD800-\uDFFF]{2}/g, '').length
              ? post.author.name
              : `@${post.author.screenName}`}
          </span>
          <span className="post-head__name__screenName">
            @{post.author.screenName}
          </span>
        </div>
        <div className="post-head__time">
          {moment(post.createdAt)
            .tz('Asia/Tokyo')
            .format('HH:mm:ss・MM/DD')}
        </div>
      </div>
      <div className="post__body">
        {post.body.parts.map((p, i) => {
          switch (p.type) {
            case BODYPART_TYPE_LINK:
            case BODYPART_TYPE_LINK_IMAGE:
              return (
                <a key={i} href={p.payload} target="_blank" rel="noreferrer">
                  {decodeURI(p.payload)}
                </a>
              )
            case BODYPART_TYPE_BOLD:
              return (
                <span key={i} className="post__body__bold">
                  {p.payload}
                </span>
              )
            default:
              return <React.Fragment key={i}>{p.payload}</React.Fragment>
          }
        })}
      </div>
      {post.body.parts
        .filter(p => p.type == BODYPART_TYPE_LINK)
        .map((p, i) => (
          <React.Fragment key={i}>
            <OGP link={p.payload} />
          </React.Fragment>
        ))}
      <div className="post__image">
        {post.body.parts.map((p, i) => (
          <React.Fragment key={i}>
            {p.type === BODYPART_TYPE_LINK_IMAGE && (
              <a href={p.payload} target="_blank" rel="noreferrer">
                <div className="post-image__img">
                  <img src={p.payload} />
                </div>
              </a>
            )}
          </React.Fragment>
        ))}
        {post.files.map(file => (
          <React.Fragment key={file.id}>
            <span className="post-image__img">
              <picture>
                {file.variants.filter(v => v.type === "image").sort((a, b) => a.score - b.score).map(variant => (
                  <source
                    key={variant.id}
                    srcSet={variant.url}
                    type={variant.mime}
                  />
                ))}
                <img
                  style={{
                    transform: `translate(${zoom !== 1 ? Math.min(Math.max(moveX, -50), 50) : '0'}%, ${
                      zoom !== 1? Math.min(Math.max(moveY, -50), 50) : '0'
                    }%) scale(${zoom})`
                  }}
                  title={file.name}
                  onClick={e => {
                    setZoom(1)
                    window.open(e.currentTarget.currentSrc, '_blank')
                  }}
                  onMouseLeave={() => setZoom(1)}
                  onMouseMove={e => setXY(e)}
                />
              </picture>
            </span>
          </React.Fragment>
        ))}
      </div>
      <div className="post__meta">
        via {post.application.name} ({post.application.id})
      </div>
    </div>
  )
}
