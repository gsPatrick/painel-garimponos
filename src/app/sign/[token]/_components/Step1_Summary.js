// src/app/sign/[token]/_components/Step1_Summary.js
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar, Users } from 'lucide-react';

export default function Step1_Summary({ data, onNext }) {
  const { document: doc, signer } = data;
  const deadline = new Date(doc.deadlineAt).toLocaleDateString('pt-BR');

  return (
    <Card className="w-full bg-white shadow-lg rounded-xl border-none p-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-3xl font-bold text-[#151928]">{doc.title}</CardTitle>
        <div className="flex items-center gap-6 text-muted-foreground mt-4">
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /><span>Assinar até {deadline}</span></div>
          {/* <div className="flex items-center gap-2"><Users className="h-5 w-5" /><span>0/1 Assinaturas</span></div> */}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 font-medium">Assinaturas</th>
              <th className="py-2 font-medium">Email</th>
              <th className="py-2 font-medium">Tipo</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4">{signer.name}</td>
              <td className="py-4 text-muted-foreground">{signer.email}</td>
              <td className="py-4">Assinar</td>
              <td className="py-4"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">Pendente</span></td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="flex justify-end p-0 mt-8">
        <Button onClick={onNext} className="bg-[#1c4ed8] hover:bg-[#1c4ed8]/90">Próximo</Button>
      </CardFooter>
    </Card>
  );
}