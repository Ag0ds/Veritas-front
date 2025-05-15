"use client"

import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from 'next/image'

interface HeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void; 
}
export default function Header({ activeSection = "home" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detecta o scroll para mudar a aparência do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Função para determinar se um item de menu está ativo
  const isActive = (sectionId: string) => activeSection === sectionId

  return (
    <header
  className={`w-full py-4 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${mobileMenuOpen ? "bg-[#121111]" : "bg-transparent"}
    ${scrolled ? "backdrop-blur-sm" : ""}
  `}
>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo with transparent background */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="w-12 h-12 md:flex items-center">
                <Image 
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority  
                />
                <h1 
                className={`font-[cambria]
                    text-lg
                    ${mobileMenuOpen ? "text-transparent" : "text-[#f1c40f]"}
                    `}
                    > 
                    Veritas 
                </h1>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none
              ${mobileMenuOpen ? "text-[#BAD7F5]" : "text-[#121111]"}
             `}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-[#000000] px-6 py-2 rounded-full">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`text-[#f1c40f] hover:text-white text-sm transition-colors duration-300 ${
                  isActive("home") ? "text-white font-medium" : ""
                }`}
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("enterprise")}
                className={`text-[#f1c40f] hover:text-white text-sm transition-colors duration-300 ${
                  isActive("enterprise") ? "text-white font-medium" : ""
                }`}
              >
                Não registrado?
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className={`text-[#f1c40f] hover:text-white text-sm transition-colors duration-300 ${
                  isActive("pricing") ? "text-white font-medium" : ""
                }`}
              >
                Análise
              </button>
              <button
                onClick={() => scrollToSection("customers")}
                className={`text-[#f1c40f] hover:text-white text-sm transition-colors duration-300 ${
                  isActive("customers") ? "text-white font-medium" : ""
                }`}
              >
                Sucesso
              </button>
            </div>

            {/* Right Side - Login and Get Started */}
            <div className="flex items-center space-x-4 ml-16">
              <div className="relative group md:flex space-x-4">
              <a href="https://www.veritas.law/sobre" className="flex items-center text-[#f1c40f] hover:text-white text-sm">
                 Sobre nós
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
                <Link href="https://www.veritas.law" className="flex items-center text-[#f1c40f] hover:text-white text-sm">
                  Login
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <Button className="bg-[#111111] text-white hover:bg-[#7d6608] rounded-md transition-all duration-300">
                Registre sua<span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-transparent bg-clip-text">MARCA
            </span>{" "}
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#121111] shadow-lg rounded-b-lg py-4 px-6 z-50 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-[#f1c40f] hover:text-white text-sm py-2 text-left transition-colors duration-300 ${
                isActive("home") ? "text-white font-medium" : ""
              }`}
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("enterprise")}
              className={`text-[#f1c40f] hover:text-white text-sm py-2 text-left transition-colors duration-300 ${
                isActive("enterprise") ? "text-white font-medium" : ""
              }`}
            >
              Não registrado?
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`text-[#f1c40f] hover:text-white text-sm py-2 text-left transition-colors duration-300 ${
                isActive("pricing") ? "text-white font-medium" : ""
              }`}
            >
              Análise
            </button>
            <button
              onClick={() => scrollToSection("customers")}
              className={`text-[#f1c40f] hover:text-white text-sm py-2 text-left transition-colors duration-300 ${
                isActive("customers") ? "text-white font-medium" : ""
              }`}
            >
              Sucesso
            </button>
            

            <div className="border-t border-gray-700 my-2"></div>
            <a
              href="https://www.veritas.law/sobre"
              className="text-[#f1c40f] hover:text-white text-sm py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre nós
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
            <Link
              href="https://www.veritas.law"
              className="text-[#f1c40f] hover:text-white text-sm py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>

            <Button className="bg-[#7d6608] text-white hover:bg-[#7d6608] rounded-md transition-all duration-300">
                Registre sua<span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 text-transparent bg-clip-text">MARCA
            </span>{" "}
              </Button>
          </div>
        </div>
      )}
    </header>
  )
}
