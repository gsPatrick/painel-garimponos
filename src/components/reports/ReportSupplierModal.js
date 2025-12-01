"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, DollarSign, Calendar, CheckCircle, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ReportSupplierModal({ supplier, open, onOpenChange }) {
    if (!supplier) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Detalhes do Fornecedor</DialogTitle>
                    <DialogDescription>Extrato e status de pagamentos.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Header Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                        <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
                                {supplier.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-lg">{supplier.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={supplier.status === 'Pago' ? 'default' : 'secondary'}>
                                    {supplier.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">ID: #{supplier.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Financial Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                <DollarSign className="size-4" /> A Receber
                            </div>
                            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{supplier.to_receive}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                <CheckCircle className="size-4" /> Peças Vendidas
                            </div>
                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{supplier.sold_items}</div>
                        </div>
                    </div>

                    {/* Recent Transactions (Mock) */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                            <Clock className="size-4 text-muted-foreground" /> Histórico Recente
                        </h4>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="size-2 rounded-full bg-emerald-500" />
                                        <span>Venda #102{i}</span>
                                    </div>
                                    <span className="font-mono text-muted-foreground">12/11/2024</span>
                                    <span className="font-bold">R$ 150,00</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Fechar
                    </Button>
                    <Button className="gap-2">
                        Ver Extrato Completo <ExternalLink className="size-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
