"use client"

import { useEffect, useRef, useState } from "react"
import Header from "@/components/header"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence, useAnimation, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import ChatBox from "@/components/chat-box"
import "./background-animation.css"
import "./glowing-border.css"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const mainRef = useRef<HTMLDivElement>(null)
  const [activeBox, setActiveBox] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isScrolling, setIsScrolling] = useState(false)
  const [boxesGlowing, setBoxesGlowing] = useState({
    home: false,
    pricing: false,
    customers: false,
  })

  // Efeito para ativar o brilho das caixas periodicamente
  useEffect(() => {
    // Ativa o brilho da caixa da seção ativa
    const interval = setInterval(() => {
      if (activeSection === "home" || activeSection === "pricing" || activeSection === "customers") {
        setBoxesGlowing((prev) => ({
          ...prev,
          [activeSection]: true,
        }))

        // Desativa após 3 segundos (duração da animação)
        setTimeout(() => {
          setBoxesGlowing((prev) => ({
            ...prev,
            [activeSection]: false,
          }))
        }, 3000)
      }
    }, 6000) // Ativa a cada 6 segundos

    return () => clearInterval(interval)
  }, [activeSection])

  // Detecta se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verifica inicialmente
    checkIfMobile()

    // Adiciona listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpa o listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Configuração para detectar qual seção está visível
  const [homeRef, homeInView] = useInView({ threshold: 0.5 })
  const [enterpriseRef, enterpriseInView] = useInView({ threshold: 0.5 })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.5 })
  const [customersRef, customersInView] = useInView({ threshold: 0.5 })
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 })
  const [footerRef, footerInView] = useInView({ threshold: 0.2 })

  // Atualiza a seção ativa com base na visibilidade
  useEffect(() => {
    if (homeInView) setActiveSection("home")
    else if (enterpriseInView) setActiveSection("enterprise")
    else if (pricingInView) setActiveSection("pricing")
    else if (customersInView) setActiveSection("customers")
    else if (aboutInView) setActiveSection("about")
  }, [homeInView, enterpriseInView, pricingInView, customersInView, aboutInView])

  // Configuração de rolagem suave
  useEffect(() => {
    document.body.style.overflow = "hidden"

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (!mainRef.current) return

      const delta = e.deltaY
      const currentScroll = mainRef.current.scrollTop
      const windowHeight = window.innerHeight

      // Determina a direção da rolagem
      if (delta > 0) {
        // Rolagem para baixo - próxima seção
        mainRef.current.scrollTo({
          top: Math.ceil((currentScroll + 1) / windowHeight) * windowHeight,
          behavior: "smooth",
        })
      } else {
        // Rolagem para cima - seção anterior
        mainRef.current.scrollTo({
          top: Math.floor((currentScroll - 1) / windowHeight) * windowHeight,
          behavior: "smooth",
        })
      }
    }

    // Manipulação de eventos de toque para dispositivos móveis
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!mainRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY - touchEndY
      const windowHeight = window.innerHeight
      const currentScroll = mainRef.current.scrollTop

      // Se o movimento for significativo o suficiente
      if (Math.abs(delta) > 50) {
        if (delta > 0) {
          // Deslizou para cima - próxima seção
          mainRef.current.scrollTo({
            top: Math.ceil((currentScroll + 1) / windowHeight) * windowHeight,
            behavior: "smooth",
          })
        } else {
          // Deslizou para baixo - seção anterior
          mainRef.current.scrollTo({
            top: Math.floor((currentScroll - 1) / windowHeight) * windowHeight,
            behavior: "smooth",
          })
        }
      }
    }

    const mainElement = mainRef.current
    if (mainElement) {
      mainElement.addEventListener("wheel", handleWheel, { passive: false })
      mainElement.addEventListener("touchstart", handleTouchStart, { passive: true })
      mainElement.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      document.body.style.overflow = ""
      if (mainElement) {
        mainElement.removeEventListener("wheel", handleWheel)
        mainElement.removeEventListener("touchstart", handleTouchStart)
        mainElement.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [])

  // Função para navegar para uma seção específica
  const scrollToSection = (id: string) => {
    const sectionMap: Record<string, number> = {
      home: 0,
      enterprise: 1,
      pricing: 2,
      customers: 3,
      about: 4,
    }

    const sectionIndex = sectionMap[id]
    if (sectionIndex !== undefined && mainRef.current) {
      mainRef.current.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  // Variantes para animação das caixas
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  // Dados para as caixas da seção Enterprise
  const enterpriseBoxes = [
    {
      title: "Ao contratar nossos serviços, você garante:",
      description: "Exclusividade de uso em todo o Brasil",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      title: "Ao contratar nossos serviços, você garante:",
      description: "Segurança jurídica para crescer com tranquilidade",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Ao contratar nossos serviços, você garante:",
      description: "Proteção contra cópias e concorrência desleal",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Ao contratar nossos serviços, você garante:",
      description: "Marcas registradas têm mais credibilidade no mercado.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ]

  // Função para navegar para a próxima caixa
  const nextBox = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % enterpriseBoxes.length)
    setActiveBox(null)
  }

  // Função para navegar para a caixa anterior
  const prevBox = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + enterpriseBoxes.length) % enterpriseBoxes.length)
    setActiveBox(null)
  }

  // Função para lidar com o gesto de arrastar
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50 // Quantidade mínima de pixels para considerar um swipe

    if (info.offset.x > threshold) {
      // Arrastou para a direita - vai para o slide anterior
      prevBox()
    } else if (info.offset.x < -threshold) {
      // Arrastou para a esquerda - vai para o próximo slide
      nextBox()
    } else {
      // Se o arrasto foi pequeno, volta para a posição original
      controls.start({ x: 0 })
    }
  }

  // Função para renderizar uma caixa animada com conteúdo específico para cada seção
  const renderBox = (isInView: boolean, section: string) => {
    const boxContent = {
      home: {
        title:
          "Somos especialista em registro de marcas, cuidamos de tudo para você de forma segura, rápida e sem complicações.",
        description:
          "Seja você um MEI, empresa ou profissional liberal, registrar sua marca é o primeiro passo para crescer com segurança.",
        icon: "M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
      },
      customers: {
        title: "Nós explicamos tudo, cuidamos da burocracia, acompanhamos o processo e você não se preocupa com nada.",
        description: " Fale conosco agora e proteja sua marca de forma profissional.",
        icon: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z",
      },
    }

    // Adiciona a classe de brilho para todas as seções
    const borderGlowClass = `border-glow border-glow-${section} ${boxesGlowing[section as keyof typeof boxesGlowing] ? "border-glow-active" : ""}`

    // Renderiza o componente de chat para a seção pricing
    if (section === "pricing") {
      return (
        <motion.div variants={boxVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <ChatBox glowing={boxesGlowing.pricing} />
        </motion.div>
      )
    }

    // Renderiza a caixa padrão para outras seções
    const content = boxContent[section as keyof typeof boxContent]
    return (
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white/15 ${borderGlowClass}`}
        style={{
          width: "100%",
          maxWidth: "400px",
          minHeight: "280px",
        }}
        onMouseEnter={() => setBoxesGlowing((prev) => ({ ...prev, [section]: true }))}
        onMouseLeave={() => setTimeout(() => setBoxesGlowing((prev) => ({ ...prev, [section]: false })), 1500)}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={content.icon} />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">{content.title}</h3>
        <p className="text-lg leading-relaxed text-gray-200">{content.description}</p>
      </motion.div>
    )
  }

  // Função para renderizar o carrossel de caixas da seção Enterprise
  const renderEnterpriseCarousel = () => {
    return (
      <div className="relative w-full max-w-lg flex flex-col items-center">
        <div className="flex items-center w-full justify-center">
          {/* Botões de navegação - visíveis apenas em desktop */}
          {!isMobile && (
            <button
              onClick={prevBox}
              className="mr-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Container do carrossel */}
          <div ref={carouselRef} className="overflow-hidden rounded-xl w-full max-w-[400px] touch-pan-y">
            <motion.div
              animate={controls}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div
                    className={`bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20 transform transition-all duration-500 cursor-pointer ${
                      activeBox === currentIndex ? "ring-2 ring-yellow-400 bg-white/20" : "hover:bg-white/15"
                    } border-glow border-glow-enterprise`}
                    onClick={() => setActiveBox(activeBox === currentIndex ? null : currentIndex)}
                    style={{
                      width: "100%",
                      minHeight: "280px",
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6 flex items-center justify-center"
                      animate={{
                        rotate: activeBox === currentIndex ? 360 : 0,
                        scale: activeBox === currentIndex ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        times: activeBox === currentIndex ? [0, 0.5, 1] : [0],
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={enterpriseBoxes[currentIndex].icon}
                        />
                      </svg>
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-white mb-4"
                      animate={{
                        scale: activeBox === currentIndex ? [1, 1.05, 1] : 1,
                        color: activeBox === currentIndex ? "#fcd34d" : "#ffffff",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {enterpriseBoxes[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-lg leading-relaxed text-gray-200"
                      animate={{ opacity: activeBox === currentIndex ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {enterpriseBoxes[currentIndex].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Botões de navegação - visíveis apenas em desktop */}
          {!isMobile && (
            <button
              onClick={nextBox}
              className="ml-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 text-white transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Indicadores de carrossel */}
        <div className="flex justify-center mt-6 space-x-2">
          {enterpriseBoxes.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-yellow-400 w-6" : "bg-white/30"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setActiveBox(null)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <div
        ref={mainRef}
        className="h-screen w-full overflow-y-auto scroll-container relative z-10"
        style={{
          scrollBehavior: "smooth",
          scrollSnapType: isMobile ? "y proximity" : "y mandatory", // Mudança para proximity no mobile
        }}
      >
        <Header activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Seção Home - Degradê de #252525 para #7d6608 */}
        <section
          id="home"
          ref={homeRef}
          className={`${isMobile ? "min-h-screen" : "h-screen"} w-full relative flex items-center justify-center section`}
          style={{ scrollSnapAlign: isMobile ? "start" : "start" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.89), rgba(3, 0, 17, 0.7))" }}
          ></div>
          <div className="container mx-auto px-6 pt-20 pb-10 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: homeInView ? 1 : 0, y: homeInView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-5/12 mb-16 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: homeInView ? 1 : 0, y: homeInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-4xl font-bold text-white leading-tight tracking-tight"
                style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)" }}
              >
                Sua{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-transparent bg-clip-text">
                  MARCA
                </span>{" "}
                é seu maior ativo.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: homeInView ? 1 : 0, y: homeInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed"
                style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}
              >
                Já pensou em <span className="font-semibold text-white">registra-la?</span>
              </motion.p>
            </motion.div>

            <div className="md:w-5/12 flex justify-center">{renderBox(homeInView, "home")}</div>
          </div>
        </section>

        {/* Seção Enterprise - Degradê de #7d6608 para #252525 (invertido) */}
        <section
          id="enterprise"
          ref={enterpriseRef}
          className={`${isMobile ? "min-h-screen py-20" : "h-screen"} w-full relative flex items-center justify-center section`}
          style={{ scrollSnapAlign: isMobile ? "start" : "start" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(to bottom, rgba(3, 0, 17, 0.7), rgba(0, 0, 0, 0.7))" }}
          ></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: enterpriseInView ? 1 : 0, y: enterpriseInView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-5/12 mb-16 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: enterpriseInView ? 1 : 0, y: enterpriseInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight"
                style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)" }}
              >
                Sua{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-transparent bg-clip-text">
                  MARCA
                </span>{" "}
                não está registrada?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: enterpriseInView ? 1 : 0, y: enterpriseInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-base md:text-2xl text-gray-200 leading-relaxed"
                style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}
              >
                Se você não registra sua marca, corre o risco de outra pessoa registrá-la antes e te impedir de usá-la,
                mesmo que já tenha site, redes sociais e identidade visual prontos. Isso pode gerar processos, obrigar
                você a mudar tudo do zero e fazer com que todo o seu investimento vá por água abaixo.{" "}
              </motion.p>
            </motion.div>

            <div className="md:w-5/12 flex justify-center mt-8 md:mt-0">{renderEnterpriseCarousel()}</div>
          </div>
        </section>

        {/* Seção Pricing - Degradê de #252525 para #7d6608 (volta ao padrão inicial) */}
        <section
          id="pricing"
          ref={pricingRef}
          className={`${isMobile ? "min-h-screen py-20" : "h-screen"} w-full relative flex items-center justify-center section`}
          style={{ scrollSnapAlign: isMobile ? "start" : "start" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(3, 0, 17, 0.7))" }}
          ></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: pricingInView ? 1 : 0, y: pricingInView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-5/12 mb-16 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: pricingInView ? 1 : 0, y: pricingInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight"
                style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)" }}
              >
                Proteja sua marca antes que alguém registre no seu lugar!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: pricingInView ? 1 : 0, y: pricingInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-base md:text-2xl text-gray-200 leading-relaxed"
                style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" }}
              >
                <span className="font-semibold text-white">
                  Entre em contato para fazer a análise gratuita da sua marca.
                </span>
              </motion.p>
            </motion.div>

            <div className="md:w-5/12 flex justify-center mt-8 md:mt-0">{renderBox(pricingInView, "pricing")}</div>
          </div>
        </section>

        {/* Seção Customers - Degradê de #7d6608 para #252525 (invertido) */}
        <section
          id="customers"
          ref={customersRef}
          className={`${isMobile ? "min-h-screen py-20" : "h-screen"} w-full relative flex items-center justify-center section`}
          style={{ scrollSnapAlign: isMobile ? "start" : "start" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(to bottom, rgba(3, 0, 17, 0.7), rgba(0, 0, 0, 0.7))" }}
          ></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: customersInView ? 1 : 0, y: customersInView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:w-5/12 mb-16 md:mb-0"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: customersInView ? 1 : 0, y: customersInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight"
                style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4)" }}
              >
                Como funciona o processo?
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: customersInView ? 1 : 0, y: customersInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 space-y-3"
              >
                <h2 className="font-semibold text-white text-lg md:text-2xl">- Análise gratuita da sua marca;</h2>
                <h2 className="font-semibold text-white text-lg md:text-2xl">- Planejamento da classe correta;</h2>
                <h2 className="font-semibold text-white text-lg md:text-2xl">- Envio da documentação e protocolo;</h2>
                <h2 className="font-semibold text-white text-lg md:text-2xl">- Acompanhamento completo;</h2>
              </motion.div>
            </motion.div>

            <div className="md:w-5/12 flex justify-center mt-8 md:mt-0">{renderBox(customersInView, "customers")}</div>
          </div>
        </section>

        {/* Rodapé */}
        <section
          id="footer"
          ref={footerRef}
          className={`${isMobile ? "min-h-screen" : "min-h-screen"} w-full relative flex items-center justify-center section`}
          style={{ scrollSnapAlign: "start" }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(to bottom,rgba(0, 0, 0, 0.7) ,rgba(3, 0, 17, 0.7))" }}
          ></div>
          <div className="relative z-10 w-full">
            <Footer />
          </div>
        </section>
      </div>
    </>
  )
}
