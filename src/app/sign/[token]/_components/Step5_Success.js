// src/app/sign/[token]/_components/Step5_Success.js
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function Step5_Success() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl border-none p-8 text-center">
      <CardContent className="p-0 flex flex-col items-center gap-6">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <h2 className="text-3xl font-bold text-[#151928]">
          Sua assinatura foi registrada com sucesso!
        </h2>
        <div className="flex gap-4">
            {/* Estes botões podem levar para o dashboard do usuário se ele tiver uma conta */}
            <Button variant="outline">Conheça Mais</Button>
            <Button className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">Acessar Minha Conta</Button>
        </div>
      </CardContent>
    </Card>
  );
}