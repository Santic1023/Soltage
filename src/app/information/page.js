'use client';
import Image from "next/image";
import Head from "next/head";
import Link from "next/link"; // Importa el componente Link
import React, { useEffect, useRef } from 'react';
import PieChart from "@/components/PieChart";
import CSVCharts from "@/components/CSVCharts";
import LineChart from "@/components/LineChart";
import AreaChart from "@/components/AreaChart";

export default function Graficos() {
  return (
    <>
      <Head>
        <title>Gráficos - Soltage</title>
        <link rel="icon" href="/media/favicon.ico" />
      </Head>
      <main className="bg-[#0d1117] text-white font-sans leading-relaxed">
        {/* Header */}
        <nav className="fixed top-0 left-0 w-full flex justify-end p-4 space-x-4 z-50">
          <Link href="/">
            <button className="bg-white text-gray-800 font-medium px-4 py-2 rounded-full shadow hover:bg-gray-100 transition">
              Inicio
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
                      src="/media/Graficos.png"
                      alt="Img Graficis"
                      width={600}
                      height={600}
                      className="mb-2 animate-fadeInUp"
          />
          <h1 className="text-4xl font-bold">Gráficos e Información</h1>
          <p className="mt-4 text-lg">
            Visualiza datos importantes sobre energía renovable y sostenibilidad.
          </p>
        </header>

        {/* Contenido */}
        <section className="p-10 max-w-[1700px] mx-auto">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">

            {/* Gráfico 1 */}
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <div className="p-5">
                <h2 className="text-xl text-blue-500 font-bold mb-3">Producción de Energía Renovable por Fuentes</h2>
                <p className="text-gray-300 mt-3">
                  Este gráfico visualiza la cantidad de energía generada a lo largo del tiempo por cada una de las fuentes de energía renovable disponibles.
                </p>
                <CSVCharts />
              </div>
            </article>

            {/* Gráfico 2 */}
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <div className="p-5">
                <h2 className="text-xl text-blue-500 font-bold mb-3">Participación de Energías Renovables</h2>
                <p className="text-gray-300 mt-3">
                  Este gráfico representa la proporción que aporta cada tipo de energía renovable al consumo total de electricidad.
                </p>
                
                <PieChart />

              </div>
            </article>

            {/* Gráfico 3 */}
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <div className="p-5">
                <h2 className="text-xl text-blue-500 font-bold mb-3">Tendencia en la Capacidad Instalada</h2>
                <p className="text-gray-300 mt-3">
                  Este gráfico muestra cómo ha evolucionado la capacidad instalada de cada fuente de energía renovable a lo largo del tiempo.
                </p>
                
                <LineChart />

              </div>
            </article>

            {/* Gráfico 4 */}
            <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition">
              <div className="p-5">
                <h2 className="text-xl text-blue-500 font-bold mb-3"> Comparación entre Consumo de Energía Renovables por Tipo</h2>
                <p className="text-gray-300 mt-3">
                  Este gráfico compara el consumo de energías renovables a lo largo del tiempo por el tipo de producción.
                </p>
                
                <AreaChart />

              </div>
            </article>

          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-0 mt-10">
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline">Inicio</a>
            <a href="#contact" className="hover:underline">Contacto</a>
          </nav>
          <p className="mt-2">&copy; 2025 Soltage. Todos los derechos reservados.</p>
        </footer>
      </main>
      
    </>
  );
}