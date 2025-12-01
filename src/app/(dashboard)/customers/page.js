"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Search,
    Filter,
    Download,
    UserPlus,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { getCustomers } from "@/services/mocks";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);

        if (filterType === "all") return matchesSearch;
        if (filterType === "vip")
            return matchesSearch && customer.ltv > 1000;
        if (filterType === "new") {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return matchesSearch && new Date(customer.createdAt) > thirtyDaysAgo;
        }

        return matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>;
            case "blocked":
                return <Badge variant="destructive">Bloqueado</Badge>;
            case "guest":
                return <Badge variant="secondary">Convidado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Novo Cliente
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4" onValueChange={setFilterType}>
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="vip">VIPs</TabsTrigger>
                    <TabsTrigger value="new">Novos</TabsTrigger>
                </TabsList>
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-1 items-center space-x-2">
                        <Input
                            placeholder="Buscar por nome, email ou telefone..."
                            className="h-8 w-[250px] lg:w-[350px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Card>
                    <CardHeader className="px-7">
                        <CardTitle>Base de Clientes</CardTitle>
                        <CardDescription>
                            Gerencie seus clientes e visualize métricas de fidelidade.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Localização</TableHead>
                                    <TableHead className="text-center">Pedidos</TableHead>
                                    <TableHead className="text-right">Total Gasto (LTV)</TableHead>
                                    <TableHead className="text-right">Último Pedido</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24">
                                            Carregando clientes...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCustomers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24">
                                            Nenhum cliente encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                                                        {customer.avatar}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <Link href={`/customers/${customer.id}`} className="font-medium hover:underline">
                                                            {customer.name}
                                                        </Link>
                                                        <span className="text-xs text-muted-foreground">{customer.email}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(customer.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{customer.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {customer.ordersCount} pedidos
                                            </TableCell>
                                            <TableCell className="text-right font-bold font-mono">
                                                {customer.ltv.toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right text-muted-foreground">
                                                {formatDistanceToNow(new Date(customer.lastOrderDate), {
                                                    addSuffix: true,
                                                    locale: ptBR,
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Abrir menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/customers/${customer.id}`}>Ver Perfil</Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            Bloquear
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
