'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'


interface Props {
    session: Session | null
}

export default function Header({ session }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const userName = session?.user?.name
    const userImage = session?.user?.image

    // Fecha o menu se clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Esquerda */}
                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold text-blue-600">MVP-SaaS</span>
                        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                            Dashboard
                        </Link>
                    </div>

                    {/* Direita - Perfil */}
                    <div className="relative" ref={menuRef}>
                        <div className="flex items-center space-x-6">
                            <span className="text-gray-700">Olá, {userName}</span>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img
                                    src={userImage || 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'}
                                    alt="Foto de Perfil"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>
                        
                        

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Perfil
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left cursor-pointer hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
