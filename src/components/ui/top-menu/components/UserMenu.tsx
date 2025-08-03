'use client'

import { logout } from "@/actions"
import { getUser } from "@/config/token"
import { User } from "@/interfaces"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  IoPersonOutline,
  IoChevronDownOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoKeyOutline,
  IoPricetag,
  IoHeartOutline,
  IoSettingsOutline
} from "react-icons/io5"

interface MenuItem {
  title: string
  icon: React.ReactNode
  onClick: () => void
  color?: string
}

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  
  const isAuthenticated = !!user
  const isAdmin = user?.roles.includes('admin') || false

  useEffect(() => {
    // Cargar usuario solo en el cliente para evitar hydration mismatch
    const userData = getUser()
    setUser(userData)
    setIsLoaded(true)
  }, [])

  const authenticatedMenuItems: MenuItem[] = [
    {
      title: "Mi perfil",
      icon: <IoPersonOutline className="w-5 h-5 text-blue-600" />,
      onClick: () => {
        router.push('/profile')
        setIsOpen(false)
      }
    },
    {
      title: "Mis órdenes", 
      icon: <IoPricetag className="w-5 h-5 text-green-600" />,
      onClick: () => {
        router.push('/orders')
        setIsOpen(false)
      }
    },
    {
      title: "Lista de deseos",
      icon: <IoHeartOutline className="w-5 h-5 text-pink-600" />,
      onClick: () => {
        router.push('/wishlist')
        setIsOpen(false)
      }
    },
    {
      title: "Configuración",
      icon: <IoSettingsOutline className="w-5 h-5 text-gray-600" />,
      onClick: () => {
        router.push('/settings')
        setIsOpen(false)
      }
    },
    ...(isAdmin ? [{
      title: "Panel admin",
      icon: <IoKeyOutline className="w-5 h-5 text-purple-600" />,
      onClick: () => {
        router.push('/admin')
        setIsOpen(false)
      }
    }] : []),
    {
      title: "Cerrar sesión",
      icon: <IoLogOutOutline className="w-5 h-5 text-red-600" />,
      onClick: () => {
        logout()
        setIsOpen(false)
      },
      color: "text-red-600 hover:bg-red-50"
    }
  ]

  const guestMenuItems: MenuItem[] = [
    {
      title: "Iniciar sesión",
      icon: <IoLogInOutline className="w-5 h-5 text-green-600" />,
      onClick: () => {
        router.push('/auth/login')
        setIsOpen(false)
      }
    },
    {
      title: "Crear cuenta",
      icon: <IoPersonOutline className="w-5 h-5 text-blue-600" />,
      onClick: () => {
        router.push('/auth/new-account')
        setIsOpen(false)
      }
    }
  ]

  const menuItems = isAuthenticated ? authenticatedMenuItems : guestMenuItems

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 hover:border-gray-300"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <IoPersonOutline className="w-5 h-5 text-white" />
        </div>
        
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs text-gray-500">
            {isLoaded ? (isAuthenticated ? 'Hola,' : 'Bienvenido') : 'Cargando...'}
          </span>
          <span className="text-sm font-medium text-gray-800">
            {isLoaded ? (isAuthenticated ? user?.fullName || 'Mi cuenta' : 'Inicia sesión') : '...'}
          </span>
        </div>
        
        <IoChevronDownOutline 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-20 py-3">
            {/* User Info Header (solo si está autenticado) */}
            {isAuthenticated && user && (
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${item.color || 'text-gray-700'}`}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-medium">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}