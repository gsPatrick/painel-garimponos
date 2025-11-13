// src/app/(auth)/verify-otp/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { verifyLogin } = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem('loginEmail');
    if (!storedEmail) {
      router.push('/login'); // Se não tiver e-mail, volta pro login
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyLogin(email, otp);
      localStorage.removeItem('loginEmail'); // Limpa o e-mail após o sucesso
      // O AuthContext cuidará do redirecionamento
    } catch (err) {
      setError(err.message || "Falha na verificação. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl border-none p-8">
      <CardHeader className="text-center p-0 mb-8">
        <CardTitle className="text-3xl font-bold text-[#151928]">Verifique seu E-mail</CardTitle>
        <CardDescription className="text-base pt-2">
          Enviamos um código de 6 dígitos para <strong>{email}</strong>.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleVerify}>
        <CardContent className="p-0 space-y-5">
           <div className="space-y-1.5">
            <Label htmlFor="otp" className="text-[#151928] font-medium">Código de Verificação *</Label>
            <Input id="otp" type="text" maxLength="6" placeholder="123456" required value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </CardContent>
        <div className="flex flex-col gap-5 p-0 mt-8">
          <Button type="submit" disabled={loading} className="w-full bg-[#1c4ed8] hover:bg-[#1c4ed8]/90 text-white font-semibold h-10">
            {loading ? 'Verificando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </Card>
  );
}