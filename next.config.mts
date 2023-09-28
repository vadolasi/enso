/** @type {import("next").NextConfig} */

import pwa from "next-pwa"

const withPWA = pwa({ dest: "public" })

export default withPWA({
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
})
