// src/app/send/_components/Modal_CreateSigner.js
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AuthInput } from '@/components/auth/AuthInput';
import api from '@/lib/api'; // Importa a API

export default function Modal_CreateSigner({ open, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({ name: '', email: '', cpf: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddSigner = async () => {
    if (!formData.name || !formData.email) {
      setError("Nome e Email são obrigatórios.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      // --- CHAMADA DE API ---
      const response = await api.post('/contacts', formData);
      
      onAdd(response.data); // Envia o signatário recém-criado (com ID) para o componente pai
      onOpenChange(false); // Fecha o modal
      setFormData({ name: '', email: '', cpf: '', phone: '' }); // Limpa o formulário
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar signatário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 text-center">Adicionar Novo Signatário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AuthInput id="name" label="Nome" required onChange={handleChange} value={formData.name} />
          <AuthInput id="email" label="Email" type="email" required onChange={handleChange} value={formData.email} />
          <AuthInput id="cpf" label="CPF" mask="999.999.999-99" onChange={handleChange} value={formData.cpf} />
          <AuthInput id="phone" label="Celular" mask="(99) 99999-9999" onChange={handleChange} value={formData.phone} />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleAddSigner} disabled={loading} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">
            {loading ? 'Adicionando...' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}