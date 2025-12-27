import ThemeToggleLanding from '@/components/theme-toggle-landing';
import { initializeTheme } from '@/hooks/use-appearance';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    Check,
    Copy,
    Download,
    Github,
    Layout,
    Loader2,
    RefreshCw,
    Smartphone,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface GithubRelease {
    id: number;
    tag_name: string;
    name: string;
    published_at: string;
    body: string;
    assets: {
        name: string;
        browser_download_url: string;
    }[];
    html_url: string;
}

export default function Welcome() {
    const [latestRelease, setLatestRelease] = useState<GithubRelease | null>(
        null,
    );
    const [pastReleases, setPastReleases] = useState<GithubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const carouselImages = [
        '/1.png',
        '/2.png',
        '/3.png',
        '/4.png',
        '/5.png',
        '/6.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [carouselImages.length]);

    const repoOwner = 'Rdinda';
    const repoName = 'FMA_Pontos';

    useEffect(() => {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch releases');
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setLatestRelease(data[0]);
                    setPastReleases(data.slice(1, 4)); // Get next 3 releases
                } else {
                    // Fallback mock data if no releases found (optional, or just show error/empty)
                    // For now, we will handle empty state in UI
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Initialize theme on mount
    useEffect(() => {
        initializeTheme();
    }, []);

    return (
        <>
            <Head title="FMA Pontos - Aplicativo de Umbanda">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900 transition-colors duration-300 selection:bg-[#5FA8A8] selection:text-black dark:bg-[#000000] dark:text-[#F2F2F2]"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Fixed Header */}
                <header className="fixed top-0 right-0 left-0 z-50 px-6 py-4">
                    <div className="container mx-auto flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ThemeToggleLanding />
                        </motion.div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#000000] dark:to-[#000000]">
                    {/* Atmospheric Background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                opacity: [0.15, 0.25, 0.15],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute top-[-20%] left-[-10%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-[#5FA8A8]/20 to-transparent blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                opacity: [0.1, 0.2, 0.1],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 2,
                            }}
                            className="absolute right-[-10%] bottom-[-10%] h-[60vw] w-[60vw] rounded-full bg-gradient-to-tl from-[#A7D6D1]/10 to-transparent blur-[80px]"
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150"></div>
                    </div>

                    <div className="relative z-10 container mx-auto px-6 pt-20 pb-12 lg:pt-0">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                            {/* Left Column: Text */}
                            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <h1
                                        className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl xl:text-7xl"
                                        style={{
                                            fontFamily:
                                                'Playfair Display, serif',
                                        }}
                                    >
                                        Preserve a <br />
                                        <span className="bg-gradient-to-r from-[#5FA8A8] to-[#A7D6D1] bg-clip-text text-transparent">
                                            Tradição e Fé
                                        </span>
                                    </h1>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2,
                                        ease: 'easeOut',
                                    }}
                                    className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl lg:mx-0 dark:text-gray-400"
                                >
                                    "O{' '}
                                    <strong className="text-gray-900 dark:text-white">
                                        FMA Pontos
                                    </strong>{' '}
                                    conecta você às raízes da Umbanda. Acesse
                                    letras, organize seus estudos e mantenha
                                    viva a chama do conhecimento espiritual."
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4,
                                        ease: 'easeOut',
                                    }}
                                    className="flex w-full flex-col items-center gap-6 lg:items-start"
                                >
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById('download')
                                                ?.scrollIntoView({
                                                    behavior: 'smooth',
                                                })
                                        }
                                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#5FA8A8] px-8 py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(95,168,168,0.2)] transition-all hover:bg-[#4E9696] hover:shadow-[0_0_30px_rgba(95,168,168,0.4)] sm:w-auto"
                                    >
                                        <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"></div>
                                        <Download className="relative z-10 h-5 w-5" />
                                        <span className="relative z-10">
                                            Baixar Agora
                                        </span>
                                    </button>

                                    {latestRelease && (
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#5FA8A8]/20 bg-[#5FA8A8]/10 px-3 py-1 text-sm font-medium text-[#5FA8A8]">
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5FA8A8] opacity-75"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5FA8A8]"></span>
                                            </span>
                                            Novo: Versão{' '}
                                            {latestRelease.tag_name} Disponível
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Right Column: Image Carousel */}
                            <div className="relative mt-24 flex justify-center lg:mt-0 lg:justify-center">
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        rotate: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    transition={{
                                        duration: 3,
                                        ease: 'easeOut',
                                    }}
                                    className="relative z-10 w-[280px] md:w-[320px] lg:w-[360px]"
                                >
                                    <div className="relative aspect-[9/16]">
                                        {/* Screen Content - Carousel */}
                                        <div className="absolute inset-0 mt-12">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentImageIndex}
                                                    src={
                                                        carouselImages[
                                                            currentImageIndex
                                                        ]
                                                    }
                                                    alt={`FMA Pontos App Screenshot ${currentImageIndex + 1}`}
                                                    className="h-full w-full object-contain"
                                                    initial={{
                                                        opacity: 0,
                                                        x: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                />
                                            </AnimatePresence>

                                            {/* Carousel Indicators */}
                                            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                                                {carouselImages.map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                setCurrentImageIndex(
                                                                    index,
                                                                )
                                                            }
                                                            className={`h-2 w-2 rounded-full transition-all ${
                                                                index ===
                                                                currentImageIndex
                                                                    ? 'w-4 bg-[#5FA8A8]'
                                                                    : 'bg-gray-400 hover:bg-gray-500 dark:bg-white/40 dark:hover:bg-white/60'
                                                            }`}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Elements behind carousel */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        }}
                                        className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-300 opacity-30 dark:border-gray-800"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{
                                            duration: 50,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        }}
                                        className="absolute top-1/2 left-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gray-200 opacity-20 dark:border-gray-800/50"
                                    ></motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sobre o Aplicativo */}
                {/* Sobre o Aplicativo */}
                <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 dark:from-[#000000] dark:to-gray-950/50">
                    <div className="container mx-auto max-w-4xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: '-100px', amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 text-center"
                        >
                            <h2
                                className="mb-6 text-3xl font-bold text-[#A7D6D1] md:text-4xl"
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                }}
                            >
                                Sobre o Aplicativo
                            </h2>
                            <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-[#5FA8A8]"></div>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                O{' '}
                                <strong className="text-gray-900 dark:text-white">
                                    FMA Pontos
                                </strong>{' '}
                                nasceu da necessidade de centralizar e organizar
                                as letras dos pontos de Umbanda em um ambiente
                                simples, acessível e respeitoso.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                Mais do que um aplicativo, este projeto é uma
                                forma de preservação cultural, permitindo que
                                praticantes e estudiosos tenham acesso rápido às
                                letras, em qualquer lugar, diretamente no
                                celular.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Funcionalidades */}
                <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 dark:from-[#000000] dark:to-gray-950/50">
                    <div className="container mx-auto max-w-6xl text-center">
                        <h2
                            className="mb-6 text-3xl font-bold text-[#A7D6D1] md:text-4xl"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            Funcionalidades
                        </h2>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ margin: '-50px', amount: 0.1 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <FeatureCard
                                icon={
                                    <BookOpen className="h-8 w-8 text-[#5FA8A8]" />
                                }
                                title="Consulta de Letras"
                                description="Acesse facilmente as letras dos pontos de Umbanda."
                            />
                            <FeatureCard
                                icon={
                                    <Zap className="h-8 w-8 text-[#5FA8A8]" />
                                }
                                title="Organização Inteligente"
                                description="Conteúdo organizado por categorias para facilitar a navegação."
                            />
                            <FeatureCard
                                icon={
                                    <Layout className="h-8 w-8 text-[#5FA8A8]" />
                                }
                                title="Interface Simples"
                                description="Design limpo, intuitivo e fácil de usar."
                            />
                            <FeatureCard
                                icon={
                                    <Smartphone className="h-8 w-8 text-[#5FA8A8]" />
                                }
                                title="Aplicativo Leve"
                                description="Rápido, funcional e otimizado para o dia a dia."
                            />
                            <FeatureCard
                                icon={
                                    <RefreshCw className="h-8 w-8 text-[#5FA8A8]" />
                                }
                                title="Atualizações Constantes"
                                description="Novos conteúdos e melhorias frequentes."
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Por que este aplicativo foi criado */}
                <section className="relative overflow-hidden bg-gray-100 py-24 dark:bg-[#050505]">
                    <div className="absolute top-0 right-0 h-[30%] w-[30%] rounded-full bg-[#5FA8A8] opacity-5 blur-[150px]"></div>
                    <div className="relative z-10 container mx-auto max-w-4xl px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8 text-3xl font-bold text-[#A7D6D1] md:text-4xl"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            Por que este aplicativo foi criado
                        </motion.h2>
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ delay: 0.2 }}
                            >
                                Muitos pontos de Umbanda são transmitidos
                                oralmente ou ficam dispersos em anotações e
                                materiais não organizados.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ delay: 0.3 }}
                            >
                                Este aplicativo foi criado para centralizar,
                                preservar e facilitar o acesso a esse
                                conhecimento, respeitando a tradição e
                                fortalecendo a cultura.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 inline-block border-t border-gray-200 pt-8 font-semibold text-gray-900 dark:border-gray-800 dark:text-white"
                            >
                                O projeto não possui fins comerciais e busca
                                contribuir com a comunidade de forma aberta e
                                acessível.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Download e Versões */}
                <section
                    id="download"
                    className="bg-gradient-to-t from-gray-100 to-white py-24 dark:from-[#0A0A0A] dark:to-black"
                >
                    <div className="container mx-auto max-w-4xl px-6">
                        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-2xl shadow-[#5FA8A8]/10 md:p-12 dark:border-gray-800 dark:bg-[#0f0f0f] dark:shadow-[#5FA8A8]/5">
                            {/* Decorative ambient light */}
                            <div className="absolute top-[-50%] left-[20%] h-[50%] w-[60%] rounded-full bg-[#5FA8A8] opacity-10 blur-[120px]"></div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2
                                        className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl dark:text-white"
                                        style={{
                                            fontFamily:
                                                'Playfair Display, serif',
                                        }}
                                    >
                                        Pronto para começar?
                                    </h2>
                                    <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
                                        Baixe agora a versão mais recente e
                                        tenha os pontos de Umbanda sempre à mão.
                                    </p>
                                </motion.div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                        <Loader2 className="mb-4 h-12 w-12 animate-spin text-[#5FA8A8]" />
                                        <p className="animate-pulse">
                                            Verificando atualizações...
                                        </p>
                                    </div>
                                ) : error || !latestRelease ? (
                                    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-gray-100 py-8 dark:border-gray-800/50 dark:bg-gray-900/50">
                                        <Smartphone className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-600" />
                                        <p className="mb-6 font-medium text-gray-700 dark:text-gray-300">
                                            O download direto estar indisponível
                                            no momento.
                                        </p>
                                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                            <a
                                                href={`https://github.com/${repoOwner}/${repoName}/releases`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-gray-200 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-300 dark:border-gray-700 dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-[#2a2a2a]"
                                            >
                                                <Github className="h-5 w-5" />
                                                <span>Acessar GitHub</span>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex animate-in flex-col items-center duration-700 fade-in slide-in-from-bottom-4">
                                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#5FA8A8]/20 bg-[#5FA8A8]/10 px-4 py-2 text-sm font-medium text-[#5FA8A8]">
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-[#5FA8A8]"></div>
                                            Versão {latestRelease.tag_name}{' '}
                                            disponível
                                        </div>

                                        <div className="mb-8 flex w-full flex-col justify-center gap-4 sm:flex-row">
                                            {latestRelease.assets?.[0]
                                                ?.browser_download_url ? (
                                                <a
                                                    href={
                                                        latestRelease.assets[0]
                                                            .browser_download_url
                                                    }
                                                    className="group relative inline-flex transform items-center justify-center gap-3 rounded-xl bg-[#5FA8A8] px-8 py-4 text-lg font-bold text-black shadow-[0_4px_20px_rgba(95,168,168,0.2)] transition-all hover:-translate-y-1 hover:bg-[#4d8c8c]"
                                                >
                                                    <Download className="h-6 w-6" />
                                                    <span>
                                                        Baixar para Android
                                                    </span>
                                                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 transition-all group-hover:ring-white/40"></div>
                                                </a>
                                            ) : (
                                                <a
                                                    href={
                                                        latestRelease.html_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative inline-flex transform items-center justify-center gap-3 rounded-xl bg-[#5FA8A8] px-8 py-4 text-lg font-bold text-black shadow-[0_4px_20px_rgba(95,168,168,0.2)] transition-all hover:-translate-y-1 hover:bg-[#4d8c8c]"
                                                >
                                                    <Github className="h-6 w-6" />
                                                    <span>
                                                        Baixar no GitHub
                                                    </span>
                                                </a>
                                            )}
                                        </div>

                                        <p className="mb-8 text-sm text-gray-500">
                                            Compatível com Android • Arquivo APK
                                            Seguro
                                        </p>

                                        {latestRelease.body && (
                                            <ReleaseNotes
                                                body={latestRelease.body}
                                            />
                                        )}

                                        {pastReleases.length > 0 && (
                                            <div className="mt-8 text-sm text-gray-500">
                                                <a
                                                    href={`https://github.com/${repoOwner}/${repoName}/releases`}
                                                    target="_blank"
                                                    className="underline decoration-dotted underline-offset-4 transition-colors hover:text-[#5FA8A8]"
                                                >
                                                    Ver versões anteriores
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <a
                                href={`https://github.com/${repoOwner}/${repoName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#5FA8A8]"
                            >
                                <Github className="h-4 w-4" />
                                <span>Ver Código Fonte no GitHub</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Rodapé */}
                <footer className="border-t border-gray-200 bg-white py-12 text-center text-sm text-gray-500 dark:border-gray-900 dark:bg-transparent">
                    <div className="container mx-auto px-6">
                        <h3
                            className="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            FMA Pontos
                        </h3>
                        <p className="mb-6">
                            Projeto independente voltado à preservação cultural
                            da Umbanda.
                        </p>

                        <p className="mb-2 italic">
                            Este aplicativo não possui vínculo institucional com
                            terreiros ou federações.
                        </p>
                        <p>
                            &copy; {new Date().getFullYear()} Todos os direitos
                            reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5, borderColor: 'rgba(95,168,168,0.3)' }}
            className="group rounded-xl border border-gray-200 bg-gray-50 p-8 transition-all dark:border-gray-800 dark:bg-[#0f0f0f]"
        >
            <div className="mb-6 inline-block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-colors group-hover:border-[#5FA8A8]/30 dark:border-gray-800 dark:bg-black dark:group-hover:border-[#5FA8A8]/20">
                {icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </motion.div>
    );
}

function ReleaseNotes({ body }: { body: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(body);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Function to format the body text, truncating long URLs
    const formatBody = (text: string) => {
        // Remove "Full Changelog" text but keep the URL
        const filteredText = text
            .replace(/\*?\*?Full Changelog\*?\*?:?\s*/gi, '')
            .trim();

        // Regex to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        const parts = filteredText.split(urlRegex);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                // It's a URL - truncate if too long
                const displayUrl =
                    part.length > 50 ? part.substring(0, 47) + '...' : part;

                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-[#5FA8A8] hover:underline"
                        title={part}
                    >
                        {displayUrl}
                    </a>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-gray-100 p-4 text-left sm:p-6 dark:border-gray-800/50 dark:bg-black/40">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                    <Zap className="h-4 w-4 text-[#5FA8A8]" />
                    Novidades desta versão
                </h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    title="Copiar notas de lançamento"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span className="hidden sm:inline">Copiado!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Copiar</span>
                        </>
                    )}
                </button>
            </div>
            <div className="max-w-full overflow-x-auto font-mono text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                {formatBody(body)}
            </div>
        </div>
    );
}
