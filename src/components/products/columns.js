"use client";

import { MoreHorizontal, ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = [
    {
        accessorKey: "images",
        header: "Imagem",
        cell: ({ row }) => {
            const images = row.getValue("images");
            const image = images && images.length > 0 ? images[0] : null;
            return (
                <Avatar className="h-10 w-10 rounded-lg border">
                    <AvatarImage src={image} alt={row.getValue("name")} />
                    <AvatarFallback className="rounded-lg">IMG</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "price",
        header: "Preço",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(price);
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "stock",
        header: "Estoque",
        cell: ({ row }) => {
            const stock = row.getValue("stock");
            return (
                <div className={stock < 5 ? "text-red-500 font-bold" : ""}>
                    {stock}
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => {
            const cat = row.original.Category; // Assuming include: ['Category']
            return <Badge variant="outline">{cat?.name || 'Sem Categoria'}</Badge>
        }
    },
    {
        accessorKey: "brechoId",
        header: "Integração",
        cell: ({ row }) => {
            const brechoId = row.getValue("brechoId");
            return brechoId ? (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    Brechó #{brechoId}
                </Badge>
            ) : null;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/products/${product.id}`}>
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
