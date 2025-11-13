// src/app/send/_components/Step4_Send.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import api from '@/lib/api';
import { format } from 'date-fns';

export default function Step4_Send({ document, signers, config, onBack }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Função final que envia todas as configurações e convites para a API.
   */
  const handleSend = async () => {
    setLoading(true);
    try {
      // 1. Atualiza o documento com a data limite definida no Passo 3.
      await api.patch(`/documents/${document.id}`, { deadlineAt: config.deadlineAt });
      
      // 2. Envia os convites para os signatários, incluindo a qualificação e o método de autenticação.
      // O backend precisa estar preparado para receber estes dados.
      const signersPayload = signers.map(s => ({
        name: s.name,
        email: s.email,
        phone: s.phone || s.phoneWhatsE164,
        cpf: s.cpf,
        qualification: s.qualification,
        authChannels: s.authMethod === 'Whatsapp' ? ['WHATSAPP', 'EMAIL'] : ['EMAIL'],
      }));
      
      await api.post(`/documents/${document.id}/invite`, { signers: signersPayload });

      // 3. Sucesso! Exibe uma mensagem e redireciona.
      // Em uma aplicação real, você poderia ir para uma tela de sucesso antes de redirecionar.
      alert('Documento enviado para assinatura com sucesso!');
      router.push('/dashboard'); // Redireciona para o painel principal
    } catch (error) {
      console.error("Falha ao enviar documento:", error);
      alert("Ocorreu um erro ao enviar o documento. Por favor, tente novamente.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl border-none p-8">
      <CardHeader className="text-center p-0 mb-8">
        <CardTitle className="text-3xl font-bold text-[#151928]">Envio</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 space-y-8">
        {/* --- CAMPO DE MENSAGEM --- */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-base font-medium text-gray-700">Mensagem</label>
          <Textarea 
            id="message" 
            placeholder="Olá [Nome do Signatário], te envio os contratos para assinatura."
            className="min-h-[100px]"
          />
        </div>

        {/* --- ABAS DE REVISÃO --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revise documentos e signatários selecionados
          </h3>
          <Tabs defaultValue="signers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signers">Signatários</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            {/* Conteúdo da Aba "Signatários" */}
            <TabsContent value="signers" className="mt-4 border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Autenticação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signers.map((signer) => (
                    <TableRow key={signer.email}>
                      <TableCell className="font-medium">{signer.name}</TableCell>
                      <TableCell>{signer.email}</TableCell>
                      <TableCell>{signer.phone || signer.phoneWhatsE164}</TableCell>
                      <TableCell>{signer.qualification}</TableCell>
                      <TableCell>{signer.authMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Conteúdo da Aba "Documentos" */}
            <TabsContent value="documents" className="mt-4 border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome do Arquivo</TableHead>
                            <TableHead>Data de Criação</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">{document?.title}</TableCell>
                            <TableCell>{document ? format(new Date(document.createdAt), 'dd/MM/yyyy') : '...'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-0 mt-10">
        <Button variant="outline" onClick={onBack} className="h-10">
          Anterior
        </Button>
        <Button onClick={handleSend} disabled={loading} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90 h-10">
          {loading ? 'Enviando...' : 'Enviar documento'}
        </Button>
      </CardFooter>
    </Card>
  );
}