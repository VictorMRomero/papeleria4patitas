'use client'

import { Category } from "@/interfaces"
import { AnnouncementBar } from "@/components/ui/top-menu/components/AnnouncementBar"
import { MainHeader } from "@/components/ui/top-menu/components/MainHeader"  
import { NavigationBar } from "@/components/ui/top-menu/components/NavigationBar"

interface Props {
  className?: string
  categorias: Category[]
}

export const TopMenu = ({ className = '', categorias }: Props) => {
  return (
    <div className={className}>
      <AnnouncementBar />
      <MainHeader />
      <NavigationBar categorias={categorias} />
    </div>
  )
}