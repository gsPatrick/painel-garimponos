"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Package, TrendingUp, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ReportProductModal({ product, open, onOpenChange }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl">Detalhes do Produto</DialogTitle>
                    <DialogDescription>Análise de performance do item.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                    {/* Product Image & Basic Info */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-border/50 shadow-sm">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">ID: #{product.id}</p>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                <DollarSign className="size-4" /> Receita Gerada
                            </div>
                            <div className="text-2xl font-bold">{product.revenue}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-1">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <TrendingUp className="size-3" /> Vendas
                                </div>
                                <div className="text-xl font-bold">{product.sales}</div>
                            </div>
                            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-1">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Package className="size-3" /> Estoque
                                </div>
                                <div className="text-xl font-bold">{product.stock}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Categorias</h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Roupas</Badge>
                                <Badge variant="outline">Vintage</Badge>
                                <Badge variant="outline">Verão 2024</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Link href={`/products/${product.id}`} className="w-full sm:w-auto">
                        <Button className="w-full gap-2">
                            Ver Cadastro Completo <ExternalLink className="size-4" />
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
