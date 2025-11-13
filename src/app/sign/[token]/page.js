// src/app/sign/[token]/page.js
"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';

// Vamos criar estes componentes nos próximos passos
import Step1_Summary from './_components/Step1_Summary';
import Step2_Identify from './_components/Step2_Identify';
import Step3_DrawSign from './_components/Step3_DrawSign';
import Step4_VerifyOtp from './_components/Step4_VerifyOtp';
import Step5_Success from './_components/Step5_Success';
import { Skeleton } from '@/components/ui/skeleton'; // Para o estado de loading

export default function SignPage({ params }) {
  const { token } = params;
  
  // Estado para controlar o fluxo
  const [currentStep, setCurrentStep] = useState(0); // 0: loading, 1: Resumo, 2: Identificação, etc.
  const [error, setError] = useState('');
  
  // Estado para armazenar os dados do fluxo
  const [summaryData, setSummaryData] = useState(null);
  const [identificationData, setIdentificationData] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  // Efeito para buscar os dados iniciais do documento ao carregar a página
  useEffect(() => {
    if (!token) return;

    const fetchSummary = async () => {
      try {
        const response = await api.get(`/sign/${token}`);
        setSummaryData(response.data);
        setCurrentStep(1); // Vai para o passo 1 (Resumo)
      } catch (err) {
        setError(err.response?.data?.message || 'Link inválido ou expirado.');
        setCurrentStep(-1); // Estado de erro
      }
    };
    fetchSummary();
  }, [token]);
  
  // Funções para navegar entre os passos
  const goToNextStep = () => setCurrentStep(prev => prev + 1);
  const goToPrevStep = () => setCurrentStep(prev => prev - 1);

  // Lógica para renderizar o componente do passo atual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <div className="w-full max-w-2xl"><Skeleton className="h-64 w-full" /></div>; // Loading
      case 1:
        return <Step1_Summary data={summaryData} onNext={goToNextStep} />;
      case 2:
        return <Step2_Identify token={token} onNext={goToNextStep} onBack={goToPrevStep} onIdentified={setIdentificationData} />;
      case 3:
        return <Step3_DrawSign onNext={goToNextStep} onBack={goToPrevStep} onSigned={setSignatureImage} />;
      case 4:
        return <Step4_VerifyOtp token={token} signatureImage={signatureImage} onNext={goToNextStep} onBack={goToPrevStep} />;
      case 5:
        return <Step5_Success />;
      case -1:
        return <div className="text-red-600 font-semibold p-8 bg-white rounded-lg shadow-md">{error}</div>; // Erro
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f1f5f9] p-4">
      {/* Container que centraliza o conteúdo do passo */}
      <div className="w-full max-w-2xl">
        {renderStep()}
      </div>
    </main>
  );
}