"use client";

import { ProductForm } from "@/components/products/ProductForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/products">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Novo Produto</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Descartar</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Salvar Produto
                    </Button>
                </div>
            </div>

            <ProductForm />
        </div>
    );
}
