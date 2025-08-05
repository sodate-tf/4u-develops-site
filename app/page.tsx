"use client";

import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Menu,
  X,
  Settings,
  Smartphone,
  ShoppingCart,
  Layers,
  Brain,
  MessageCircle,
  ComputerIcon,
} from 'lucide-react';
import logo from "@/public/logo-4u.png" // O logo é importado como um módulo

// Define a interface para o tipo de objeto "dot" usado na animação de fundo.
interface Dot {
  id: number;
  opacity: number;
  size: number;
  delay: number;
}

// Define a interface para os dados de um projeto no portfólio.
interface Project {
  title: string;
  description: string;
  mainImage: string;
  screenshots: string[];
}

export default function Home() {
  // Tipagem do estado para o menu: booleano
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Tipagem do estado para os pontos: um array de objetos do tipo Dot
  const [dots, setDots] = useState<Dot[]>([]);
  // Tipagem do estado para o texto de digitação
  const [typedText, setTypedText] = useState<string>('');
  // Tipagem do estado para o modal: booleano
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Tipagem do estado para o projeto selecionado no modal, pode ser nulo
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dados de exemplo para os projetos do portfólio.
  // Agora usamos caminhos diretos para as imagens na pasta `public`.
  const projects: Project[] = [
    {
      title: "E-commerce Personalizado",
      description: "Plataforma online multifuncional, desenvolvida para conectar e apoiar a comunidade estudantil. Ele integra uma loja de materiais de estudo, permitindo a compra e venda de conteúdos relevantes, com a capacidade de otimizar cada produto para mecanismos de busca através de tags de SEO personalizáveis.",
      mainImage: "/modelo-academico3.png",
      screenshots: [
        "/modelo-academico1.png",
        "/modelo-academico2.png",
      ],
    },
    {
      title: "Sistema Gerenciador de acampamentos",
      description: "O Sistema Gerenciador de Acampamentos é uma plataforma digital completa projetada para simplificar e otimizar a administração de acampamentos. Desde a ficha de pré inscrição até o gerenciamento operacional do acmpamento",
      mainImage: "/bento-app2.png",
      screenshots: [
        "/bento-app1.png",
        "/bento-app2.png",
      ],
    },
    {
      title: "Agente de IA",
      description: "O Tio Ben é um aplicativo mobile. Um agente de IA programado para responder perguntas enviada pelos usuários respeitando sempre a personalidade e configuração pré determinada.",
      mainImage: "/tio-ben-app.png",
      screenshots: [
        "/tio-ben-app.png",
      ],
    },
     {
      title: "Sistema de PDV",
      description: "Sistema de vendas feito com Apps Script utilizando Google Sheets como base. Tornando uma ferramenta de gerenciamento de vendas simples e acessível para pequenos comerciantes. Já integrada com e-mail e geração de relatórios gerenciais",
      mainImage: "/sistema-pdv1.png",
      screenshots: [
        "/sistema-pdv2.png",
        "/sistema-pdv3.png",
      ],
    },
  ];

  // Função para abrir o modal com os dados do projeto
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Função para rolagem suave via JavaScript
  // Adiciona a tipagem do evento (MouseEvent) e do targetId (string)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsMenuOpen(false); // Fecha o menu mobile após o clique
    }
  };

  // Referências para os elementos a serem animados
  // Adiciona a tipagem do useRef para HTMLDivElement ou null
  const animatedRefs = {
    hero: useRef<HTMLDivElement | null>(null),
    about: useRef<HTMLDivElement | null>(null),
    services: useRef<HTMLDivElement | null>(null),
    portfolio: useRef<HTMLDivElement | null>(null),
    contact: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      {
        root: null, // Observa o viewport
        rootMargin: '0px',
        threshold: 0.1, // Dispara quando 10% do elemento está visível
      }
    );

    // Adiciona o observador a cada elemento
    Object.values(animatedRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Limpa os observadores ao desmontar o componente
      Object.values(animatedRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Efeito para criar e animar os pontos no background
  useEffect(() => {
    // Configuração do grid de pontos
    const rows = 15;
    const cols = 25;
    const totalDots = rows * cols;
    // O array inicial agora é tipado como Dot[]
    const initialDots: Dot[] = Array.from({ length: totalDots }, (_, i) => ({
      id: i,
      opacity: 0,
      size: 0,
      delay: Math.random() * 2000, // Atraso aleatório para animação
    }));
    setDots(initialDots);

    const interval = setInterval(() => {
      setDots(prevDots =>
        prevDots.map(dot => ({
          ...dot,
          opacity: Math.random() * 0.5 + 0.1, // Opacidade entre 0.1 e 0.6
          size: Math.random() * 3 + 1, // Tamanho entre 1px e 4px
        }))
      );
    }, 1500); // Intervalo de 1.5 segundos para mudar os pontos

    return () => clearInterval(interval);
  }, []);

  // Efeito para a animação de digitação
  useEffect(() => {
    const words = ['<code_block>'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Define a velocidade da digitação
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 2000; // Tempo de pausa antes de deletar

    const handleTyping = () => {
      const currentWord = words[wordIndex];
      // Se não estiver deletando, adiciona uma letra
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      } else {
        // Se estiver deletando, remove uma letra
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      }

      // Muda o estado para deletar se a palavra estiver completa
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(() => handleTyping(), pauseTime); // Pausa antes de deletar
        return;
      }

      // Muda o estado para digitar se a palavra estiver vazia
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(handleTyping, speed);
    };

    // Inicia a animação de digitação
    setTimeout(handleTyping, typingSpeed);

  }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez

  return (
    <>
      <Head>
        {/* Título e meta tags otimizadas para SEO */}
        <title>4U Develops | Inove. Desenvolva. Evolua.</title>
        <meta
          name="description"
          content="Desenvolvimento de sistemas e sites acessíveis e sem enrolação. Soluções práticas e úteis que realmente vendem. Inove, Desenvolva, Evolua."
        />
        <meta
          name="keywords"
          content="desenvolvimento de sistemas, desenvolvimento de sites, sistemas acessíveis, sem enrolação, automação, IA, inteligência artificial, e-commerce, 4U Develops"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Adiciona CSS para rolagem suave e animações */}
        <style>
          {`
            html {
              scroll-behavior: smooth;
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.5s ease-out forwards;
              animation-fill-mode: both;
            }
            .animated-element {
              opacity: 0;
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes bounce-slow {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-5px);
              }
            }
            .animate-bounce-slow {
              animation: bounce-slow 2s infinite ease-in-out;
            }
            @keyframes slide-down {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-down {
              animation: slide-down 0.3s ease-out forwards;
            }
            @keyframes cursor-blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .animate-cursor-blink {
              animation: cursor-blink 1s step-end infinite;
            }
            .modal-bg {
              background-color: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(8px);
            }
            .modal-content {
              animation: modal-fade-in 0.3s ease-out forwards;
            }
            @keyframes modal-fade-in {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}
        </style>
      </Head>

      <main className="bg-gray-950 text-white font-sans overflow-x-hidden">
        {/* Navbar */}
        <nav className="fixed w-full z-50 bg-gray-950 bg-opacity-80 backdrop-blur-lg border-b border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo e nome da empresa */}
            <a href="#" className="flex items-center text-white">
              <Image src={logo} width={32} className='mr-2' alt="4U - Inove. Desenvolva. Evolua." />
              <span className="font-bold text-2xl drop-shadow-[0_0_5px_rgba(0,255,102,0.5)]"> Develops</span>
            </a>
            {/* Menu Desktop */}
            <div className="hidden md:flex space-x-6">
              <a href="#sobre" onClick={(e) => handleSmoothScroll(e, 'sobre')} className="hover:text-[#00FF66] transition">Sobre</a>
              <a href="#servicos" onClick={(e) => handleSmoothScroll(e, 'servicos')} className="hover:text-[#00FF66] transition">Serviços</a>
              <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, 'portfolio')} className="hover:text-[#00FF66] transition">Portfólio</a>
              <a href="#contato" onClick={(e) => handleSmoothScroll(e, 'contato')} className="hover:text-[#00FF66] transition">Contato</a>
            </div>
            {/* Botão do Menu Hamburger Mobile */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 border-t border-gray-800 mt-4 animate-slide-down">
              <a href="#sobre" onClick={(e) => handleSmoothScroll(e, 'sobre')} className="block py-4 px-6 hover:bg-gray-800 transition">Sobre</a>
              <a href="#servicos" onClick={(e) => handleSmoothScroll(e, 'servicos')} className="block py-4 px-6 hover:bg-gray-800 transition">Serviços</a>
              <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, 'portfolio')} className="block py-4 px-6 hover:bg-gray-800 transition">Portfólio</a>
              <a href="#contato" onClick={(e) => handleSmoothScroll(e, 'contato')} className="block py-4 px-6 hover:bg-gray-800 transition">Contato</a>
            </div>
          )}
        </nav>

        {/* Seção Hero - Layout assimétrico e moderno */}
        <section ref={animatedRefs.hero} className="min-h-screen flex items-center bg-black pt-20 animated-element">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-24">
            <div className="flex flex-col justify-center text-left">
              {/* Título principal e slogan da empresa */}
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight text-white drop-shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                Inove. Desenvolva. Evolua.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Soluções digitais que funcionam de verdade. Sem enrolação, sem termos técnicos, apenas resultados práticos e um produto de qualidade que gera vendas.
              </p>
              <a
                href="#servicos"
                onClick={(e) => handleSmoothScroll(e, 'servicos')}
                className="bg-[#00FF66] text-gray-900 py-4 px-10 rounded-full font-bold shadow-xl self-start
                  hover:bg-[#32cd6d] transition-all duration-300 transform hover:scale-105"
              >
                Conheça nossos serviços
              </a>
            </div>
            <div className="flex justify-center items-center">
              {/* Contêiner para a animação de background e o conteúdo */}
              <div className="w-full h-[450px] md:h-[550px] bg-gray-900 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center border border-gray-800">
                {/* Animação de fundo com pontos pulsantes */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/20 to-[#3B82F6]/20 grid place-items-center"
                  style={{ gridTemplateColumns: 'repeat(25, 1fr)', gridTemplateRows: 'repeat(15, 1fr)' }}
                >
                  {dots.map(dot => (
                    <div
                      key={dot.id}
                      className="rounded-full bg-[#00FF66] transition-all duration-1000"
                      style={{
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: dot.opacity,
                      }}
                    ></div>
                  ))}
                </div>
                {/* Conteúdo da seção Hero */}
                <div className="relative text-white z-10 text-center">
                  <span className="text-3xl font-mono text-[#00FF66] animate-fade-in-down">
                    {typedText}
                    {/* Adiciona um cursor piscando */}
                    <span className="animate-cursor-blink">|</span>
                  </span>
                  <p className="mt-4 text-gray-400">
                    A arte da programação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Sobre Nós - com novo texto que enfatiza a experiência comercial */}
        <section ref={animatedRefs.about} id="sobre" className="bg-gray-950 py-24 px-6 animated-element">
          <div className="max-w-7xl mx-auto text-center rounded-3xl p-12 bg-gray-900 border border-gray-800">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00FF66]">Nossa História e Missão</h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              Com quase uma década de experiência na área comercial, entendo a necessidade do empresário. Minha missão é traduzir essa visão em soluções tecnológicas que realmente são úteis no dia a dia, geram vendas e, principalmente, não dão dor de cabeça. Entrego produtos de qualidade, com usabilidade e beleza, mas sempre com foco na praticidade e no seu resultado.
            </p>
          </div>
        </section>

        {/* Seção Serviços - novo layout de grid */}
        <section ref={animatedRefs.services} id="servicos" className="py-24 px-6 bg-black animated-element">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Serviços que Transformam</h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Desenvolvimento Web", desc: "Sites e plataformas sob medida, com foco em performance e escalabilidade.", icon: <ComputerIcon size={36} /> },
                { title: "Automação de Processos", desc: "Criamos automações para economizar tempo e reduzir erros, com foco em produtividade.", icon: <Settings size={36} /> },
                { title: "Soluções Mobile", desc: "Aplicativos híbridos ou nativos que conectam sua empresa com o mundo mobile.", icon: <Smartphone size={36} /> },
                { title: "E-commerces", desc: "Lojas virtuais completas e integradas para alavancar suas vendas online.", icon: <ShoppingCart size={36} /> },
                { title: "Planilhas Avançadas", desc: "Soluções inteligentes usando Google Apps Script para automatizar planilhas.", icon: <Layers size={36} /> },
                { title: "Inteligência Artificial", desc: "Automatizamos decisões com IA personalizada para cada negócio.", icon: <Brain size={36} /> },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 p-8 rounded-2xl border border-gray-800 relative group
                               transform transition-all duration-300 hover:scale-105 hover:border-[#3B82F6]"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FF66]/10 via-transparent to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-4xl text-[#00FF66] mb-4">
                      {item.icon}
                    </span>
                    <h3 className="text-2xl font-semibold mb-2 text-white text-center">{item.title}</h3>
                    <p className="text-gray-400 text-center">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Portfólio - grid minimalista */}
        <section ref={animatedRefs.portfolio} id="portfolio" className="bg-gray-950 py-24 px-6 animated-element">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">Projetos Recentes</h2>
            <p className="text-gray-400 text-xl mb-16 max-w-4xl mx-auto">
              Veja como nossa paixão por inovação se traduz em resultados reais para nossos clientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => openModal(project)}
                  className="relative group rounded-xl overflow-hidden shadow-2xl border border-gray-800 cursor-pointer
                               focus:outline-none focus:ring-4 focus:ring-[#00FF66]/50 transition-all duration-300"
                >
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold">{project.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Contato - CTA com fundo escuro e detalhes visuais */}
        <section ref={animatedRefs.contact} id="contato" className="py-24 px-6 bg-black animated-element">
          <div className="max-w-xl mx-auto text-center border-t border-gray-800 pt-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Vamos Conversar?</h2>
            <p className="text-gray-400 text-xl mb-8 max-w-lg mx-auto">
              Se você tem um problema, eu tenho a solução. Sem complicação, sem termos técnicos.
            </p>
            <a
              href="https://wa.me/5518991631099"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#00FF66] text-gray-900 py-4 px-10 rounded-full font-bold shadow-xl
                               hover:bg-[#32cd6d] transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
            >
              <MessageCircle size={24} />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Rodapé */}
        <footer className="bg-gray-950 border-t border-gray-800 py-6 text-center text-gray-500">
          © {new Date().getFullYear()} 4U Develops. Todos os direitos reservados.
        </footer>
      </main>

      {/* Componente Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-bg overflow-y-auto">
          {/* O conteúdo do modal agora tem altura máxima e rolagem própria para evitar cortes */}
          <div className="relative w-full max-w-4xl bg-gray-950 text-white rounded-3xl shadow-2xl p-8 border border-gray-800 modal-content max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={28} />
            </button>
            <h3 className="text-4xl font-bold mb-4 text-[#00FF66] drop-shadow-[0_0_5px_rgba(0,255,102,0.3)]">
              {selectedProject.title}
            </h3>
            <p className="text-gray-300 text-lg mb-6">{selectedProject.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {selectedProject.screenshots.map((src, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-800">
                  {/* Usando o componente Image do Next.js com as imagens reais */}
                  <Image
                    src={src}
                    alt={`${selectedProject.title} screenshot ${idx + 1}`}
                    width={800} // Ajuste a largura conforme o tamanho das suas imagens
                    height={600} // Ajuste a altura conforme o tamanho das suas imagens
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
