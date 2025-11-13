// src/app/send/_components/Modal_SelectSigners.js
"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import api from '@/lib/api';
export default function Modal_SelectSigners({ open, onOpenChange, onSelect }) {
const [savedSigners, setSavedSigners] = useState([]);
const [selected, setSelected] = useState([]);
const [loading, setLoading] = useState(true);
// Busca os signatários salvos quando o modal é aberto
useEffect(() => {
if (open) {
setLoading(true);
      api.get('/contacts')
        .then(res => {
          setSavedSigners(res.data); // 'savedSigners' agora é a lista de contatos
          setLoading(false);
        })
.catch(err => {
console.error("Erro ao buscar signatários:", err);
setLoading(false);
});
}
}, [open]);
const handleSelect = (signer) => {
setSelected(prev =>
prev.some(s => s.email === signer.email)
? prev.filter(s => s.email !== signer.email) // Desmarca
: [...prev, signer] // Marca
);
};
const handleConfirmSelection = () => {
onSelect(selected); // Envia a lista de selecionados para o componente pai
onOpenChange(false); // Fecha o modal
setSelected([]); // Limpa a seleção para a próxima vez
};
return (
<Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent className="max-w-3xl">
<DialogHeader>
<DialogTitle className="text-2xl font-bold text-gray-800">Selecione os Signatários</DialogTitle>
</DialogHeader>
<div className="py-4">
<Table>
<TableHeader>
<TableRow>
<TableHead className="w-[50px]"></TableHead>
<TableHead>Nome</TableHead>
<TableHead>Email</TableHead>
<TableHead>Celular</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{loading ? (
<TableRow><TableCell colSpan={4} className="text-center">Carregando...</TableCell></TableRow>
) : (
savedSigners.map(signer => (
<TableRow key={signer.email}>
<TableCell>
<Checkbox
checked={selected.some(s => s.email === signer.email)}
onCheckedChange={() => handleSelect(signer)}
/>
</TableCell>
<TableCell className="font-medium">{signer.name}</TableCell>
<TableCell>{signer.email}</TableCell>
<TableCell>{signer.phoneWhatsE164}</TableCell>
</TableRow>
))
)}
</TableBody>
</Table>
</div>
<DialogFooter>
<Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
<Button onClick={handleConfirmSelection} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">
Selecionar
</Button>
</DialogFooter>
</DialogContent>
</Dialog>
);
}


