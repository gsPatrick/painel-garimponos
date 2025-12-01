"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Edit } from "lucide-react";
import { toast } from "sonner";
import { MOCKS, mockDelay } from "@/services/mocks";

const categorySchema = z.object({
    name: z.string().min(2, "Nome obrigatório"),
    slug: z.string().optional(),
    parentId: z.string().optional().nullable(),
});

export function CategoryForm({ category, trigger }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const isEdit = !!category;

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: category || {
            name: "",
            slug: "",
            parentId: null,
        },
    });

    // Fetch all categories for parent selection
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            // MOCK MODE
            await mockDelay();
            return MOCKS.categories;
            // const res = await api.get("/categories");
            // return res.data;
        },
        enabled: open,
    });

    useEffect(() => {
        if (open && category) {
            reset({
                ...category,
                parentId: category.parentId ? category.parentId.toString() : null
            });
        } else if (open && !category) {
            reset({
                name: "",
                slug: "",
                parentId: null,
            });
        }
    }, [open, category, reset]);

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (data.parentId === "null" || data.parentId === "") data.parentId = null;

            if (isEdit) {
                return api.put(`/categories/${category.id}`, data);
            }
            return api.post("/categories", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            toast.success(isEdit ? "Categoria atualizada!" : "Categoria criada!");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || "Erro ao salvar categoria");
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="gap-2">
                        <Plus className="size-4" /> Nova Categoria
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" {...register("name")} placeholder="Ex: Roupas" />
                        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (Opcional)</Label>
                        <Input id="slug" {...register("slug")} placeholder="roupas" />
                    </div>
                    <div className="space-y-2">
                        <Label>Categoria Pai</Label>
                        <Controller
                            name="parentId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value?.toString() || "null"}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Nenhuma (Raiz)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null">Nenhuma (Raiz)</SelectItem>
                                        {categories?.filter(c => c.id !== category?.id).map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
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
