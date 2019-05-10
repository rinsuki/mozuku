if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.OAUTH_URL ||
  !process.env.API_URL
)
  throw new Error('Application can not be booted.')

const repository_url = () => {
  if (process.env.REPOSITORY_URL) {
    return process.env.REPOSITORY_URL.split('@')[1]
  } else {
    return 'unknown'
  }
}

export default {
  app: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  oauth: process.env.OAUTH_URL,
  api: process.env.API_URL,
  repository_url: repository_url,
  branch: process.env.BRANCH || 'unknown',
  commit: process.env.COMMIT_REF || 'unknown'
}
