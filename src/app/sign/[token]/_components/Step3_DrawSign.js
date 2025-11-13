// src/app/sign/[token]/_components/Step3_DrawSign.js
"use client";

import { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function Step3_DrawSign({ onNext, onBack, onSigned }) {
  const canvasRef = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)'
      });
      setSignaturePad(pad);
    }
  }, []);

  const handleSave = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      const dataUrl = signaturePad.toDataURL('image/png');
      onSigned(dataUrl); // Passa a imagem em Base64 para o componente pai
      onNext();
    } else {
      alert("Por favor, forneça sua assinatura.");
    }
  };
  
  const handleClear = () => signaturePad?.clear();

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl border-none p-8">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-bold text-[#151928]">Assinatura do documento</CardTitle>
        <p className="text-muted-foreground mt-1">Por favor, assine abaixo</p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Adicione aqui os botões de "Desenhar" / "Digitar" se quiser a lógica completa */}
        <canvas ref={canvasRef} className="border rounded-lg w-full h-48" />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-0 mt-6">
        <div>
          <Button variant="ghost" onClick={handleClear}>Apagar</Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack}>Anterior</Button>
          <Button onClick={handleSave} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">Salvar Assinatura e Próximo</Button>
        </div>
      </CardFooter>
    </Card>
  );
}