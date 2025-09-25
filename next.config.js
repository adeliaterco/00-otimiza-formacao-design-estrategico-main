/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔧 BUILD CONFIGURATION - QUALIDADE PREMIUM
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src', 'app'],
    ignoreDuringBuilds: false, // ✅ MUDANÇA: Manter qualidade de código
  },
  typescript: {
    ignoreBuildErrors: false,   // ✅ MUDANÇA: Evitar bugs em produção
  },
  
  // 🚀 EXPERIMENTAL FEATURES PARA PERFORMANCE
  experimental: {
    // Otimizações de CSS
    optimizeCss: true,
    
    // Otimização de imports de pacotes
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      'framer-motion'
    ],
    
    // Turbopack para desenvolvimento mais rápido
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    
    // Server Components otimizados
    serverComponentsExternalPackages: ['sharp'],
    
    // Otimização de bundle
    bundlePagesRouterDependencies: true,
    
    // Cache otimizado
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
    
    // Preload de módulos críticos
    optimisticClientCache: true,
  },
  
  // 🖼️ IMAGENS PREMIUM PARA BELEZA
  images: {
    // ✅ DOMÍNIOS EXPANDIDOS
    domains: [
      'amandateixeiraoficial.com.br',
      'cdn.amandateixeira.com.br',     // CDN dedicado
      'images.unsplash.com',           // Stock photos de qualidade
      'res.cloudinary.com',            // Cloud storage otimizado
      'firebasestorage.googleapis.com', // Firebase storage
      'cdn.pixabay.com',               // Imagens gratuitas
      'images.pexels.com',             // Stock photos premium
      'storage.googleapis.com',        // Google Cloud Storage
      'amazonaws.com',                 // AWS S3
      's3.amazonaws.com',              // AWS S3 alternativo
    ],
    
    // ✅ FORMATOS MODERNOS PRIORIZADOS
    formats: ['image/avif', 'image/webp'], // AVIF primeiro (melhor compressão)
    
    // ✅ BREAKPOINTS OTIMIZADOS PARA BELEZA
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 1080],
    
    // ✅ CACHE AGRESSIVO
    minimumCacheTTL: 31536000, // 1 ano
    
    // ✅ SEGURANÇA MANTIDA
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // ✅ QUALIDADE OTIMIZADA PARA FOTOS DE BELEZA
    loader: 'default',
    quality: 85, // Qualidade ideal para fotos de beleza (balanço qualidade/tamanho)
    
    // ✅ CONFIGURAÇÕES AVANÇADAS
    unoptimized: false, // Manter otimizações ativas
    priority: false,    // Será definido por componente
    placeholder: 'blur', // Placeholder padrão
    
    // ✅ LOADING ESTRATÉGICO
    loading: 'lazy',    // Lazy loading por padrão
    
    // ✅ CONFIGURAÇÕES DE REDIMENSIONAMENTO
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amandateixeiraoficial.com.br',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.amandateixeira.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  
  // 🔥 COMPRESSÃO AVANÇADA
  compress: true,
  poweredByHeader: false, // Remove header "X-Powered-By"
  
  // 🎯 HEADERS DE PERFORMANCE E SEGURANÇA
  async headers() {
    return [
      // Headers globais de segurança
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // CSP para segurança máxima
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.utmify.com.br https://scripts.converteai.net https://www.googletagmanager.com https://static.hotjar.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https: blob:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https:",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://pay.cakto.com.br",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
        ],
      },
      
      // Headers para API routes
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://amandateixeiraoficial.com.br',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      
      // 🎨 CACHE AGRESSIVO PARA ASSETS ESTÁTICOS
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      
      // Cache para fontes
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // Cache para CSS e JS
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      
      // Headers específicos para vídeos
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ]
  },
  
  // 🚀 REDIRECTS PARA SEO E UX
  async redirects() {
    return [
      // Redirects para URLs amigáveis
      {
        source: '/curso',
        destination: '/curso-sobrancelhas-premium',
        permanent: true,
      },
      {
        source: '/inscricao',
        destination: '/matricula-curso-sobrancelhas',
        permanent: true,
      },
      {
        source: '/comprar',
        destination: '/curso-sobrancelhas-premium',
        permanent: true,
      },
      {
        source: '/amanda',
        destination: '/sobre-amanda-teixeira',
        permanent: true,
      },
      {
        source: '/depoimentos',
        destination: '/resultados-alunas',
        permanent: true,
      },
      
      // Redirects de URLs antigas (se houver)
      {
        source: '/old-course',
        destination: '/curso-sobrancelhas-premium',
        permanent: true,
      },
      
      // Redirect de www para não-www (ou vice-versa)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.amandateixeiraoficial.com.br',
          },
        ],
        destination: 'https://amandateixeiraoficial.com.br/:path*',
        permanent: true,
      },
    ]
  },
  
  // 🔄 REWRITES PARA FUNCIONALIDADES AVANÇADAS
  async rewrites() {
    return [
      // Proxy para analytics (evitar ad blockers)
      {
        source: '/analytics/:path*',
        destination: 'https://www.google-analytics.com/:path*',
      },
      
      // Proxy para tracking
      {
        source: '/track/:path*',
        destination: 'https://cdn.utmify.com.br/:path*',
      },
      
      // Sitemap dinâmico
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      
      // Robots.txt dinâmico
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ]
  },
  
  // 🔧 WEBPACK OPTIMIZATIONS AVANÇADAS
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // ✅ Otimizações para produção
    if (!dev && !isServer) {
      // Split chunks otimizado
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunks separados
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          
          // Chunk comum
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            enforce: true,
          },
          
          // Chunk para React
          react: {
            test: /[\/]node_modules[\/](react|react-dom)[\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          
          // Chunk para UI components
          ui: {
            test: /[\/]node_modules[\/](@radix-ui|lucide-react)[\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 15,
          },
        },
      }
      
      // Minimização otimizada
      config.optimization.minimize = true;
      
      // Tree shaking agressivo
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // 🎯 SVG como componentes React
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'removeDimensions',
                  active: true,
                },
              ],
            },
          },
        },
      ],
    })
    
    // 📊 Bundle analyzer em desenvolvimento
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      )
    }
    
    // 🔧 Otimizações de módulos
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
      '@/components': require('path').resolve(__dirname, 'components'),
      '@/lib': require('path').resolve(__dirname, 'lib'),
      '@/styles': require('path').resolve(__dirname, 'styles'),
    }
    
    // 🚀 Plugins adicionais
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev),
        __BUILD_ID__: JSON.stringify(buildId),
        __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
      })
    )
    
    // 📱 Otimizações para mobile
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    return config
  },
  
  // 📊 CONFIGURAÇÕES DE SAÍDA
  output: 'standalone', // Para deploy otimizado
  
  // 🔧 CONFIGURAÇÕES DE COMPILAÇÃO
  compiler: {
    // Remove console.log em produção
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Minificação de styled-jsx
    styledComponents: true,
  },
  
  // 🌐 CONFIGURAÇÕES DE DOMÍNIO
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.amandateixeira.com.br' : '',
  
  // 📱 PWA CONFIGURATION (se usando next-pwa)
  ...(process.env.NODE_ENV === 'production' && {
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching: [
        // Cache para Google Fonts
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
            },
          },
        },
        
        // Cache para imagens
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
            },
          },
        },
        
        // Cache para API calls
        {
          urlPattern: /^https:\/\/api\.amandateixeira\.com\.br\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 1 dia
            },
          },
        },
        
        // Cache para scripts externos
        {
          urlPattern: /^https:\/\/(cdn\.utmify\.com\.br|scripts\.converteai\.net)\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'external-scripts-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dias
            },
          },
        },
      ],
      
      // Manifest para PWA
      manifest: {
        name: 'Curso de Sobrancelhas Premium - Amanda Teixeira',
        short_name: 'Sobrancelhas Premium',
        description: 'Aprenda a técnica exclusiva que está fazendo mulheres ganharem R$ 2.500+/mês',
        theme_color: '#C77D59',
        background_color: '#0F172A',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
  }),
  
  // 🔍 LOGGING E DEBUG
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  
  // ⚡ CONFIGURAÇÕES DE DESENVOLVIMENTO
  ...(process.env.NODE_ENV === 'development' && {
    // Fast refresh
    reactStrictMode: true,
    
    // Source maps
    productionBrowserSourceMaps: false,
    
    // Hot reload otimizado
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
  
  // 📈 CONFIGURAÇÕES DE PRODUÇÃO
  ...(process.env.NODE_ENV === 'production' && {
    // Otimizações de produção
    swcMinify: true,
    productionBrowserSourceMaps: false,
    
    // Geração de build ID customizado
    generateBuildId: async () => {
      return `beauty-premium-${Date.now()}`
    },
  }),
}

// 📦 PLUGINS CONDICIONAIS
const withPlugins = (config) => {
  // Bundle analyzer
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    })
    config = withBundleAnalyzer(config)
  }
  
  // PWA (se instalado)
  if (process.env.NODE_ENV === 'production') {
    try {
      const withPWA = require('next-pwa')({
        dest: 'public',
        register: true,
        skipWaiting: true,
      })
      config = withPWA(config)
    } catch (e) {
      console.log('PWA plugin não encontrado, continuando sem PWA...')
    }
  }
  
  return config
}

module.exports = withPlugins(nextConfig)