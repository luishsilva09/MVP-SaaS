"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage({
                type: "success",
                text: "Se o e-mail existir, um link de redefinição foi enviado.",
            });
        } else {
            setMessage({ type: "error", text: data.error || "Erro ao enviar o e-mail." });
        }

        setLoading(false);
    };

    return (
        <body>
        <div className="antialiased bg-slate-200 min-h-screen flex items-center justify-center px-4">
            <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-4xl font-medium text-center mb-4">Reset Password</h1>

                {message && (
                    <div
                        className={`mb-6 text-sm text-center px-4 py-2 rounded ${message.type === "success" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">Email</p>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter email address"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex items-center justify-center"
                    >
                        {loading ? "Enviando..." : "Reset password"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-slate-600 text-center">
                    <Link href="/" className="text-indigo-500 hover:underline">
                        Voltar para login
                    </Link>
                </p>
            </div>
            </div></body>
    );
}
