// src/app/send/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Importe os componentes de cada passo
import Step1_Upload from './_components/Step1_Upload';
import Step2_AddSigners from './_components/Step2_AddSigners';
import Step3_Configure from './_components/Step3_Configure';
import Step4_Send from './_components/Step4_Send';
import { Button } from '@/components/ui/button'; // Para o header
import { Header } from '@/components/dashboard/Header'; // Supondo que você tem um Header

const STEPS = [
  { number: 1, label: "Adicionar Documentos" },
  { number: 2, label: "Adicionar signatários" },
  { number: 3, label: "Configuração" },
  { number: 4, label: "Enviar" },
];

export default function SendDocumentFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Estado que será passado entre os componentes
  const [document, setDocument] = useState(null); // Armazena o doc retornado pela API no passo 1
  const [signers, setSigners] = useState([]);
  const [config, setConfig] = useState({
    deadlineAt: new Date(new Date().setDate(new Date().getDate() + 7)), // Default: 7 dias
    // outras configs
  });

  const goToNextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleCancel = () => router.push('/dashboard');

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Upload onNext={goToNextStep} onDocumentUploaded={setDocument} onCancel={handleCancel} />;
      case 2:
        return <Step2_AddSigners onNext={goToNextStep} onBack={goToPrevStep} signers={signers} setSigners={setSigners} />;
      case 3:
        return <Step3_Configure onNext={goToNextStep} onBack={goToPrevStep} config={config} setConfig={setConfig} />;
      case 4:
        return <Step4_Send document={document} signers={signers} config={config} onBack={goToPrevStep} />;
      default:
        return null;
    }
  };

  const headerContent = (
    <div className="flex items-center gap-4">
        {STEPS.map(step => (
            <div key={step.number} className={`flex items-center gap-2 text-sm ${currentStep >= step.number ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                <div className={`flex items-center justify-center size-6 rounded-full ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step.number}
                </div>
                <span>{step.label}</span>
            </div>
        ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Header Fixo - supondo que você tenha um componente Header genérico */}
      <header className="flex h-[68px] items-center justify-between bg-white px-6 border-b">
        {headerContent}
        <Button variant="outline" onClick={() => router.push('/dashboard')}>Sair</Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          {renderStepContent()}
        </div>
      </main>
    </div>
  );
}