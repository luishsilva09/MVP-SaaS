import { Suspense } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center mt-10">Carregando formulário...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
