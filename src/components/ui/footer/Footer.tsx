'use client'

import { useStoreStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoLogoTwitter, IoLogoYoutube, IoMailOutline, IoLocationOutline, IoPhonePortraitOutline, IoArrowForward, IoChevronDown } from "react-icons/io5"
import { useState } from "react"

export const Footer = () => {

  const { selectedStore } = useStoreStore()
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  return (
    <footer className="relative bg-gradient-to-br from-orange-100 via-blue-50 to-orange-200 border-t border-blue-200/50 mt-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 lg:py-16">
          
          {/* Branding Section - Stays consistent */}
          <div className="md:col-span-2 lg:col-span-1 text-center lg:text-left">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 h-full">
              <Link href="/" className="inline-block group">
                <Image
                  src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1754187054/Ads/Logos/Logo_Alto_pn2cf3.svg"
                  alt="Papelería 4 Patitas"
                  width={200}
                  height={50}
                  className="w-44 lg:w-52 h-auto mx-auto lg:mx-0 group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                Todo lo que necesitas para <span className="font-bold text-red-500">crear</span>, <span className="font-bold text-blue-500">regalar</span> y <span className="font-bold text-green-500">celebrar</span>.
              </p>
              
              <div className="flex justify-center lg:justify-start mt-6 space-x-3">
                <SocialIcon href="https://facebook.com" icon={<IoLogoFacebook size={20}/>} bgColor="bg-blue-600" hoverColor="hover:bg-blue-700" />
                <SocialIcon href="https://instagram.com" icon={<IoLogoInstagram size={20}/>} bgColor="bg-gradient-to-r from-purple-500 to-pink-500" hoverColor="hover:from-purple-600 hover:to-pink-600" />
                <SocialIcon href="https://twitter.com" icon={<IoLogoTwitter size={20}/>} bgColor="bg-sky-500" hoverColor="hover:bg-sky-600" />
                <SocialIcon href="https://tiktok.com" icon={<IoLogoTiktok size={20}/>} bgColor="bg-black" hoverColor="hover:bg-gray-800" />
                <SocialIcon href="https://youtube.com" icon={<IoLogoYoutube size={20}/>} bgColor="bg-red-600" hoverColor="hover:bg-red-700" />
              </div>
            </div>
          </div>

          {/* Navigation & Legal - Accordion on Mobile */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccordionCard
                title="Navegación"
                icon={<span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>}
                name="navigation"
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
              >
              <FooterLink href="/" title="Inicio" />
              <FooterLink href="/productos" title="Productos" />
              <FooterLink href="/category/ofertas" title="Ofertas" />
              <FooterLink href="/nosotros" title="Sobre Nosotros" />
              <FooterLink href="/contacto" title="Contacto" />
            </AccordionCard>

            <AccordionCard
              title="Legal"
              icon={<span className="w-2 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></span>}
              name="legal"
              openAccordion={openAccordion}
              setOpenAccordion={setOpenAccordion}
            >
              <FooterLink href="/legal/terminos" title="Términos y Condiciones" />
              <FooterLink href="/legal/privacidad" title="Aviso de Privacidad" />
              <FooterLink href="/legal/cookies" title="Política de Cookies" />
              <FooterLink href="/faq" title="Preguntas Frecuentes" />
            </AccordionCard>
          </div>

          {/* Contact Card - Stays consistent */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-2xl border border-blue-400/30 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2 text-blue-100">📍 Visítanos</h3>
                <p className="text-blue-200 text-sm mb-6">Información de contacto</p>
                
                {selectedStore ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <p className="font-bold text-white text-lg">{selectedStore.name}</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <ContactItem icon={<IoLocationOutline className="w-5 h-5 text-blue-300"/>} text={selectedStore.address} />
                      {selectedStore.phone && <ContactItem icon={<IoPhonePortraitOutline className="w-5 h-5 text-blue-300"/>} text={selectedStore.phone} />}
                      {selectedStore.email && <ContactItem icon={<IoMailOutline className="w-5 h-5 text-blue-300"/>} text={selectedStore.email} />}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IoLocationOutline className="w-8 h-8 text-blue-300"/>
                    </div>
                    <p className="text-blue-200 text-sm">Selecciona una tienda para ver la información.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sub-footer */}
        <div className="py-6 border-t border-white/30 bg-white/30 backdrop-blur-sm rounded-t-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-sm text-gray-700 space-y-3 sm:space-y-0 px-4">
            <p className="font-medium text-gray-600">
              &copy; {new Date().getFullYear()} Papelería 4 Patitas. Todos los derechos reservados.
            </p>
            <a 
              href="https://vicctor-romero.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center group"
            >
              <span className="font-normal mr-2">Website by</span>
              <span className="font-bold text-blue-600 group-hover:underline">Victor Romero</span>
              <IoArrowForward className="w-4 h-4 ml-1.5 text-blue-600 group-hover:translate-x-1 transition-transform"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const AccordionCard = ({ title, icon, children, name, openAccordion, setOpenAccordion }: { title: string, icon: React.ReactNode, children: React.ReactNode, name: string, openAccordion: string | null, setOpenAccordion: (name: string | null) => void }) => {
  const isOpen = openAccordion === name;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md border border-white/30 lg:hover:shadow-lg transition-all duration-300 lg:p-6">
      <button
        onClick={() => setOpenAccordion(isOpen ? null : name)}
        className="flex justify-between items-center w-full text-left p-4 lg:p-0 lg:pointer-events-none"
      >
        <h3 className="font-bold text-gray-800 flex items-center text-lg lg:text-xl">
          {icon}
          {title}
        </h3>
        <IoChevronDown
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 lg:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        } lg:grid-rows-[1fr] lg:opacity-100`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 lg:p-0 lg:mt-6">
            <ul className="space-y-3 text-sm md:text-base">{children}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};


const ContactItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors">
    {icon}
    <span className="text-white/90 leading-relaxed">{text}</span>
  </div>
)

const FooterLink = ({ href, title }: { href: string, title: string }) => (
  <li>
    <Link 
      href={href} 
      className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 flex items-center group font-medium"
    >
      <IoArrowForward className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"/>
      {title}
    </Link>
  </li>
)

const SocialIcon = ({ href, icon, bgColor, hoverColor }: { href: string, icon: React.ReactNode, bgColor: string, hoverColor: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`${bgColor} ${hoverColor} text-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:-translate-y-1`}
  >
    {icon}
  </a>
)