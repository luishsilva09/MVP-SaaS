'use client'

import { useState } from 'react'

export default function Dashboard() {
    const [filtroSelecionado, setFiltroSelecionado] = useState<string | null>(null)
    const [exibicaoSelecionada, setExibicaoSelecionada] = useState<string | null>(null)

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

    return (
        <main className="max-w-[900px] mx-auto px-4 py-12 min-h-screen">
            {/* Filtros principais */}
            <div className="flex gap-4 flex-wrap mb-6">
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

            {/* Conteúdo aqui */}
            <div className="text-gray-500 text-sm">
                Filtro ativo: <strong>{filtroSelecionado || 'Nenhum'}</strong><br />
                Exibição: <strong>{exibicaoSelecionada || 'Padrão'}</strong>
            </div>
        </main>
    )
}
