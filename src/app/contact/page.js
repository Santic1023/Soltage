'use client';
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Participantes() {
  return (
    <>
      <Head>
        <title>Equipo - Soltage</title>
      </Head>

      <main className="min-h-screen bg-[#0d1117] text-white font-sans flex flex-col">
        {/* Header con botones */}
        <header className="sticky top-0 z-50 bg-gradient-to-br from-[#00b894] to-[#0984e3] text-white shadow-lg">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <div className="flex-1"></div>
              <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold tracking-wide">Nuestro Equipo</h1>
                <p className="text-xl text-gray-100 mt-2">Conoce a los participantes del proyecto Soltage</p>
              </div>
              <div className="flex-1 flex justify-end space-x-4">
                <Link href="/">
                  <button className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
                    Inicio
                  </button>
                </Link>
                <Link href="/information">
                  <button className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
                    Gráficos
                  </button>
                </Link>
                <Link href="/estimation">
                  <button className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
                    Estimación
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  nombre: "Santiago Cobaleda Monsalve",
                  rol: "Lider de Proyecto",
                  correo: "santic1023@gmail.com",
                  imagen: "/media/user1.png",
                  GitHub: "Santic1023"
                },
                {
                  nombre: "Edgar Dario Pérez Zapata",
                  rol: "Integrador",
                  correo: "",
                  imagen: "/media/user2.png",
                  GitHub: "Beleth10"
                },
                {
                  nombre: "Camila Arbelaez Corrales",
                  rol: "Explorador 1",
                  correo: "Camilaarbelaezcorrales@gmail.com",
                  imagen: "/media/user3.png",
                  GitHub: "Camila09-ctrl"
                },
              ].map((p, i) => (
                <article
                  key={i}
                  className="bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center border border-gray-700"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={p.imagen}
                      alt={`Foto de ${p.nombre}`}
                      fill
                      className="rounded-full object-cover border-4 border-blue-500"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-400 mb-2">{p.nombre}</h2>
                  <h3 className="text-lg text-gray-300 mb-4">{p.rol}</h3>
                  <div className="flex justify-center items-center mb-4 space-x-2">
                    <Image
                      src="/media/GitHub.png"
                      alt="GitHub Logo"
                      width={24}
                      height={24}
                      className="opacity-80"
                    />
                    <p className="text-gray-400">{p.GitHub}</p>
                  </div>
                  <a 
                    href={`mailto:${p.correo}`} 
                    className="text-blue-300 hover:text-blue-400 transition duration-300 inline-block"
                  >
                    {p.correo}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <nav className="space-x-4 text-sm">
          <Link href="." className="hover:underline">Inicio</Link>
          <Link href="https://www.larepublica.co/energia-solar" className="hover:underline">Noticias</Link>
        </nav>
        <p className="mt-2">&copy; {new Date().getFullYear()} Soltage. Todos los derechos reservados.</p>
      </footer>
      </main>
    </>
  );
}
