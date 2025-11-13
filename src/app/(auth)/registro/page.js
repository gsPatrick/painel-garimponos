// src/app/(auth)/register/page.js
"use client"

import { useState } from 'react';
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthInput } from "@/components/auth/AuthInput"; // Componente de input com máscara

export default function RegisterPage() {
  const { register } = useAuth(); // Hook do nosso contexto de autenticação
  
  // Estado único para gerenciar todos os campos do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    terms: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Função genérica para atualizar o estado do formulário.
   * Lida com inputs de texto, senhas e checkboxes.
   */
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // Se for um checkbox, usa a propriedade 'checked', senão, usa 'value'
      [id]: type === 'checkbox' ? checked : value,
    }));
  };
  
  /**
   * Função para lidar com o envio do formulário de cadastro.
   */
  const handleRegister = async (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    // Validação simples do lado do cliente
    if (!formData.terms) {
      setError("Você precisa aceitar os Termos de Uso e a Política de Privacidade.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Chama a função 'register' do AuthContext, passando todos os dados do formulário
      await register(formData);
      // O AuthContext cuidará do redirecionamento para o dashboard em caso de sucesso
    } catch (err) {
      // Exibe a mensagem de erro retornada pela API (ex: "E-mail já em uso")
      setError(err.message || 'Falha no cadastro. Verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl border-none p-8">
      <CardHeader className="text-center p-0 mb-8">
        <CardTitle className="text-3xl font-bold text-[#151928]">
          Cadastre-se grátis
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleRegister}>
        <CardContent className="p-0 space-y-5">
          {/* Componente AuthInput reutilizado para cada campo do formulário */}
          <AuthInput
            id="name"
            label="Nome Completo"
            type="text"
            placeholder="Seu nome completo"
            required
            onChange={handleChange}
          />
          <AuthInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            required
            onChange={handleChange}
          />
          <AuthInput
            id="cpf"
            label="CPF"
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            required
            onChange={handleChange}
          />
          <AuthInput
            id="phone"
            label="Celular"
            mask="(99) 99999-9999"
            placeholder="(00) 00000-0000"
            required
            onChange={handleChange}
          />
          <AuthInput
            id="password"
            label="Crie uma Senha"
            type="password"
            required
            onChange={handleChange}
          />
          
          {/* Checkbox para os termos de uso */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="terms"
              checked={formData.terms}
              // O `onCheckedChange` do componente Checkbox do Shadcn passa o valor booleano diretamente
              onCheckedChange={(checked) => setFormData(p => ({ ...p, terms: checked }))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium text-[#151928] leading-tight"
              >
                Concordo com os Termos de Uso e Política de Privacidade
              </Label>
            </div>
          </div>

          {/* Exibição de mensagem de erro, se houver */}
          {error && <p className="text-sm text-red-600 pt-2">{error}</p>}
        </CardContent>

        <CardFooter className="flex flex-col gap-5 p-0 mt-8">
          <Button
            type="submit"
            disabled={loading || !formData.terms}
            className="w-full bg-[#1c4ed8] hover:bg-[#1c4ed8]/90 text-white font-semibold h-10"
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Já tem cadastro? </span>
            <Link href="/login" className="font-medium text-[#151928] hover:underline">
              Acesse sua conta
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}