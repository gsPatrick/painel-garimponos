// src/app/sign/[token]/_components/Step4_VerifyOtp.js
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

export default function Step4_VerifyOtp({ token, signatureImage, onNext, onBack }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyAndSign = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Verifica o OTP
      await api.post(`/sign/${token}/otp/verify`, { otp });
      
      // 2. Se o OTP for válido, finaliza a assinatura
      // Em um cenário real, o client fingerprint seria gerado no frontend
      const clientFingerprint = 'fingerprint_simulado_' + new Date().getTime();
      await api.post(`/sign/${token}/commit`, {
        signatureImage: signatureImage,
        clientFingerprint: clientFingerprint
      });

      onNext(); // Vai para a tela de sucesso
    } catch (err) {
      setError(err.response?.data?.message || 'Código inválido ou erro ao assinar.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl border-none p-8 text-center">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-[#151928]">Verificação</CardTitle>
        <p className="text-muted-foreground mt-2">Insira o código de 6 dígitos que enviamos para o seu Email/WhatsApp.</p>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <Input 
          type="text" 
          maxLength="6" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)}
          className="text-center text-2xl tracking-[1em] h-14"
          placeholder="______"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 p-0 mt-8">
        <Button onClick={handleVerifyAndSign} disabled={loading} className="w-full bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">
          {loading ? 'Verificando e Assinando...' : 'Assinar'}
        </Button>
        <Button variant="link" onClick={() => api.post(`/sign/${token}/otp/start`)}>
          Não recebeu o código? Enviar novamente
        </Button>
      </CardFooter>
    </Card>
  );
}