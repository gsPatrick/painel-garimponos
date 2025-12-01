"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MOCKS } from "@/services/mocks";

export function OrderStatusListModal({ status, open, onOpenChange }) {
    if (!status) return null;

    // Mock filtering orders by status (using MOCKS directly for demo)
    const orders = MOCKS.orders.filter(o =>
        status === 'Concluídos' ? o.status === 'completed' :
            status === 'Pendentes' ? o.status === 'pending' :
                status === 'Processando' ? o.status === 'processing' :
                    status === 'Cancelados' ? o.status === 'cancelled' : true
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        Pedidos: <span className="text-primary">{status}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Lista de todos os pedidos com este status.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                                <div>
                                    <p className="font-medium text-sm">#{order.id} - {order.User.name}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-sm">R$ {order.total}</span>
                                    <Link href={`/orders/${order.id}`}>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                            <ArrowRight className="size-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhum pedido encontrado com este status.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
