"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send } from "lucide-react"
import { motion } from "framer-motion"

// Tipos para as mensagens
type MessageType = {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: Date
}

// Respostas automáticas baseadas em palavras-chave
const AUTO_RESPONSES: Record<string, string[]> = {
  default: [
    "Como posso ajudar com o registro da sua marca?",
    "Gostaria de saber mais sobre nossos serviços de registro de marca?",
    "Tem alguma dúvida específica sobre o processo de registro?",
  ],
  olá: ["Olá! Como posso ajudar você hoje?", "Olá! Bem-vindo ao atendimento da Veritas. Como posso ajudar?"],
  oi: ["Oi! Como posso ajudar você hoje?", "Oi! Bem-vindo ao atendimento da Veritas. Como posso ajudar?"],
  preço: [
    "Nossos preços variam de acordo com o tipo de registro e a complexidade da sua marca. Podemos fazer um orçamento personalizado para você.",
    "Temos planos a partir de R$ 1.200,00 para registro de marca. Gostaria de receber um orçamento detalhado?",
  ],
  custo: [
    "O custo do registro de marca varia conforme a complexidade e abrangência. Podemos preparar um orçamento personalizado.",
    "Nossos serviços de registro de marca têm valores a partir de R$ 1.200,00. Posso enviar mais detalhes?",
  ],
  tempo: [
    "O processo de registro no INPI leva em média de 12 a 24 meses, mas você já fica protegido desde o depósito inicial.",
    "Após iniciarmos o processo, o prazo médio é de 12 a 24 meses para conclusão, mas sua marca já fica protegida desde o início.",
  ],
  prazo: [
    "O prazo médio para conclusão do registro é de 12 a 24 meses, mas sua marca já fica protegida desde o depósito inicial.",
    "Trabalhamos para agilizar o processo, que normalmente leva de 12 a 24 meses, mas você já tem proteção desde o início.",
  ],
  processo: [
    "O processo inclui: 1) Análise prévia de viabilidade; 2) Preparação e depósito do pedido; 3) Acompanhamento junto ao INPI; 4) Obtenção do certificado final.",
    "Nosso processo é simplificado: fazemos uma análise prévia, preparamos toda a documentação, realizamos o depósito e acompanhamos até a obtenção do certificado.",
  ],
  inpi: [
    "O INPI (Instituto Nacional da Propriedade Industrial) é o órgão responsável pelo registro de marcas no Brasil.",
    "Trabalhamos diretamente com o INPI, que é o órgão oficial para registro de marcas no Brasil, garantindo que seu processo siga todos os trâmites legais.",
  ],
  obrigado: [
    "De nada! Estamos à disposição para ajudar com o registro da sua marca.",
    "O prazer é nosso! Se precisar de mais informações, estamos à disposição.",
  ],
  obrigada: [
    "De nada! Estamos à disposição para ajudar com o registro da sua marca.",
    "O prazer é nosso! Se precisar de mais informações, estamos à disposição.",
  ],
}

// Função para encontrar resposta baseada em palavras-chave
const findResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  // Verifica se alguma palavra-chave está presente na mensagem
  for (const [keyword, responses] of Object.entries(AUTO_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      // Retorna uma resposta aleatória para a palavra-chave
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Se nenhuma palavra-chave for encontrada, retorna uma resposta padrão
  const defaultResponses = AUTO_RESPONSES.default
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

// Componente de indicador de digitação
const TypingIndicator = () => (
  <div className="flex items-start">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mr-2 flex-shrink-0">
      <MessageSquare className="h-4 w-4 text-white" />
    </div>
    <div className="bg-white/20 rounded-lg rounded-tl-none p-3 max-w-[80%]">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  </div>
)

// Componente principal do chat
export default function ChatBox({ className = "", glowing = false }: { className?: string; glowing?: boolean }) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      sender: "bot",
      text: "Olá! Solicite sua análise gratuita, envie os seguintes dados: Nome completo, Nome da marca, Área de atuação (breve), E-mail, WhatsApp(para mantermos um contato mais direto caso queira). ",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "bot",
      text: "Cuidamos de toda a burocracia para você. Nossa equipe especializada acompanha cada etapa do processo de registro junto ao INPI.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("Quero minha análise gratuita")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)


  // Rola para o final quando novas mensagens são adicionadas
  useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.parentElement!.scrollTop = 0
  }
}, [])

  // Função para enviar mensagem
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Adiciona a mensagem do usuário
    const userMessage: MessageType = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simula o bot digitando
    setIsTyping(true)

    // Gera resposta automática após um pequeno delay
    setTimeout(() => {
      const botResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: findResponse(userMessage.text),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500) // Delay de 1.5 segundos para simular digitação
  }

  // Manipula o envio ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:bg-white/15 ${
        glowing ? "border-glow border-glow-pricing border-glow-active" : "border-glow border-glow-pricing"
      } ${className}`}
      style={{
        width: "100%",
        maxWidth: "400px",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cabeçalho do chat */}
      <div className="flex items-center pb-3 border-b border-white/20 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mr-3">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Atendimento Veritas</h3>
          <p className="text-xs text-gray-300">Online agora</p>
        </div>
      </div>

      {/* Corpo do chat */}
      <div className="flex-grow overflow-y-auto space-y-4 mb-4 max-h-[180px] pr-2 custom-scrollbar">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start ${message.sender === "user" ? "justify-end" : ""}`}>
            {message.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mr-2 flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                message.sender === "user"
                  ? "bg-yellow-500/30 rounded-lg rounded-tr-none"
                  : "bg-white/20 rounded-lg rounded-tl-none"
              } p-3 max-w-[80%]`}
            >
              <p className="text-sm text-white">{message.text}</p>
              <p className="text-[10px] text-gray-300 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </motion.div>
          </div>
        ))}

        {/* Indicador de digitação */}
        {isTyping && <TypingIndicator />}

        {/* Referência para rolagem automática */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensagem */}
      <div className="mt-auto">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Quero minha análise gratuita"
            className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 rounded-full p-1.5 hover:bg-yellow-600 transition-colors"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
