if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.OAUTH_URL ||
  !process.env.API_URL
)
  throw new Error('Application can not be booted.')

export default {
  app: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  oauth: process.env.OAUTH_URL,
  api: process.env.API_URL,
  imgur_client_id: process.env.REPOSITORY_URL
    ? process.env.IMGUR_CLIENT_ID
    : null,
  repository_url: process.env.REPOSITORY_URL
    ? process.env.REPOSITORY_URL.split('@')[1]
    : null,
  commit: process.env.COMMIT_REF
    ? `${process.env.BRANCH}@${process.env.COMMIT_REF}`
    : null
}
