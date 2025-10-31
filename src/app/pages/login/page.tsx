"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const toastId = toast.loading("Entrando...");

    try {
      const response = await fetch("/api/v1/controllers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Falha ao fazer login.", { id: toastId });
      } else {
        toast.success("Login bem-sucedido!", { id: toastId });
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Ocorreu um erro inesperado.", { id: toastId });
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Acesse sua conta
          </h2>
          <p className="text-gray-500">
            Bem-vindo de volta! Por favor, insira seus dados.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold text-gray-700">E-mail</p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              placeholder="josedasilva@gmail.com"
              type="email"
            />
          </div>
          <div>
            <p className="font-bold text-gray-700">Senha</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              placeholder="Sua senha"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              className="cursor-pointer w-full bg-rose-400 hover:bg-rose-500 text-white"
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => router.push("/pages/register")}
            >
              Não possui uma conta? Registre-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
