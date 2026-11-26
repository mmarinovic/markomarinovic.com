import type { NextConfig } from 'next'

const removedTextSlugs = [
  'evolving-into-product-engineers',
  'high-agency',
  'learn-to-ship',
  'empowering-ai-agents-with-rag',
  'hidden-cost-of-choosing-the-coolest-tech-stack',
  'mcp-servers',
  '10x-developers-myth',
  'dont-rely-on-motivation',
  'take-things-seriously',
  'about-token-launches',
  'the-meaning-of-choice-in-a-connected-world',
  'being-a-full-stack-developer',
  'blockchain-interoperability',
  'impact-of-ai-on-software-devs',
  'choosing-a-blockchain-for-your-project',
  'become-better-dev',
  'account-abstraction',
  'learn-the-fundamentals-now',
  'dont-outsource-your-thinking',
  'when-ai-writes-code',
  'balancing-ai-automation-human-escalation',
  'biggest-lie-in-software-development',
  'how-sports-make-better-tech-leaders',
  'understanding-ai-for-software-developers',
  'ai-agents-sending-crypto',
  'bitcoin-ordinals',
  'a-ledger-in-production',
  'what-reconciliation-actually-is',
  'building-a-reconciliation-system',
  'trading-tokens-on-a-bonding-curve',
]

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      ...removedTextSlugs.flatMap((slug) => [
        { source: `/essays/${slug}`, destination: '/texts', permanent: true },
        { source: `/texts/${slug}`, destination: '/texts', permanent: true },
      ]),
      { source: '/essays', destination: '/texts', permanent: true },
      { source: '/essays/:slug', destination: '/texts/:slug', permanent: true },
    ]
  },
}

export default nextConfig
