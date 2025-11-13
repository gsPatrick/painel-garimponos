// src/app/send/_components/Step1_Upload.js
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import api from '@/lib/api';

export default function Step1_Upload({ onNext, onDocumentUploaded, onCancel }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleNext = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('documentFile', file);
    formData.append('title', file.name);

    try {
      const { data } = await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onDocumentUploaded(data); // Passa o documento criado (com ID) para o pai
      onNext();
    } catch (error) {
      console.error("Falha no upload:", error);
      alert("Erro ao enviar o documento.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Envie seu documento</h2>
      </div>
      
      <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
        <input {...getInputProps()} />
        <p className="font-semibold text-gray-700">Arraste e solte seu arquivo aqui</p>
        <p className="text-sm text-gray-500">ou</p>
        <Button className="mt-4 bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">Selecione do computador</Button>
      </div>

      {file && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4">Arquivos adicionados</h3>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div>
              <p className="text-sm text-gray-500">Documento</p>
              <p className="font-medium">{file.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
              <XCircle className="h-6 w-6 text-red-500" />
            </Button>
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button onClick={handleNext} disabled={!file || loading} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">
              {loading ? 'Enviando...' : 'Próximo'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}