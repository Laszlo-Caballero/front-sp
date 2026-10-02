import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-100">
      <LoginForm />
    </main>
  );
}
