'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (!token) {
            setMessage({ type: "error", text: "Token inválido." });
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        if (password.length < 6) {
            return setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres." });
        }

        if (password !== confirm) {
            return setMessage({ type: "error", text: "As senhas não coincidem." });
        }

        setLoading(true);
        setMessage(null);

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage({ type: "success", text: "Senha redefinida com sucesso!" });
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            setMessage({ type: "error", text: data.error || "Erro ao redefinir senha." });
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Redefinir Senha</h2>

                {message && (
                    <p
                        className={`mb-4 text-sm text-center ${message.type === "error" ? "text-red-600" : "text-green-600"}`}
                    >
                        {message.text}
                    </p>
                )}

                <label className="block text-sm font-medium mb-1">Nova senha</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className="block text-sm font-medium mb-1">Confirmar senha</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mb-6"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Redefinindo..." : "Redefinir Senha"}
                </button>
            </form>
        </div>
    );
}
