import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Nosotros(){

    return(
        <>
            <div className="mt-5 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex">
                    <Image 
                        src={`https://res.cloudinary.com/dog6zhxr8/image/upload/v1705976514/fcevcdzyni9ragvy8gaq.svg`}
                        width={600}
                        height={600}
                        style={{
                            width: '100vw',
                            height: '500px'
                        }}
                        alt="team"
                        className=""
                    />
                </div>
                <div className="mt-auto mb-auto px-5 ">
                    <span className={`${titleFont.className} text-xl antialiased font-bold mt-4 mb-4`}> Acerca de Nosotros</span>
                    <br />
                    <br />
                    <span className={`${titleFont.className} text-pretty text-xl antialiased`}>
                        En papelería 4 patitas nos apasiona poder brindarles todas las herramientas necesarias para liberar su imaginación, con productos para niños de 3 a 99 años, porque estamos seguros de que cada uno de nosotros tiene un niño interior que quiere divertirse.
                        <br />
                        <br />
                        Esperamos que cada cliente encuentre lo que necesita, brindando una experiencia enriquecedora y única, más allá del simple hecho de adquirir algún producto.
                        <br />
                        <br />
                        Papelería 4 patitas se enorgullece de saber que con nuestros productos puedes hacer realidad tus ideas, por eso somos más que una papelería, somos constructores de ideas.
                    </span>
                </div>
            </div>
        </>
    )
}