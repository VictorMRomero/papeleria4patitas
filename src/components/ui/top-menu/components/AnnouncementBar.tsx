'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { IoArrowForward } from "react-icons/io5"
import { whatsappUrl } from "@/config/contact"

interface Message {
  title: string
  ref: string
}

export const AnnouncementBar = () => {
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  const messageList: Message[] = [
    {
      title: "¡Aprovecha las ofertas de este mes!",
      ref: "/category/ofertas"
    },
    {
      title: "Compra tu lista de útiles con nosotros y obtén el 10% de descuento",
      ref: whatsappUrl("Hola 👋, quiero comprar mi lista de útiles y aprovechar el 10% de descuento.")
    },
    {
      title: "¡Ve los nuevos productos de esta semana!",
      ref: "/category/newest"
    },
    {
      title: "Últimas unidades, no te quedes sin tu producto favorito",
      ref: "/category/ofertas"
    }
  ]

  useEffect(() => {
    // Seleccionar mensaje inicial aleatoriamente
    const randomIndex = Math.floor(Math.random() * messageList.length)
    setCurrentMessage(messageList[randomIndex])

    // Cambiar mensaje cada 5 segundos
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * messageList.length)
        setCurrentMessage(messageList[randomIndex])
        setIsVisible(true)
      }, 300) // Pequeña pausa para la transición
      
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!currentMessage) {
    return (
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-2 px-2 sm:px-4 w-full text-center">
        <p className="font-semibold text-xs sm:text-sm">
          ¡Bienvenido a Papelería 4 Patitas!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-green-300 to-green-500 text-gray-800 py-1 px-2 sm:px-4 w-full text-center">
      <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
        {currentMessage.ref.startsWith('http') ? (
          <a
            href={currentMessage.ref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 hover:gap-3 transition-all duration-200 group"
          >
            <span className="font-semibold text-xs sm:text-sm group-hover:text-blue-700 transition-colors">
              {currentMessage.title}
            </span>
            <div className="bg-blue-500 hover:bg-blue-700 text-yellow-300 font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-full transition-all duration-200 group-hover:scale-105">
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </a>
        ) : (
          <Link
            href={currentMessage.ref}
            className="inline-flex items-center justify-center gap-2 hover:gap-3 transition-all duration-200 group"
          >
            <span className="font-semibold text-xs sm:text-sm group-hover:text-blue-700 transition-colors">
              {currentMessage.title}
            </span>
            <div className="bg-blue-500 hover:bg-blue-700 text-yellow-300 font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-full transition-all duration-200 group-hover:scale-105">
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}