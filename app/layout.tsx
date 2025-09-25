import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"

// ✨ TIPOGRAFIA PREMIUM PARA BELEZA 2025
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
})

// 🎯 METADATA OTIMIZADA PARA CONVERSÃO E SEO
export const metadata: Metadata = {
  title: "💎 Curso de Sobrancelhas Premium | Ganhe R$ 2.500+/mês em 2025",
  description: "Aprenda a técnica exclusiva de design de sobrancelhas que está fazendo mulheres ganharem até R$ 8.000/mês. Mais de 1.500 alunas já transformaram suas vidas. Método comprovado, certificação profissional e suporte vitalício. Comece hoje mesmo!",
  
  // 🔍 SEO AVANÇADO
  keywords: [
    "curso sobrancelhas",
    "design de sobrancelhas", 
    "micropigmentação",
    "curso beleza online",
    "profissão sobrancelhas",
    "renda extra beleza",
    "Amanda Teixeira",
    "curso estética",
    "certificação sobrancelhas",
    "técnica sobrancelhas premium"
  ].join(", "),
  
  authors: [{ name: "Amanda Teixeira", url: "https://amandateixeiraoficial.com.br" }],
  creator: "Amanda Teixeira Beauty Academy",
  publisher: "Amanda Teixeira Oficial",
  
  // 🎯 OTIMIZAÇÃO PARA REDES SOCIAIS
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://amandateixeiraoficial.com.br",
    siteName: "Amanda Teixeira - Curso de Sobrancelhas Premium",
    title: "💎 Transforme sua Vida com Sobrancelhas | Ganhe R$ 2.500+/mês",
    description: "A técnica secreta que está fazendo mulheres ganharem até R$ 8.000/mês trabalhando com sobrancelhas. Mais de 1.500 alunas formadas. Método exclusivo + Certificação + Suporte vitalício. Últimas vagas com 87% OFF!",
    images: [
      {
        url: "https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/og-image-curso-sobrancelhas.jpg",
        width: 1200,
        height: 630,
        alt: "Curso de Sobrancelhas Premium - Amanda Teixeira",
        type: "image/jpeg",
      },
      {
        url: "https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp",
        width: 400,
        height: 600,
        alt: "Amanda Teixeira - Especialista em Design de Sobrancelhas",
        type: "image/webp",
      }
    ],
  },
  
  // 📱 TWITTER/X CARDS OTIMIZADOS
  twitter: {
    card: "summary_large_image",
    site: "@amandateixeiraoficial",
    creator: "@amandateixeiraoficial",
    title: "💎 Curso de Sobrancelhas Premium | R$ 2.500+/mês",
    description: "Técnica exclusiva que já transformou 1.500+ vidas. Certificação profissional + Suporte vitalício + Garantia 7 dias. Últimas vagas com 87% OFF!",
    images: ["https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/twitter-card-sobrancelhas.jpg"],
  },
  
  // 🚀 OTIMIZAÇÕES TÉCNICAS
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // 📊 ANALYTICS E VERIFICAÇÃO
  verification: {
    google: "seu-codigo-google-search-console",
    yandex: "seu-codigo-yandex",
    yahoo: "seu-codigo-yahoo",
  },
  
  // 🎨 TEMA E APARÊNCIA
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C77D59" }, // Terracotta
    { media: "(prefers-color-scheme: dark)", color: "#B8A082" },  // Ouro rosé
  ],
  
  // 📱 PWA E MOBILE
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  
  // 🔗 LINKS ALTERNATIVOS
  alternates: {
    canonical: "https://amandateixeiraoficial.com.br",
    languages: {
      "pt-BR": "https://amandateixeiraoficial.com.br",
      "x-default": "https://amandateixeiraoficial.com.br",
    },
  },
  
  // 📋 METADADOS ADICIONAIS
  category: "Educação e Beleza",
  classification: "Curso Online de Beleza",
  referrer: "origin-when-cross-origin",
  generator: "Next.js 14 Premium Beauty",
  applicationName: "Curso Sobrancelhas Premium",
  
  // 🎯 DADOS ESTRUTURADOS BÁSICOS
  other: {
    "price": "37.00",
    "priceCurrency": "BRL",
    "availability": "InStock",
    "category": "Beauty Course",
    "brand": "Amanda Teixeira",
    "instructor": "Amanda Teixeira",
    "courseMode": "Online",
    "educationalLevel": "Beginner to Professional",
    "timeRequired": "PT14H", // 14 horas
    "inLanguage": "pt-BR",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="pt-BR" 
      className={`
        ${inter.variable} 
        ${playfair.variable} 
        ${poppins.variable} 
        antialiased 
        scroll-smooth
      `}
      suppressHydrationWarning
    >
      <head>
        {/* 🚀 PRECONNECT PARA PERFORMANCE MÁXIMA */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <link rel="preconnect" href="https://amandateixeiraoficial.com.br" />
        <link rel="preconnect" href="https://pay.cakto.com.br" />
        
        {/* 🖼️ PRELOAD DE IMAGENS CRÍTICAS */}
        <link
          rel="preload"
          as="image"
          href="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/744AC0AD-B13A-43F3-8ABB-B170FC0955FF-scaled.webp"
          type="image/webp"
        />
        
        {/* 📱 OTIMIZAÇÕES MOBILE E PWA */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sobrancelhas Premium" />
        <meta name="application-name" content="Curso Sobrancelhas" />
        <meta name="msapplication-TileColor" content="#C77D59" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* 🎨 ÍCONES E FAVICONS */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* 🔍 DADOS ESTRUTURADOS PARA SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Curso de Design de Sobrancelhas Premium",
              "description": "Aprenda a técnica exclusiva de design de sobrancelhas que está fazendo mulheres ganharem até R$ 8.000/mês",
              "provider": {
                "@type": "Organization",
                "name": "Amanda Teixeira Beauty Academy",
                "url": "https://amandateixeiraoficial.com.br"
              },
              "instructor": {
                "@type": "Person",
                "name": "Amanda Teixeira",
                "jobTitle": "Especialista em Design de Sobrancelhas",
                "image": "https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
              },
              "offers": {
                "@type": "Offer",
                "price": "37.00",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "validFrom": new Date().toISOString(),
                "priceValidUntil": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
              },
              "courseMode": "online",
              "educationalLevel": "Beginner",
              "timeRequired": "PT14H",
              "inLanguage": "pt-BR",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1500",
                "bestRating": "5"
              }
            })
          }}
        />
        
        {/* 👩‍💼 DADOS DA INSTRUTORA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amanda Teixeira",
              "jobTitle": "CEO e Especialista em Design de Sobrancelhas",
              "worksFor": {
                "@type": "Organization",
                "name": "Studio Amanda Teixeira Beauty"
              },
              "url": "https://amandateixeiraoficial.com.br",
              "image": "https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp",
              "sameAs": [
                "https://instagram.com/amandateixeiraoficial",
                "https://facebook.com/amandateixeiraoficial"
              ],
              "knowsAbout": [
                "Design de Sobrancelhas",
                "Micropigmentação",
                "Estética Facial",
                "Empreendedorismo em Beleza"
              ]
            })
          }}
        />
        
        {/* 🏢 DADOS DA ORGANIZAÇÃO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Amanda Teixeira Beauty Academy",
              "url": "https://amandateixeiraoficial.com.br",
              "logo": "https://amandateixeiraoficial.com.br/logo.png",
              "description": "Academia de beleza especializada em cursos de design de sobrancelhas e micropigmentação",
              "founder": {
                "@type": "Person",
                "name": "Amanda Teixeira"
              },
              "foundingDate": "2016",
              "areaServed": "BR",
              "serviceType": "Educação em Beleza"
            })
          }}
        />
        
        {/* 🎯 PIXEL DE CONVERSÃO E ANALYTICS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Configuração inicial de tracking
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){dataLayer.push(arguments);};
              
              // Configuração do pixel
              window.pixelId = "68d352fa2bbdabf114779dac";
              
              // Performance mark
              if (typeof performance !== 'undefined' && performance.mark) {
                performance.mark('layout-start');
              }
              
              // Detecção de dispositivo
              window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
              console.log('🎨 Layout Premium Beleza 2025 carregado');
            `
          }}
        />
      </head>
      
      <body className="font-sans bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
        {/* 🎨 BACKGROUND PATTERN SOFISTICADO */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(199,125,89,0.1),transparent_50%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,160,130,0.08),transparent_40%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(192,132,105,0.06),transparent_40%)] pointer-events-none" />
        
        {/* 📱 CONTEÚDO PRINCIPAL */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        
        {/* 🚀 SCRIPTS DE PERFORMANCE E CONVERSÃO */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Lazy loading de scripts não críticos
              function loadScript(src, async = true, defer = true) {
                const script = document.createElement('script');
                script.src = src;
                if (async) script.async = true;
                if (defer) script.defer = true;
                document.head.appendChild(script);
                return script;
              }
              
              // Carregamento otimizado do UTMify
              setTimeout(() => {
                const utmifyScript = document.createElement("script");
                utmifyScript.setAttribute("async", "");
                utmifyScript.setAttribute("defer", "");
                utmifyScript.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
                document.head.appendChild(utmifyScript);
              }, 2000);
              
              // Analytics de performance
              window.addEventListener('load', () => {
                if (typeof performance !== 'undefined' && performance.mark) {
                  performance.mark('layout-complete');
                  
                  // Medir tempo de carregamento
                  const loadTime = performance.now();
                  console.log('⚡ Tempo de carregamento:', loadTime.toFixed(2) + 'ms');
                  
                  // Enviar métricas se disponível
                  if (window.gtag) {
                    gtag('event', 'page_load_time', {
                      value: Math.round(loadTime),
                      custom_parameter: 'beauty_layout_2025'
                    });
                  }
                }
              });
              
              // Otimização de scroll
              let ticking = false;
              function updateScrollPosition() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                // Parallax sutil nos backgrounds
                const backgrounds = document.querySelectorAll('[class*="bg-\[radial-gradient"]');
                backgrounds.forEach((bg, index) => {
                  if (bg) {
                    bg.style.transform = 'translateY(' + (rate * (index + 1) * 0.1) + 'px)';
                  }
                });
                
                ticking = false;
              }
              
              window.addEventListener('scroll', () => {
                if (!ticking) {
                  requestAnimationFrame(updateScrollPosition);
                  ticking = true;
                }
              }, { passive: true });
              
              // Preload de recursos críticos
              const criticalResources = [
                'https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cc431968f1a0ddac9f82d8/v4/player.js',
                'https://cdn.utmify.com.br/scripts/utms/latest.js'
              ];
              
              criticalResources.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'script';
                link.href = url;
                document.head.appendChild(link);
              });
              
              // Detecção de conexão lenta
              if ('connection' in navigator) {
                const connection = navigator.connection;
                if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                  document.body.classList.add('slow-connection');
                  console.log('🐌 Conexão lenta detectada - otimizações ativadas');
                }
              }
              
              // Service Worker para cache (se disponível)
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('✅ SW registrado:', registration.scope);
                    })
                    .catch(error => {
                      console.log('❌ SW falhou:', error);
                    });
                });
              }
              
              console.log('🚀 Layout Premium Beleza 2025 totalmente carregado');
            `
          }}
        />
        
        {/* 📊 GOOGLE ANALYTICS 4 (se configurado) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: 'Curso Sobrancelhas Premium',
                    page_location: window.location.href,
                    content_group1: 'Beauty Course',
                    content_group2: 'Landing Page',
                    custom_map: {
                      'custom_parameter_1': 'beauty_premium_2025'
                    }
                  });
                `
              }}
            />
          </>
        )}
        
        {/* 🔥 HOTJAR (se configurado) */}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
            }}
          />
        )}
      </body>
    </html>
  )
}