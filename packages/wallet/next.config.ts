import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            ref: true,
            memo: true,
            svgProps: {
              className: 'w-full h-full',
            },
          },
        },
      ],
    })

    return config
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
              ref: true,
              memo: true,
              svgProps: {
                className: 'w-full h-full',
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

export default nextConfig

