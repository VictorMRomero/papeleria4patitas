import { titleFont } from '@/config/fonts'


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
           <h1 className={`${titleFont.className}`}>Login Page</h1>
    </div>
  )
}
