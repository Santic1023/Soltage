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
        <link rel="icon" href="/media/favicon.ico" />
      </Head>

      <main className="bg-[#0d1117] text-white font-sans min-h-screen flex flex-col">
        {/* Header con botones */}
        <header className="sticky top-0 z-50 bg-gradient-to-br from-[#00b894] to-[#0984e3] text-white text-center shadow-md">
        <div className="flex justify-end space-x-4 px-4 py-2">
            <Link href="/">
            <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                Inicio
            </button>
            </Link>
            <Link href="/graficos">
            <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition">
                Gráficos
            </button>
            </Link>
        </div>
        <div className="pb-4 px-4">
            <h1 className="text-2xl font-semibold">Nuestro Equipo</h1>
            <p className="mt-1 text-base">Conoce a los participantes del proyecto Soltage</p>
        </div>
        </header>

        {/* Contenido principal */}
        <section className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
          {[
            {
              nombre: "Santiago Cobaleda",
              rol: "Lider de Proyecto",
              correo: "santic1023@example.com",
              imagen: "/media/user1.png",
              GitHub: "Santic1023"
            },
            {
              nombre: "Laura Gómez",
              rol: "Diseñadora UI/UX",
              correo: "laura.gomez@example.com",
              imagen: "/media/user2.png",
              GitHub: ""
            },
            {
              nombre: "Carlos Ramírez",
              rol: "Analista de Datos",
              correo: "carlos.ramirez@example.com",
              imagen: "/media/user3.png",
              GitHub: ""
            },
          ].map((p, i) => (
            <article
              key={i}
              className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition text-center"
            >
              <Image
                src={p.imagen}
                alt={`Foto de ${p.nombre}`}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-blue-400">{p.nombre}</h2>
              <h3 className="text-sm text-gray-300 mb-2">{p.rol}</h3>
              <p className="text-sm text-gray-400 mb-2">{p.GitHub}</p>
              <a href={`mailto:${p.correo}`} className="text-sm text-blue-300 hover:underline">
                {p.correo}
              </a>
            </article>
          ))}
        </section>

        {/* Footer fijo al fondo del layout */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Soltage. Todos los derechos reservados.</p>
        </footer>
      </main>
    </>
  );
}
