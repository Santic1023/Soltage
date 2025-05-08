'use client';
import Image from "next/image";
import Head from "next/head";
import Link from "next/link"; // Importa el "Link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Soltage</title>
        <link rel="icon" href="public/favicon.ico"/>
      </Head>
      <main className="bg-[#0d1117] text-white font-sans leading-relaxed">
        {/* Header */}
        <nav className="fixed top-0 left-0 w-full flex justify-end p-4 space-x-4 z-50">
          <Link href="/information">
            <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
              Información
            </button>
          </Link>
          <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
            Servicios
          </button>
          <Link href="/contact">
            <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
              Contacto
            </button>
          </Link>
        </nav>
        <header className="h-screen bg-gradient-to-br from-[#00b894] to-[#0984e3] flex flex-col justify-center items-center text-center p-5">
          <Image
            src="/media/SoltageICON.png"
            alt="Logo Soltage"
            width={400}
            height={400}
            className="mb-2 animate-fadeInUp"
          />
        </header>

        {/* Contenido cartas con graficos */}
        <section className="p-10 max-w-[1200px] mx-auto">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <Image
                src="/media/PanelesSolares.png"
                alt="Imagen 1"
                width={400}
                height={400}
                className="w-full h-[400px] object-none"
              />
              <h2 className="text-xl text-blue-500 m-5 font-bold">¿Qué son las energías renovables y por qué son el futuro?</h2>
              <p className="text-gray-300 mx-5 mb-5">
                Las energías renovables son formas de obtener electricidad usando la naturaleza, como la luz del sol, 
                el viento o el agua. A diferencia de otras fuentes de energía, no contaminan el aire ni se acaban con el tiempo. 
                Son importantes porque ayudan a cuidar el planeta y a tener una energía más limpia y económica para todos. Por eso, 
                muchas personas creen que son el camino hacia un futuro mejor.
              </p>
            </article>
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <Image
                src="/media/Familia-solar.png"
                alt="Imagen 2"
                width={400}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <h2 className="text-xl text-blue-500 m-5 font-bold">Beneficios económicos y ambientales de las energías limpias</h2>
              <p className="text-gray-300 mx-5 mb-5">
                Las energías limpias son beneficiosas tanto para la economía como para el medio ambiente. Económicamente, pueden reducir 
                los costos a largo plazo, ya que el sol y el viento son gratuitos. También crean empleos en áreas como la instalación y 
                mantenimiento de equipos. Ambientalmente, ayudan a reducir la contaminación y las emisiones de gases dañinos, lo que combate 
                el cambio climático y mejora la salud del planeta.
              </p>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-0 mt-10">
          <nav className="space-x-4 text-sm">
            <a href="https://www.larepublica.co/energia-solar" className="hover:underline">Noticias</a>
            <a href="#" className="hover:underline">Contacto</a>
            <a href="#equipo" className="hover:underline">Equipo</a>
          </nav>
          <p className="mt-2">&copy; 2025 Soltage. Todos los derechos reservados.</p>
        </footer>
      </main>
    </>
  );
}

