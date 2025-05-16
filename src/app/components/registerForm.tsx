'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";

export function RegisterForm() {
    const router = useRouter()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.error || 'Erro ao registrar.')
                return
            }

            router.push('/') // redireciona após sucesso
        } catch (err) {
            setError('Erro de rede.')
            console.error(err)
        }
    }

    return (

        <form onSubmit={handleSubmit}  className="my-10">
            <div className="flex flex-col space-y-5">
                <label htmlFor="name">
                    <p className="font-medium text-slate-700 pb-2">Nome</p>
                    <input id="name" name="name" type="text" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Name" required value={form.name}
                        onChange={handleChange} />
                </label>
                <label htmlFor="email">
                    <p className="font-medium text-slate-700 pb-2">Email</p>
                    <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" required value={form.email}
                        onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    <p className="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" required value={form.password}
                        onChange={handleChange} />
                </label>

                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center" type='submit'>
                    <span>Register</span>
                </button>
                <p className="text-center">Are you already registered? <Link href="/" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg></span></Link></p>
            </div>
        </form>
    )
}