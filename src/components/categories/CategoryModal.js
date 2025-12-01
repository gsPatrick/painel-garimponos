"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const categorySchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    slug: z.string().optional(),
});

export function CategoryModal({ onCategoryCreated }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(categorySchema),
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post("/categories", data);
            return res.data;
        },
        onSuccess: (newCategory) => {
            queryClient.invalidateQueries(["categories"]);
            toast.success("Categoria criada com sucesso!");
            setOpen(false);
            reset();
            if (onCategoryCreated) {
                onCategoryCreated(newCategory);
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || "Erro ao criar categoria");
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" type="button">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                    <DialogDescription>
                        Crie uma nova categoria rapidamente.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" {...register("name")} placeholder="Ex: Camisetas" />
                        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
