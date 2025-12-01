"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, Image as ImageIcon, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock products for demonstration - in a real app, this would be fetched based on categoryId
const MOCK_CATEGORY_PRODUCTS = [
    { id: "prod_1", name: "Camiseta Básica Algodão", price: "R$ 49,90", image: "https://picsum.photos/seed/prod1/200/200", stock: 120 },
    { id: "prod_2", name: "Calça Jeans Slim", price: "R$ 129,90", image: "https://picsum.photos/seed/prod2/200/200", stock: 45 },
    { id: "prod_3", name: "Tênis Casual Branco", price: "R$ 199,90", image: "https://picsum.photos/seed/prod3/200/200", stock: 12 },
    { id: "prod_4", name: "Jaqueta Jeans", price: "R$ 189,90", image: "https://picsum.photos/seed/prod4/200/200", stock: 8 },
    { id: "prod_5", name: "Boné Aba Curva", price: "R$ 39,90", image: "https://picsum.photos/seed/prod5/200/200", stock: 200 },
];

export function CategoryProductsModal({ open, onOpenChange, category }) {
    const router = useRouter();

    if (!category) return null;

    const handleProductClick = (productId) => {
        onOpenChange(false);
        router.push(`/products/${productId}`);
    };

    const handleViewAllClick = () => {
        onOpenChange(false);
        router.push(`/products?category=${category.id}`);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[90vw] sm:max-w-[90vw] h-[85vh] flex flex-col p-6 z-[100]">
                <DialogHeader className="px-1 shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        {category.name}
                        <Badge variant="secondary" className="text-sm font-normal px-2 py-0.5">
                            {MOCK_CATEGORY_PRODUCTS.length} produtos
                        </Badge>
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        Visualização rápida e gerenciamento dos produtos nesta categoria.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 mt-4 border rounded-md bg-muted/10">
                    <ScrollArea className="h-full p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {MOCK_CATEGORY_PRODUCTS.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="aspect-square bg-muted relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <Badge className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-white/90 shadow-sm">
                                                Editar Produto
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold text-base truncate" title={product.name}>{product.name}</h4>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-lg font-bold text-primary">{product.price}</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{product.stock} est.</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* "View More" Card */}
                            <div
                                className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all aspect-square text-muted-foreground hover:text-primary group"
                                onClick={handleViewAllClick}
                            >
                                <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                                    <Package className="h-8 w-8" />
                                </div>
                                <span className="font-semibold text-base">Ver Todos</span>
                                <span className="text-xs text-center px-4">Ir para lista completa filtrada</span>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                <DialogFooter className="sm:justify-between gap-2 mt-4 pt-4 border-t">
                    <Button variant="ghost" className="text-muted-foreground" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button onClick={handleViewAllClick} size="lg" className="w-full sm:w-auto shadow-sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Gerenciar Produtos desta Categoria
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
