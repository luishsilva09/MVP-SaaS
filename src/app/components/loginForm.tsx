'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function FormLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        setLoading(false)

        if (res?.error) {
            if (res.error === 'OAuthAccountNotLinked') {
                setError('Este e-mail está vinculado a outro método de login.')
            } else {
                console.log(res.error)
                setError('Credenciais inválidas ou usuário não autorizado.')
            }
        } else {
            router.push('/dashboard')
        }
    }

    const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
        await signIn(provider, { callbackUrl: '/dashboard' })
    }

    return (
        <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
                {error && (
                    <div className="text-red-600 font-medium text-center">{error}</div>
                )}

                <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        className="w-6 h-6"
                        alt="Google"
                    />
                    <span>Login com Google</span>
                </button>

                <button
                    type="button"
                    onClick={() => handleOAuthLogin('facebook')}
                    className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                    <img
                        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                        className="w-6 h-6"
                        alt="Facebook"
                    />
                    <span>Login com Facebook</span>
                </button>

                <label htmlFor="email">
                    <p className="font-medium text-slate-700 pb-2">Email</p>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password">
                    <p className="font-medium text-slate-700 pb-2">Senha</p>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div className="flex flex-row justify-between">
                    <label htmlFor="remember" className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                        />
                        <span>Lembrar-me</span>
                    </label>
                    <Link href="/forgetPassword" className="font-medium text-indigo-600">
                        Esqueceu a senha?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>{loading ? 'Entrando...' : 'Entrar'}</span>
                </button>

                <p className="text-center">
                    Ainda não tem conta?{' '}
                    <Link
                        href="/register"
                        className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                    >
                        <span>Cadastre-se</span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </span>
                    </Link>
                </p>
            </div>
        </form>
    )
}
