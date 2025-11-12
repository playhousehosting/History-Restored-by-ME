import { createRouteHandler } from "uploadthing/next"
import { ourFileRouter } from "./core"

// Force dynamic to prevent caching issues
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_TOKEN,
  },
})
