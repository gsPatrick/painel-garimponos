"use client";

import { ProductForm } from "@/components/products/ProductForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/services/mocks";
import { notFound } from "next/navigation";

export default function EditProductPage({ params }) {
    const product = MOCK_PRODUCTS.find(p => p.id === params.id);

    if (!product && params.id !== 'PROD-001') {
        // Fallback for demo purposes if ID doesn't match mock exactly or if we want to show a specific mock
        // In a real app, we would fetch and check
    }

    // For demo, we'll just use the first mock product if the ID matches, or find it.
    const initialData = MOCK_PRODUCTS.find(p => p.id === params.id) || MOCK_PRODUCTS[0];

    return (
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/products">
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{initialData.name}</h1>
                        <p className="text-sm text-muted-foreground">Editando produto #{initialData.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Descartar</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                    </Button>
                </div>
            </div>

            <ProductForm initialData={initialData} />
        </div>
    );
}
