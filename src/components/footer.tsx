import Link from "next/link"
import { Facebook, Instagram, Linkedin, Lock, Shield, PhoneIcon as Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#121111] text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Seção principal do rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Coluna 1 - Informações da empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f1c40f]">Marca Protegida BR</h3>
            <p className="text-gray-300 mb-2">Registro e Proteção de Marcas</p>
            <p className="text-gray-400 text-sm mb-4">CNPJ: 55.200.600/0001-95.20</p>
            <div className="flex items-center mb-4">
              <Lock className="h-4 w-4 text-[#f1c40f] mr-2" />
              <span className="text-sm text-gray-300">Ambiente 100% seguro</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-[#f1c40f] mr-2" />
              <span className="text-sm text-gray-300">Especialista no INPI</span>
            </div>
          </div>

          {/* Coluna 2 - Links úteis */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f1c40f]">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.veritas.law/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="https://www.veritas.law" className="text-gray-300 hover:text-white transition-colors">
                  Nossos Serviços
                </Link>
              </li>
              <li>
                <Link href="https://www.veritas.law/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="https://www.veritas.law/contatos" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato e redes sociais */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f1c40f]">Contato</h3>
            <p className="text-gray-300 mb-4">Entre em contato conosco para proteger sua marca!</p>

            {/* Redes sociais */}
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/hub.veritas.law/?paipv=0&eav=AfYMc-n0b0STcRXF3uUHE1PjsLt6_UT3Ow9Yn7WwtCehQNUGi9a6H1wkZkgCzw2yBGs&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5 text-[#f1c40f]" />
              </Link>
              <Link
                href="https://www.instagram.com/veritas.law/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5 text-[#f1c40f]" />
              </Link>
              <Link
                href="https://www.youtube.com/@veritaslaw_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Youtube className="h-5 w-5 text-[#f1c40f]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/veritaslaw/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[#f1c40f]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Certificações e selos */}
        <div className="flex flex-wrap justify-center gap-6 py-6 border-t border-gray-800 mb-6">
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
            <Shield className="h-6 w-6 text-[#f1c40f] mr-2" />
            <span className="text-sm">Especialista em Registro de Marcas</span>
          </div>
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
            <Lock className="h-6 w-6 text-[#f1c40f] mr-2" />
            <span className="text-sm">Ambiente Seguro SSL</span>
          </div>
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
            <svg
              className="h-6 w-6 text-[#f1c40f] mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm">Adequado à LGPD</span>
          </div>
        </div>

        {/* Direitos autorais e links legais */}
        <div className="text-center text-gray-400 text-sm">
          <p className="mb-4">Copyright 2025 © Veritas – Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacidade" className="hover:text-[#f1c40f] transition-colors">
              Política de Privacidade
            </Link>
            <span>|</span>
            <Link href="/termos" className="hover:text-[#f1c40f] transition-colors">
              Termos de Uso
            </Link>
            <span>|</span>
            <Link href="/lgpd" className="hover:text-[#f1c40f] transition-colors">
              Adequado à LGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
