"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Clock, Users, DollarSign, Star, CheckCircle, Shield, Play, Zap, TrendingUp, Award, Heart, Eye, AlertTriangle, X } from "lucide-react"
import Script from "next/script"
import Image from "next/image"

// GA otimizado com debounce (mantido)
const enviarEvento = (() => {
  let queue = [];
  let timeout;
  
  return (evento, props = {}) => {
    queue.push({ evento, props });
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag('event', evento, props);
        });
        queue = [];
      }
    }, 300);
  };
})();

// Hook para Intersection Observer com fallback (mantido)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [vagasRestantes, setVagasRestantes] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [clientesVisualizando, setClientesVisualizando] = useState(127);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [vturbReady, setVturbReady] = useState(false);
  const [novasVagas24h, setNovasVagas24h] = useState(47);
  const [showUrgencyBanner, setShowUrgencyBanner] = useState(true);
  
  // Refs para lazy loading
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [priceRef, priceInView] = useIntersectionObserver({ threshold: 0.1 });

  // ✅ CONTROLE CORRIGIDO DO VÍDEO VTURB (mantido)
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkVturbPlayer = () => {
      const player = document.querySelector('vturb-smartplayer#vid-68cc431968f1a0ddac9f82d8');
      const hasContent = player && (
        player.innerHTML.trim() !== '' || 
        player.shadowRoot ||
        player.querySelector('iframe') ||
        player.querySelector('video') ||
        window.ConvertPlayer
      );
      
      if (hasContent) {
        console.log('✅ Vturb SmartPlayer carregado com sucesso');
        setVideoLoaded(true);
        setVturbReady(true);
        return true;
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        console.log('⚠️ Timeout - removendo fallback após 20s');
        setVideoLoaded(true);
        return true;
      }
      
      return false;
    };
    
    if (checkVturbPlayer()) return;
    
    const interval = setInterval(() => {
      if (checkVturbPlayer()) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Timer otimizado (mantido)
  useEffect(() => {
    if (!heroInView) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [heroInView]);

  // Simulação de atividade em tempo real (mantido + melhorado)
  useEffect(() => {
    const interval = setInterval(() => {
      setVagasRestantes(prev => {
        const newValue = prev > 2 ? prev - 1 : Math.floor(Math.random() * 3) + 3;
        return newValue;
      });
      
      setClientesVisualizando(prev => {
        const variation = Math.floor(Math.random() * 10) - 5;
        return Math.max(120, Math.min(150, prev + variation));
      });

      setNovasVagas24h(prev => {
        const variation = Math.floor(Math.random() * 6) - 3;
        return Math.max(40, Math.min(55, prev + variation));
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // ✅ CTA CORRIGIDO PARA FACEBOOK INITIATE CHECKOUT (mantido)
  const handleCTA = useCallback((e, origem) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    console.log(`🎯 CTA clicado - Origem: ${origem}`);
    
    // ✅ FACEBOOK PIXEL - INITIATE CHECKOUT (PRINCIPAL)
    if (typeof window !== 'undefined') {
      
      // Método 1: Via fbq direta (se disponível)
      if (window.fbq) {
        try {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'Formação Design de Sobrancelhas',
            content_category: 'Curso Online',
            content_ids: ['formacao-design-sobrancelhas'],
            value: 37.00,
            currency: 'BRL',
            num_items: 1,
            origem: origem,
            button_text: e.target.innerText || 'CTA Button',
            timestamp: Date.now()
          });
          console.log('✅ InitiateCheckout disparado via fbq - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro fbq:', error);
        }
      }
      
      // Método 2: Via UTMify (seu pixel principal)
      if (window.utmify) {
        try {
          if (window.utmify.track) {
            window.utmify.track('InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              content_category: 'Curso Online',
              value: 37.00,
              currency: 'BRL',
              origem: origem
            });
            console.log('✅ InitiateCheckout disparado via utmify.track - Origem:', origem);
          }
          
          if (window.utmify.pixel && window.utmify.pixel.track) {
            window.utmify.pixel.track('InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              value: 37.00,
              currency: 'BRL'
            });
            console.log('✅ InitiateCheckout disparado via utmify.pixel.track - Origem:', origem);
          }
        } catch (error) {
          console.warn('⚠️ Erro UTMify:', error);
        }
      }
      
      // Método 3: Via objeto pixel global (backup)
      if (window.pixel && window.pixel.track) {
        try {
          window.pixel.track('InitiateCheckout', {
            content_name: 'Formação Design de Sobrancelhas',
            value: 37.00,
            currency: 'BRL',
            origem: origem
          });
          console.log('✅ InitiateCheckout disparado via pixel.track - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro pixel global:', error);
        }
      }
      
      // Método 4: Via dataLayer (para GTM/Facebook)
      if (window.dataLayer) {
        try {
          window.dataLayer.push({
            event: 'facebook_initiate_checkout',
            ecommerce: {
              currency: 'BRL',
              value: 37.00,
              items: [{
                item_name: 'Formação Design de Sobrancelhas',
                item_category: 'Curso Online',
                price: 37.00,
                quantity: 1
              }]
            },
            origem: origem,
            timestamp: Date.now()
          });
          console.log('✅ InitiateCheckout disparado via dataLayer - Origem:', origem);
        } catch (error) {
          console.warn('⚠️ Erro dataLayer:', error);
        }
      }
      
      // Método 5: Disparo manual via eval (último recurso)
      try {
        const pixelCode = `
          if (typeof fbq !== 'undefined') {
            fbq('track', 'InitiateCheckout', {
              content_name: 'Formação Design de Sobrancelhas',
              value: 37.00,
              currency: 'BRL'
            });
          }
        `;
        eval(pixelCode);
        console.log('✅ InitiateCheckout disparado via eval - Origem:', origem);
      } catch (error) {
        console.warn('⚠️ Erro eval:', error);
      }
    }
    
    // Tracking genérico (manter o seu)
    enviarEvento('cta_click', { origem, timestamp: Date.now() });
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // 🎯 REDIRECIONAMENTO COM DELAY PARA GARANTIR TRACKING
    setTimeout(() => {
      console.log('🚀 Redirecionando para checkout...');
      window.location.href = 'https://pay.cakto.com.br/qpmz3oi_299505';
    }, 800);
    
    // Reset para UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Scripts de tracking da estrutura base */}
      <link rel="preconnect" href="https://cdn.utmify.com.br" />
      <link rel="preconnect" href="https://api6.ipify.org" />
      <link rel="preconnect" href="https://comprarplanseguro.shop" />
      <link rel="preconnect" href="https://nutricaoalimentos.shop" />

      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          window.pixelId = "68d352fa2bbdabf114779dac";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
      </Script>

      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        strategy="lazyOnload"
      />

      <Script
        src="https://scripts.converteai.net/529d9a9b-9a02-4648-9d1f-be6bbe950e40/players/68cc431968f1a0ddac9f82d8/v4/player.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Script Vturb V4 carregado com sucesso');
          setTimeout(() => {
            const player = document.querySelector('vturb-smartplayer#vid-68cc431968f1a0ddac9f82d8');
            if (player) {
              console.log('✅ Player encontrado após script load');
              setVturbReady(true);
            }
          }, 2000);
        }}
        onError={(e) => {
          console.warn('❌ Erro ao carregar script Vturb V4:', e);
          setVideoLoaded(true);
        }}
      />

      <Script 
        id="vturb-preload"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`
        }} 
      />

      {/* ✅ NOVO: BANNER DE URGÊNCIA NO TOPO */}
      {showUrgencyBanner && (
        <div className="bg-red-600 text-white text-center py-3 px-4 relative z-50">
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>🚨 SEJA RÁPIDA! Esta promoção pode EXPIRAR a qualquer momento!</span>
            <button 
              onClick={() => setShowUrgencyBanner(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-200"
              aria-label="Fechar banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION OTIMIZADA */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-2 py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        
        <div className="glass-hero max-w-5xl mx-auto p-6 relative z-10 fade-in-mobile">
          
          {/* ✅ PROVA SOCIAL MELHORADA */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Badge className="social-proof-badge">
              <Eye className="w-4 h-4 inline mr-1" />
              <span aria-label={`${clientesVisualizando} pessoas visualizando agora`}>
                {clientesVisualizando} vendo agora
              </span>
            </Badge>
            <Badge className="social-proof-badge">
              <Users className="w-4 h-4 inline mr-1" />
              <span aria-label={`Restam apenas ${vagasRestantes} vagas`}>
                Restam {vagasRestantes} vagas
              </span>
            </Badge>
          </div>

          {/* ✅ NOVA ESCASSEZ MAIS AGRESSIVA */}
          <div className="bg-red-500/20 border border-red-400 rounded-lg p-3 mb-6">
            <p className="text-red-300 text-sm font-bold text-center">
              ⚠️ ÚLTIMAS {vagasRestantes} VAGAS - Após esgotar, próxima turma apenas em MARÇO por R$ 497
            </p>
            <p className="text-red-300 text-xs text-center mt-1">
              +{novasVagas24h} mulheres garantiram vaga nas últimas 24h
            </p>
          </div>

          {/* ✅ HEADLINE MAIS IMPACTANTE */}
          <h1 className="headline-mobile">
            GANHE R$ 2.500+ POR MÊS FAZENDO SOBRANCELHAS<br />
            <span className="text-amber-400">MESMO SENDO COMPLETA INICIANTE!</span>
            <span className="block text-lg mt-2 text-slate-300">
              O método ÚNICO que permite você cobrar R$ 55 por atendimento em 30 dias - GARANTIDO!
            </span>
          </h1>
          
          {/* ✅ SUBHEADLINE OTIMIZADA */}
          <p className="subtitle-mobile">
            Já funcionou para <strong>1.500+ mulheres</strong> que começaram do absoluto zero e hoje faturam <strong>R$ 2.500+ por mês</strong> trabalhando apenas 3 horas por dia.
          </p>

          {/* ✅ VÍDEO VTURB COMPLETAMENTE CORRIGIDO */}
          <div className="relative max-w-3xl mx-auto mb-6">
            <Card className="glass-card-mobile p-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                
                <vturb-smartplayer 
                  id="vid-68cc431968f1a0ddac9f82d8"
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    borderRadius: '12px',
                    position: 'relative',
                    zIndex: 20
                  }}
                />
                
                {!videoLoaded && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl"
                    style={{ zIndex: 5 }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white font-semibold">Carregando vídeo...</p>
                      <p className="text-slate-300 text-sm mt-2">Aguarde alguns segundos</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* ✅ CTA PRINCIPAL OTIMIZADO */}
          <div className="text-center mb-4">
            <Button 
              onClick={(e) => handleCTA(e, 'hero')}
              disabled={isLoading}
              className="btn-primary-mobile gpu-accelerated"
              aria-label="Garantir minha vaga por R$ 37 antes que o preço volte para R$ 297"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  PROCESSANDO
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  QUERO COMEÇAR AGORA SEM RISCO POR R$ 37
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-300 mb-4">
            ⚡ Acesso imediato • 💎 Se paga no primeiro cliente • 🛡️ Garantia 7 dias
          </p>

          {/* ✅ TIMER COMPACTO MELHORADO COM ESCASSEZ */}
          <div className="timer-compact max-w-xs mx-auto">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 font-bold text-xs uppercase">Oferta termina em:</span>
            </div>
            <div className="flex justify-center gap-2" role="timer" aria-live="polite" aria-label={`Tempo restante: ${timeLeft.hours} horas, ${timeLeft.minutes} minutos, ${timeLeft.seconds} segundos`}>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">H</div>
              </div>
              <div className="timer-digit-small">:</div>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">M</div>
              </div>
              <div className="timer-digit-small">:</div>
              <div className="text-center">
                <div className="timer-digit-small">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-red-300">S</div>
              </div>
            </div>
            
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-2 mt-3">
              <p className="text-red-300 text-xs text-center font-bold">
                ⚠️ Após o timer, preço volta para R$ 297
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: PARA VOCÊ SE QUER... */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-3">
            Este curso é perfeito <span className="text-amber-400">para você se quer...</span>
          </h2>
          
          <div className="grid gap-4 mt-8">
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Trocar a CLT por uma profissão valorizada e lucrativa</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Começar do zero e aprender passo a passo sem enrolação</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Conquistar uma renda extra de R$ 2.500+ por mês</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Se destacar no mercado com uma técnica moderna e exclusiva</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Trabalhar com algo prazeroso, ajudando mulheres a se sentirem mais bonitas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ SEÇÃO POTENCIAL DE GANHOS MELHORADA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-3">
            💰 SEU POTENCIAL DE GANHOS
          </h2>
          <p className="text-lg text-center text-slate-300 mb-8">
            Baseado em R$ 55 por atendimento (preço mínimo do mercado)
          </p>

          <div className="calculator-mobile max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4">RENDA MENSAL REAL:</h3>
            
            <div className="earning-row">
              <span>1 cliente/dia</span>
              <span className="earning-value">R$ 1.210</span>
            </div>
            
            <div className="earning-row bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400">
              <span>2 clientes/dia (META REAL)</span>
              <span className="earning-value text-2xl">R$ 2.420</span>
            </div>
            
            <div className="earning-row">
              <span>3 clientes/dia</span>
              <span className="earning-value">R$ 3.630</span>
            </div>

            <div className="mt-4 p-3 bg-white/20 rounded-xl">
              <p className="font-bold text-sm">
                🎯 Com apenas 2 clientes/dia = R$ 2.500+/mês!
              </p>
              <p className="text-xs mt-1 text-slate-300">
                Nossas alunas cobram até R$ 80 por atendimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO - QUEBRA DE OBJEÇÕES MELHORADA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            ❓ AINDA TEM DÚVIDAS?
          </h2>
          
          <div className="space-y-4">
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2">
                  "Nunca fiz sobrancelhas antes..."
                </h3>
                <p className="text-slate-300 text-sm">
                  ✅ Perfeito! O método foi criado para iniciantes. Você aprende do zero ao profissional em passos simples e práticos.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2">
                  "E se não conseguir clientes?"
                </h3>
                <p className="text-slate-300 text-sm">
                  ✅ Impossível! O BÔNUS "Como Atrair 10 Clientes em 30 Dias" ensina estratégias testadas e aprovadas por 1.500+ alunas.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2">
                  "R$ 55 por atendimento é muito?"
                </h3>
                <p className="text-slate-300 text-sm">
                  ✅ É o preço MÍNIMO do mercado! Nossas alunas cobram até R$ 80. Você vai se surpreender com a valorização.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <h3 className="text-amber-400 font-bold mb-2">
                  "Não tenho tempo para estudar..."
                </h3>
                <p className="text-slate-300 text-sm">
                  ✅ São apenas 14h de conteúdo direto ao ponto. Você pode assistir no seu ritmo, quando quiser. Acesso vitalício!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ SEÇÃO PREÇO COM STACK DE VALOR MASSIVO */}
      <section ref={priceRef} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="price-section-mobile relative z-10">
            <div className="relative z-20">
              <h2 className="text-3xl font-bold text-white mb-4 text-center">
                🔥 OFERTA EXCLUSIVA!
              </h2>
              
              {/* ✅ STACK DE VALOR MASSIVO */}
              <Card className="glass-card-mobile p-4 border-2 border-amber-400 mb-6">
                <CardContent className="p-0">
                  <h3 className="text-amber-400 font-bold mb-3 text-center text-lg">
                    🎁 VOCÊ RECEBE HOJE (Valor Total: R$ 594)
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Curso Completo (14h de conteúdo)</span>
                      <span className="text-slate-300 text-sm"><s>R$ 297</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Certificado Profissional</span>
                      <span className="text-slate-300 text-sm"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Como Atrair 10 Clientes em 30 Dias</span>
                      <span className="text-slate-300 text-sm"><s>R$ 197</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Suporte Especializado</span>
                      <span className="text-slate-300 text-sm"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Comunidade Exclusiva</span>
                      <span className="text-slate-300 text-sm"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-slate-600 pb-2">
                      <span className="text-white text-sm">✅ Acesso Vitalício + Atualizações</span>
                      <span className="text-slate-300 text-sm"><s>R$ 97</s></span>
                    </div>
                    
                    <div className="bg-green-500/20 p-3 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-green-300 font-bold">TOTAL HOJE:</span>
                        <span className="text-green-300 font-bold text-2xl">R$ 37</span>
                      </div>
                      <p className="text-green-300 text-xs text-center mt-1">
                        Economia de R$ 557 (94% OFF)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mb-6">
                <div className="price-old-mobile">De R$ 297,00</div>
                <div className="price-new-mobile">R$ 37</div>
                <p className="text-slate-300">Pagamento único • Sem mensalidades</p>
              </div>

              <div className="text-center mb-4">
                <Button 
                  onClick={(e) => handleCTA(e, 'price')}
                  disabled={isLoading}
                  className="btn-primary-mobile gpu-accelerated"
                  aria-label="Garantir minha vaga no curso por R$ 37"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      PROCESSANDO
                      <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      GARANTIR MINHA VAGA AGORA
                      <Zap className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-center text-slate-300 text-sm">
                💎 Se paga no primeiro cliente!<br />
                🛡️ Garantia de 7 dias • ⚡ Acesso imediato
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO INSTRUTORA COMPACTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card-mobile p-6">
            <CardContent className="p-0">
              <div className="text-center mb-6">
                <Image
                  src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
                  alt="Amanda Teixeira, instrutora do curso de design de sobrancelhas"
                  width={200}
                  height={300}
                  className="rounded-2xl mx-auto mb-4"
                  loading="lazy"
                />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Amanda Teixeira
                </h2>
                <p className="text-slate-300 text-sm mb-4">
                  CEO do Studio Amanda Teixeira Beauty • 8+ anos de experiência • 1.500+ alunas formadas • 300+ clientes mensais
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    8+ anos experiência
                  </Badge>
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    1.500+ alunas
                  </Badge>
                  <Badge className="social-proof-badge text-xs">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    300+ clientes/mês
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: ANTES E DEPOIS VISUAL */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            ⭐ VEJA OS RESULTADOS <span className="text-amber-400">REAIS DA TÉCNICA</span>
          </h2>
          <p className="text-center text-slate-300 mb-8">
            Você também será capaz de entregar resultados assim - mesmo começando do zero
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4283.webp"
                alt="Resultado antes e depois de sobrancelha 1"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
            
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4284.webp"
                alt="Resultado antes e depois de sobrancelha 2"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
            
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/fernanda-3.webp"
                alt="Resultado antes e depois de sobrancelha 3"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
            
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
                alt="Resultado antes e depois de sobrancelha 4"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
            
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4283.webp"
                alt="Resultado antes e depois de sobrancelha 5"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
            
            <Card className="glass-card-mobile p-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4284.webp"
                alt="Resultado antes e depois de sobrancelha 6"
                width={200}
                height={200}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ DEPOIMENTOS COMPACTOS MELHORADOS */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            ⭐ O QUE AS ALUNAS ESTÃO FALANDO
          </h2>
          
          <div className="space-y-4">
            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4283.webp"
                    alt="Foto de Mariana Silva, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      "Primeira semana: R$ 385. Segundo mês: R$ 2.100. Hoje tenho lista de espera! O método da Amanda é incrível."
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Mariana Silva, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/IMG_4284.webp"
                    alt="Foto de Juliana Costa, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      "Zero experiência. Com o método da Amanda, R$ 55 por cliente desde o 1º atendimento! Não acreditava que seria possível."
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Juliana Costa, RJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/fernanda-3.webp"
                    alt="Foto de Fernanda Oliveira, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      "Bônus de atração foi divisor de águas! 12 novas clientes em 1 mês. Renda extra de R\$2.500! Mudou minha vida."
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Fernanda Oliveira, MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="testimonial-compact hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://amandateixeiraoficial.com.br/wp-content/uploads/2025/09/expert-img.webp"
                    alt="Foto de Carolina Santos, aluna do curso"
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-amber-400 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-slate-200 text-sm mb-2">
                      "Saí do desemprego para R\$ 3.200/mês em 3 meses. Hoje tenho meu próprio studio. Gratidão eterna à Amanda!"
                    </p>
                    <div className="flex text-amber-400 mb-1" aria-label="5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-amber-400 text-xs">Carolina Santos, PR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CONTEÚDO DO CURSO RESUMIDO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            📚 O QUE VOCÊ VAI APRENDER
          </h2>
          
          <div className="grid gap-4">
            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                  <h3 className="text-lg font-bold text-white">Fundamentos Profissionais</h3>
                </div>
                <p className="text-slate-300 text-sm">Anatomia facial, materiais profissionais e protocolos de segurança</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                  <h3 className="text-lg font-bold text-white">Simetria Facial Perfeita</h3>
                </div>
                <p className="text-slate-300 text-sm">Modelagem personalizada para cada formato de rosto e biotipo</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                  <h3 className="text-lg font-bold text-white">Técnicas Avançadas</h3>
                </div>
                <p className="text-slate-300 text-sm">Spa de sobrancelhas, técnica de pinçamento e cromoterapia exclusiva</p>
              </CardContent>
            </Card>

            <Card className="glass-card-mobile p-4 border-2 border-amber-400 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">🎁</div>
                  <h3 className="text-lg font-bold text-amber-400">BÔNUS EXCLUSIVO</h3>
                </div>
                <p className="text-slate-300 text-sm">Como atrair 10 clientes em 30 dias + estratégias de vendas e fidelização</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ✅ NOVA SEÇÃO: RECAPITULAÇÃO FINAL */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Recapitulando: Tudo o que você leva hoje por apenas <span className="text-amber-400">R\$ 37</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lista do que recebe */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">✅ VOCÊ RECEBE:</h3>
              <div className="space-y-3">
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Curso completo com 14h de conteúdo</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Certificado de conclusão profissional</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Acesso vitalício + atualizações</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Suporte especializado</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Comunidade exclusiva de alunas</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>BÔNUS: Como atrair 10 clientes em 30 dias</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Garantia incondicional de 7 dias</span>
                </div>
              </div>
            </div>
            
            {/* CTA Box */}
            <Card className="glass-card-mobile p-6">
              <CardContent className="p-0 text-center">
                <div className="mb-4">
                  <div className="text-slate-400 line-through text-lg">De: R\$ 297,00</div>
                  <div className="text-4xl font-bold text-amber-400">R\$ 37</div>
                  <div className="text-slate-300">Pagamento único</div>
                </div>
                
                <Button 
                  onClick={(e) => handleCTA(e, 'recap')}
                  disabled={isLoading}
                  className="btn-primary-mobile w-full mb-4"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      PROCESSANDO
                      <div className="loading-dots">
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                        <div className="loading-dot"></div>
                      </div>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      QUERO COMEÇAR AGORA SEM RISCO
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Acesso Imediato</span>
                  </div>
                  <div className="flex items-center justify-center text-green-400">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center justify-center text-green-400">
                    <Zap className="w-4 h-4 mr-2" />
                    <span>Se paga no 1º cliente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GARANTIA COMPACTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card-mobile p-6 text-center hover:scale-105 transition-transform duration-300">
            <CardContent className="p-0">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">
                🛡️ GARANTIA INCONDICIONAL DE 7 DIAS
              </h2>
              <p className="text-slate-300 mb-4">
                100% do seu dinheiro de volta se não ficar satisfeita. Sem perguntas, sem burocracia, sem complicação.
              </p>
              <p className="text-amber-400 font-bold text-lg">
                O RISCO É TODO NOSSO!
              </p>
              <p className="text-slate-300 text-sm mt-2">
                Você pode testar todo o conteúdo por 7 dias completos
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ✅ FAQ MELHORADO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            ❓ PERGUNTAS FREQUENTES
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-4">
                Preciso ter experiência prévia?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-4 pb-4">
                Não! O curso foi criado especificamente para iniciantes. Você aprende do absoluto zero até se tornar uma profissional confiante, com método passo a passo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-4">
                Quanto tempo leva para começar a atender?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-4 pb-4">
                Em média, nossas alunas começam a atender em 2-3 semanas. O curso tem 14h de conteúdo que você pode assistir no seu ritmo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-4">
                Como funciona a garantia?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-4 pb-4">
                Você tem 7 dias para testar todo o conteúdo. Se não ficar satisfeita, devolvemos 100% do valor sem perguntas ou burocracia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-4">
                Preciso comprar materiais caros?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-4 pb-4">
                Não! Ensinamos como começar com um investimento mínimo e onde comprar materiais de qualidade com preços acessíveis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="glass-card-mobile border-none">
              <AccordionTrigger className="text-white hover:text-amber-400 px-4">
                O acesso é vitalício mesmo?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 px-4 pb-4">
                Sim! Você terá acesso para sempre, incluindo todas as atualizações futuras do curso, sem custo adicional.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ✅ CTA FINAL OTIMIZADO COM URGÊNCIA MÁXIMA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* ✅ URGÊNCIA FINAL MAIS FORTE */}
          <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-lg font-bold text-center">
              🚨 ÚLTIMAS {vagasRestantes} VAGAS DISPONÍVEIS
            </p>
            <p className="text-red-300 text-sm text-center mt-1">
              Após esgotar, próxima turma apenas em MARÇO por R\$ 497
            </p>
            <p className="text-red-300 text-xs text-center mt-2">
              +{novasVagas24h} mulheres garantiram vaga nas últimas 24h
            </p>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">
            🚀 TRANSFORME SUA VIDA AGORA!
          </h2>
          <p className="text-lg text-slate-300 mb-6">
            Por apenas <span className="text-amber-400 font-bold text-2xl">R\$ 37,00</span> você tem acesso a tudo que precisa para conquistar sua independência financeira trabalhando com sobrancelhas.
          </p>
          
          <Button 
            onClick={(e) => handleCTA(e, 'final')}
            disabled={isLoading}
            className="btn-primary-mobile text-lg py-6 px-8 gpu-accelerated mb-4"
            aria-label="Transformar minha vida agora com o curso de design de sobrancelhas"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                PROCESSANDO
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                GARANTIR ANTES QUE ACABE
                <AlertTriangle className="ml-2 w-6 h-6" />
              </span>
            )}
          </Button>
          
          <p className="text-slate-300 text-sm">
            ⚡ Acesso imediato • 🛡️ Garantia 7 dias • 💎 Zero riscos • 🎯 Se paga no 1º cliente
          </p>
        </div>
      </section>

      {/* RODAPÉ MINIMALISTA */}
      <footer className="py-6 px-4 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2024 Amanda Teixeira Oficial - Todos os direitos reservados</p>
          <p className="mt-2 text-xs">
            Este produto não garante a obtenção de resultados. Qualquer referência ao desempenho de uma estratégia não deve ser interpretada como uma garantia de resultados.
          </p>
        </div>
      </footer>
    </main>
  )
}