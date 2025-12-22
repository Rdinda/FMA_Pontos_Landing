
import { Head } from '@inertiajs/react';
import { Download, Github, Smartphone, BookOpen, Layout, Zap, RefreshCw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    const [latestRelease, setLatestRelease] = useState<GithubRelease | null>(null);
    const [pastReleases, setPastReleases] = useState<GithubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const repoOwner = 'Rdinda';
    const repoName = 'FMA_Pontos';

    useEffect(() => {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch releases');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setLatestRelease(data[0]);
                    setPastReleases(data.slice(1, 4)); // Get next 3 releases
                } else {
                    // Fallback mock data if no releases found (optional, or just show error/empty)
                    // For now, we will handle empty state in UI
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <>
            <Head title="FMA Pontos - Aplicativo de Umbanda">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-[#000000] text-[#F2F2F2] font-sans selection:bg-[#5FA8A8] selection:text-black overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

                {/* Hero Section */}
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#000000]">
                    {/* Atmospheric Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-br from-[#5FA8A8]/20 to-transparent rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-[#A7D6D1]/10 to-transparent rounded-full blur-[80px]"
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10 pt-20 pb-12 lg:pt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Left Column: Text */}
                            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Preserve a <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5FA8A8] to-[#A7D6D1]">Tradição e Fé</span>
                                    </h1>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                                >
                                    "O <strong className="text-white">FMA Pontos</strong> conecta você às raízes da Umbanda. Acesse letras, organize seus estudos e mantenha viva a chama do conhecimento espiritual."
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-center lg:items-start gap-6 w-full"
                                >
                                    <button
                                        onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="group px-8 py-4 bg-[#5FA8A8] text-black font-bold rounded-2xl text-lg hover:bg-[#4E9696] transition-all shadow-[0_0_20px_rgba(95,168,168,0.2)] hover:shadow-[0_0_30px_rgba(95,168,168,0.4)] flex items-center justify-center gap-3 relative overflow-hidden w-full sm:w-auto"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <Download className="w-5 h-5 relative z-10" />
                                        <span className="relative z-10">Baixar Agora</span>
                                    </button>

                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5FA8A8]/10 border border-[#5FA8A8]/20 text-[#5FA8A8] text-sm font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5FA8A8] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5FA8A8]"></span>
                                        </span>
                                        Novo: Versão 1.5 Disponível
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column: Image */}
                            <div className="relative flex justify-center lg:justify-center mt-12 lg:mt-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="relative z-10 w-[280px] md:w-[320px] lg:w-[360px]"
                                >
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative aspect-[9/16] rounded-[2.5rem] bg-[#0A0A0A] border-[8px] border-[#1A1A1A] shadow-2xl shadow-[#5FA8A8]/20 ring-1 ring-white/10 overflow-hidden"
                                    >
                                        {/* Notch */}
                                        <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1A1A] w-1/2 mx-auto rounded-b-xl z-30"></div>

                                        {/* Screen Content */}
                                        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
                                            <img
                                                src="/screen.png"
                                                alt="FMA Pontos App Interface"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Reflection Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20"></div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Elements behind phone */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-gray-800 rounded-full opacity-30"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-dashed border-gray-800/50 rounded-full opacity-20"
                                    ></motion.div>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Sobre o Aplicativo */}
                {/* Sobre o Aplicativo */}
                <section className="py-24 bg-gradient-to-b from-[#000000] to-gray-950/50 relative">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px", amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#A7D6D1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Sobre o Aplicativo
                            </h2>
                            <div className="w-24 h-1 bg-[#5FA8A8] mx-auto rounded-full mb-8"></div>
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                O <strong className="text-white">FMA Pontos</strong> nasceu da necessidade de centralizar e organizar as letras dos pontos de Umbanda em um ambiente simples, acessível e respeitoso.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Mais do que um aplicativo, este projeto é uma forma de preservação cultural, permitindo que praticantes e estudiosos tenham acesso rápido às letras, em qualquer lugar, diretamente no celular.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Funcionalidades */}
                <section className="py-24 px-6 relative">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Funcionalidades
                        </h2>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ margin: "-50px", amount: 0.1 }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <FeatureCard
                                icon={<BookOpen className="w-8 h-8 text-[#5FA8A8]" />}
                                title="Consulta de Letras"
                                description="Acesse facilmente as letras dos pontos de Umbanda."
                            />
                            <FeatureCard
                                icon={<Zap className="w-8 h-8 text-[#5FA8A8]" />}
                                title="Organização Inteligente"
                                description="Conteúdo organizado por categorias para facilitar a navegação."
                            />
                            <FeatureCard
                                icon={<Layout className="w-8 h-8 text-[#5FA8A8]" />}
                                title="Interface Simples"
                                description="Design limpo, intuitivo e fácil de usar."
                            />
                            <FeatureCard
                                icon={<Smartphone className="w-8 h-8 text-[#5FA8A8]" />}
                                title="Aplicativo Leve"
                                description="Rápido, funcional e otimizado para o dia a dia."
                            />
                            <FeatureCard
                                icon={<RefreshCw className="w-8 h-8 text-[#5FA8A8]" />}
                                title="Atualizações Constantes"
                                description="Novos conteúdos e melhorias frequentes."
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Por que este aplicativo foi criado */}
                <section className="py-24 bg-[#050505] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-[#5FA8A8] rounded-full blur-[150px] opacity-5"></div>
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-4xl font-bold mb-8 text-[#A7D6D1]"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            Por que este aplicativo foi criado
                        </motion.h2>
                        <div className="space-y-6 text-lg text-gray-300">
                            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.5 }} transition={{ delay: 0.2 }}>
                                Muitos pontos de Umbanda são transmitidos oralmente ou ficam dispersos em anotações e materiais não organizados.
                            </motion.p>
                            <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.5 }} transition={{ delay: 0.3 }}>
                                Este aplicativo foi criado para centralizar, preservar e facilitar o acesso a esse conhecimento, respeitando a tradição e fortalecendo a cultura.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }} transition={{ delay: 0.4 }}
                                className="font-semibold text-white mt-8 border-t border-gray-800 pt-8 inline-block"
                            >
                                O projeto não possui fins comerciais e busca contribuir com a comunidade de forma aberta e acessível.
                            </motion.p>
                        </div>
                    </div>
                </section>


                {/* Download e Versões */}
                <section id="download" className="py-24 bg-gradient-to-t from-[#0A0A0A] to-black">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="bg-[#0f0f0f] border border-gray-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-[#5FA8A8]/5 relative overflow-hidden group">
                            {/* Decorative ambient light */}
                            <div className="absolute top-[-50%] left-[20%] w-[60%] h-[50%] bg-[#5FA8A8] rounded-full blur-[120px] opacity-10"></div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Pronto para começar?
                                    </h2>
                                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                                        Baixe agora a versão mais recente e tenha os pontos de Umbanda sempre à mão.
                                    </p>
                                </motion.div>

                                {loading ? (
                                    <div className="py-12 flex flex-col items-center justify-center text-gray-500">
                                        <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#5FA8A8]" />
                                        <p className="animate-pulse">Verificando atualizações...</p>
                                    </div>
                                ) : error || !latestRelease ? (
                                    <div className="py-8 bg-gray-900/50 rounded-2xl border border-gray-800/50 max-w-lg mx-auto">
                                        <Smartphone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-300 mb-6 font-medium">
                                            O download direto estar indisponível no momento.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <a
                                                href={`https://github.com/${repoOwner}/${repoName}/releases`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 bg-[#1f1f1f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a2a2a] transition-all border border-gray-700"
                                            >
                                                <Github className="w-5 h-5" />
                                                <span>Acessar GitHub</span>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5FA8A8]/10 text-[#5FA8A8] border border-[#5FA8A8]/20 rounded-full text-sm font-medium mb-8">
                                            <div className="w-2 h-2 rounded-full bg-[#5FA8A8] animate-pulse"></div>
                                            Versão {latestRelease.tag_name} disponível
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
                                            {latestRelease.assets?.[0]?.browser_download_url ? (
                                                <a
                                                    href={latestRelease.assets[0].browser_download_url}
                                                    className="group relative inline-flex items-center justify-center gap-3 bg-[#5FA8A8] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4d8c8c] transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(95,168,168,0.2)]"
                                                >
                                                    <Download className="w-6 h-6" />
                                                    <span>Baixar para Android</span>
                                                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
                                                </a>
                                            ) : (
                                                <a
                                                    href={latestRelease.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative inline-flex items-center justify-center gap-3 bg-[#5FA8A8] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4d8c8c] transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(95,168,168,0.2)]"
                                                >
                                                    <Github className="w-6 h-6" />
                                                    <span>Baixar no GitHub</span>
                                                </a>
                                            )}
                                        </div>

                                        <p className="text-gray-500 text-sm mb-8">
                                            Compatível com Android • Arquivo APK Seguro
                                        </p>

                                        {latestRelease.body && (
                                            <div className="w-full max-w-2xl bg-black/40 rounded-xl p-6 border border-gray-800/50 text-left">
                                                <h3 className="text-gray-200 font-semibold mb-3 flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-[#5FA8A8]" />
                                                    Novidades desta versão
                                                </h3>
                                                <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                                                    {latestRelease.body}
                                                </div>
                                            </div>
                                        )}

                                        {pastReleases.length > 0 && (
                                            <div className="mt-8 text-sm text-gray-500">
                                                <a href={`https://github.com/${repoOwner}/${repoName}/releases`} target="_blank" className="hover:text-[#5FA8A8] transition-colors underline decoration-dotted underline-offset-4">
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
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5FA8A8] transition-colors text-sm"
                            >
                                <Github className="w-4 h-4" />
                                <span>Ver Código Fonte no GitHub</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Rodapé */}
                <footer className="py-12 border-t border-gray-900 text-center text-gray-500 text-sm">
                    <div className="container mx-auto px-6">
                        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>FMA Pontos</h3>
                        <p className="mb-6">Projeto independente voltado à preservação cultural da Umbanda.</p>

                        <p className="mb-2 italic">
                            Este aplicativo não possui vínculo institucional com terreiros ou federações.
                        </p>
                        <p>
                            &copy; {new Date().getFullYear()} Todos os direitos reservados.
                        </p>
                    </div>
                </footer>

            </div>
        </>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -5, borderColor: 'rgba(95,168,168,0.3)' }}
            className="bg-[#0f0f0f] border border-gray-800 p-8 rounded-xl transition-all group"
        >
            <div className="mb-6 p-4 bg-black rounded-lg inline-block border border-gray-800 group-hover:border-[#5FA8A8]/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
                {title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
