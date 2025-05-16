import { FormLogin } from "./components/loginForm";

export default function Login() {
  return (
    <body className="antialiased bg-slate-200">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Login</h1>
        <div className="my-5">
        </div>
        <FormLogin />
      </div>
    </body>
  );
}