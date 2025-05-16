'use client'

import { useEffect, useState } from 'react'
import CampaignCard from '../components/CampaignCard'

type Campaign = {
    id: string
    title: string
    objective: string
    audience: string
    metrics: string
}

export default function Dashboard() {
    const [filtroSelecionado, setFiltroSelecionado] = useState<string | null>(null)
    const [exibicaoSelecionada, setExibicaoSelecionada] = useState<string | null>('medio')
    const [campanhas, setCampanhas] = useState<Campaign[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCampanhas = async () => {
            try {
                const res = await fetch('/api/campaigns')
                const data = await res.json()
                setCampanhas(data)
            } catch (err) {
                console.error('Erro ao buscar campanhas:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCampanhas()
    }, [])

    const botoesFiltro = [
        { id: 'novas', label: 'Novas' },
        { id: 'destaques', label: 'Destaques' },
        { id: 'mais-usadas', label: 'Mais Usadas' },
    ]

    const botoesExibicao = [
        { id: 'grande', label: 'Grande' },
        { id: 'medio', label: 'Médio' },
        { id: 'carrossel', label: 'Carrossel' },
    ]

    
    // Define a classe da grade conforme o tipo de exibição
    const getGridClass = () => {
        if (exibicaoSelecionada === 'grande') return 'grid grid-cols-1 gap-6';
        if (exibicaoSelecionada === 'medio') return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
        if (exibicaoSelecionada === 'carrossel') return 'flex gap-4 overflow-x-auto pb-4';
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    }

    const getCardClass = () => {
        if (exibicaoSelecionada === 'grande') return 'min-h-[250px]';
        if (exibicaoSelecionada === 'carrossel') return 'min-w-[300px] flex-shrink-0';
        return '';
    }

    return (
        <main className="max-w-[1100px] mx-auto px-4 py-12 min-h-screen">
            {/* Filtros principais */}
            <div className="flex gap-4 flex-wrap mb-6">
                <span className="text-sm text-gray-600 font-medium mr-2 self-center">Filtrar por:</span>
                {botoesFiltro.map((botao) => (
                    <button
                        key={botao.id}
                        onClick={() => setFiltroSelecionado(botao.id)}
                        className={`${filtroSelecionado === botao.id
                            ? 'bg-blue-700 text-white'
                            : 'bg-white text-blue-700 hover:bg-blue-700 hover:text-white'
                            } 
                        border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition`}
                    >
                        {botao.label}
                    </button>
                ))}
            </div>

            {/* Opções de exibição */}
            <div className="flex justify-end gap-2 mb-6">
                <span className="text-sm text-gray-600 font-medium mr-2 self-center">Exibir por:</span>
                {botoesExibicao.map((botao) => (
                    <button
                        key={botao.id}
                        onClick={() => setExibicaoSelecionada(botao.id)}
                        className={`${exibicaoSelecionada === botao.id
                            ? 'bg-blue-700 text-white'
                            : 'bg-white text-blue-700 hover:bg-blue-700 hover:text-white'
                            } 
                        border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-4 py-1.5 text-center transition`}
                    >
                        {botao.label}
                    </button>
                ))}
            </div>

            {/* Info atual */}
            <div className="text-gray-500 text-sm mb-4">
                Filtro ativo: <strong>{filtroSelecionado || 'Nenhum'}</strong><br />
                Exibição: <strong>{exibicaoSelecionada || 'Padrão'}</strong>
            </div>

            {/* Renderização de campanhas */}
            <div className={getGridClass()}>
                {campanhas.map((c) => (
                    <CampaignCard
                        key={c.id}
                        title={c.title}
                        objective={c.objective}
                        audience={c.audience}
                        metrics={c.metrics}
                    />
                ))}
            </div>
        </main>
    )
}
