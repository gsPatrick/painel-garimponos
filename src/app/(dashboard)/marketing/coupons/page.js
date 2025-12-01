"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Plus,
    Search,
    Copy,
    Tag,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Clock,
    Ban
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getCoupons, createCoupon } from "@/services/mocks";
import { CouponForm } from "@/components/marketing/CouponForm";

export default function CouponsPage() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const data = await getCoupons();
            setCoupons(data);
        } catch (error) {
            console.error("Failed to fetch coupons:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleCreateCoupon = async (data) => {
        setIsCreating(true);
        try {
            await createCoupon(data);
            setIsCreateModalOpen(false);
            fetchCoupons(); // Refresh list
        } catch (error) {
            console.error("Failed to create coupon:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
            case "scheduled":
                return <Badge className="bg-blue-500 hover:bg-blue-600">Agendado</Badge>;
            case "expired":
                return <Badge variant="secondary">Expirado</Badge>;
            case "exhausted":
                return <Badge variant="destructive">Esgotado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getTypeLabel = (type, value) => {
        switch (type) {
            case "percentage":
                return `-${value}%`;
            case "fixed":
                return `-R$ ${value.toFixed(2)}`;
            case "shipping":
                return "Frete Grátis";
            default:
                return type;
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Toast notification would go here
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Cupons</h2>
                <div className="flex items-center space-x-2">
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Novo Cupom
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Criar Novo Cupom</DialogTitle>
                                <DialogDescription>
                                    Configure as regras e valores do novo cupom de desconto.
                                </DialogDescription>
                            </DialogHeader>
                            <CouponForm onSubmit={handleCreateCoupon} isLoading={isCreating} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-900">Ativos Agora</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                            <Tag className="h-4 w-4 text-green-700" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-900">{coupons.filter(c => c.status === 'active').length}</div>
                        <p className="text-xs text-green-700 mt-1 font-medium">Cupons disponíveis para uso</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-900">Descontos no Mês</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-blue-700" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900">R$ 1.250,00</div>
                        <p className="text-xs text-blue-700 mt-1 font-medium">+20.1% em relação ao mês passado</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-900">Cupom Mais Usado</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-purple-700" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900 truncate" title="BOASVINDAS10">BOASVINDAS10</div>
                        <p className="text-xs text-purple-700 mt-1 font-medium">45 usos este mês</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Table */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar cupons..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Uso</TableHead>
                                <TableHead>Validade</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">Carregando cupons...</TableCell>
                                </TableRow>
                            ) : filteredCoupons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">Nenhum cupom encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                filteredCoupons.map((coupon) => (
                                    <TableRow key={coupon.id}>
                                        <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono font-medium">{coupon.code}</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(coupon.code)}>
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{coupon.description}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{getTypeLabel(coupon.type, coupon.value)}</Badge>
                                        </TableCell>
                                        <TableCell className="w-[200px]">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span>{coupon.usageCount} usos</span>
                                                {coupon.usageLimit > 0 && <span>de {coupon.usageLimit}</span>}
                                            </div>
                                            <Progress value={coupon.usageLimit > 0 ? (coupon.usageCount / coupon.usageLimit) * 100 : 0} className="h-2" />
                                        </TableCell>
                                        <TableCell>
                                            {coupon.endDate ? (
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    {formatDistanceToNow(new Date(coupon.endDate), { addSuffix: true, locale: ptBR })}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">Nunca expira</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/marketing/coupons/${coupon.id}`}>
                                                <Button variant="ghost" size="sm">Editar</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
