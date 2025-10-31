"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (resendCooldown > 0) {
      console.log("test resendCoolDown", resendCooldown);
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVerifyCode = async () => {
    if (!email) {
      toast.error("Email não encontrado.");
      return;
    }
    if (code.length < 6) {
      toast.error("O código de verificação deve ter 6 dígitos.");
      return;
    }

    const toastId = toast.loading("Verificando código...");

    try {
      const url = `/api/v1/controllers/register/emailVerification`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Houve um erro ao verificar o código.", {
          id: toastId,
        });
      } else {
        toast.success("Email verificado com sucesso!", { id: toastId });
        router.push("/pages/login");
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Ocorreu um erro inesperado ao verificar o código.", {
        id: toastId,
      });
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email não encontrado.");
      return;
    }

    const toastId = toast.loading("Reenviando código...");

    try {
      const url = `/api/v1/controllers/register/emailVerification?email=${email}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Houve um erro ao reenviar o código.", {
          id: toastId,
        });
      } else {
        toast.success("Código reenviado com sucesso!", { id: toastId });
        setResendCooldown(120); // 2 minutes
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Ocorreu um erro inesperado ao reenviar o código.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-start">
      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="w-full p-5 bg-white flex flex-col gap-4">
          <div>
            <h2 className="text-black opacity-50 font-extrabold text-3xl">
              Verifique seu e-mail
            </h2>
            {email && (
              <p className="text-gray-600 mt-2">
                Enviamos um código de verificação para{" "}
                <span className="font-bold">{email}</span>.
              </p>
            )}
          </div>
          <div>
            <p className="font-bold">Código de verificação</p>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-16 w-16 text-2xl" />
                <InputOTPSlot index={1} className="h-16 w-16 text-2xl" />
                <InputOTPSlot index={2} className="h-16 w-16 text-2xl" />
                <InputOTPSlot index={3} className="h-16 w-16 text-2xl" />
                <InputOTPSlot index={4} className="h-16 w-16 text-2xl" />
                <InputOTPSlot index={5} className="h-16 w-16 text-2xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Button
                className="w-full bg-pink-300 hover:bg-indigo-400"
                style={{ cursor: `pointer` }}
                onClick={handleVerifyCode}
              >
                Verificar
              </Button>
            </div>
            <div className="min-full">
              <Button
                className="w-full"
                style={{ cursor: `pointer` }}
                onClick={handleResendCode}
                disabled={resendCooldown > 0}
              >
                Reenviar código{" "}
                {resendCooldown > 0 &&
                  `(Aguarde ${formatTime(resendCooldown)})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
