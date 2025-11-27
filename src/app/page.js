'use client';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#0d1117] text-white font-sans leading-relaxed">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full flex justify-end p-4 space-x-4 z-50">
        <Link href="/information" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Gráficos
        </Link>
        <Link href="/estimation" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Estimación
        </Link>
        <Link href="/contact" className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
          Contacto
        </Link>
      </nav>

      <header className="h-screen bg-gradient-to-br from-[#00b894] to-[#0984e3] flex flex-col justify-center items-center text-center p-5">
        <Image
          src="/media/SoltageICON.png"
          alt="Logo Soltage"
          width={300}
          height={300}
          priority
          className="mb-2 animate-fadeInUp"
        />
      </header>

      {/* Contenido cartas con graficos */}
      <section className="p-10 max-w-[1200px] mx-auto">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
            <div className="relative w-full h-[300px]">
              <Image
                src="/media/PanelesSolares.png"
                alt="Paneles Solares"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h2 className="text-xl text-blue-500 m-5 font-bold">¿Qué son las energías renovables y por qué son el futuro?</h2>
            <p className="text-gray-300 mx-5 mb-5">
              Las energías renovables son formas de obtener electricidad usando la naturaleza, como la luz del sol, 
              el viento o el agua. A diferencia de otras fuentes de energía, no contaminan el aire ni se acaban con el tiempo. 
              Son importantes porque ayudan a cuidar el planeta y a tener una energía más limpia y económica para todos.
            </p>
          </article>
          <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
            <div className="relative w-full h-[300px]">
              <Image
                src="/media/Familia-solar.png"
                alt="Familia Solar"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <h2 className="text-xl text-blue-500 m-5 font-bold">Beneficios económicos y ambientales de las energías limpias</h2>
            <p className="text-gray-300 mx-5 mb-5">
              Las energías limpias son beneficiosas tanto para la economía como para el medio ambiente. Económicamente, pueden reducir 
              los costos a largo plazo, ya que el sol y el viento son gratuitos. También crean empleos en áreas como la instalación y 
              mantenimiento de equipos.
            </p>
          </article>
        </div>
        <div className="mt-8">
          <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition max-w-4xl mx-auto">
            <div className="p-8">
              <h2 className="text-xl text-blue-500 font-bold mb-4">El Futuro de la Energía Renovable</h2>
              <p className="text-gray-300 mb-4">
                El futuro de la energía renovable es prometedor y está en constante evolución. Con avances tecnológicos significativos y 
                una creciente conciencia ambiental, estamos presenciando una transformación en la forma en que generamos y consumimos energía.
              </p>
              <p className="text-gray-300 mb-4">
                La innovación en tecnologías de almacenamiento, la mejora en la eficiencia de los paneles solares y las turbinas eólicas, 
                y el desarrollo de nuevas fuentes de energía renovable están impulsando esta revolución energética.
              </p>
              <p className="text-gray-300">
                Además, la integración de sistemas inteligentes y la digitalización de las redes eléctricas están permitiendo una gestión 
                más eficiente de la energía renovable, facilitando su adopción a gran escala.
              </p>
            </div>
          </article>
        </div>
        <div className="mt-8">
          <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition max-w-4xl mx-auto ">
          <h2 className="text-xl text-blue-500 m-5 font-bold">🔋 ¿Sabías que…?</h2>
            <p className="text-gray-300 m-5">
              El sol envía a la Tierra más energía en una hora de la que usamos en todo un año.
              ¡Y aún no aprovechamos ni una fracción de ella!
            </p>
            <p className="text-gray-300 m-5">
              Las turbinas eólicas modernas pueden alimentar hasta 1.500 hogares al año.
              Solo una turbina… ¡imagina un parque entero!
            </p>
            <p className="text-gray-300 m-5">
              Islandia produce casi el 100% de su energía con fuentes renovables.
              Principalmente con energía geotérmica e hidroeléctrica.
            </p>
            <p className="text-gray-300 m-5">
              La energía renovable genera más empleos que los combustibles fósiles.
              La transición verde también impulsa la economía.
            </p>
            <p className="text-gray-300 m-5">
              La primera célula solar fue creada en 1954.
              ¡Y desde entonces no ha parado de evolucionar!
            </p>
            <p className="text-gray-300 m-5">
              Los paneles solares pueden funcionar incluso en días nublados.
              Solo necesitan luz, no calor.
            </p>
            <p className="text-gray-300 m-5">
              Un rayo puede contener hasta mil millones de julios de energía.
              Suficiente para abastecer una casa por casi un mes… si pudiéramos captarla.
            </p>
            <p className="text-gray-300 m-5">
              Las algas también pueden producir biocombustibles.
              Son una alternativa prometedora al petróleo.
            </p>
            <p className="text-gray-300 m-5">
              El reciclaje de turbinas eólicas ya es una industria en crecimiento.
              ¡Incluso sus aspas están empezando a reutilizarse!
            </p>
            <p className="text-gray-300 m-5">
              China es el país que más invierte en energías renovables.
              Y lidera la producción mundial de paneles solares.
            </p>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <nav className="space-x-4 text-sm">
          <Link href="https://www.larepublica.co/energia-solar" className="hover:underline">Noticias</Link>
          <Link href="/contact" className="hover:underline">Contacto</Link>
        </nav>
        <p className="mt-2">&copy; {new Date().getFullYear()} Soltage. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
