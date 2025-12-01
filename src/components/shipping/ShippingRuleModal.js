"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputMask } from "@react-input/mask";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DialogFooter } from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    zipStart: z.string().min(9, "CEP inválido"),
    zipEnd: z.string().min(9, "CEP inválido"),
    baseCost: z.coerce.number().min(0, "Valor deve ser positivo"),
    costPerKg: z.coerce.number().min(0, "Valor deve ser positivo"),
    deliveryDays: z.coerce.number().min(1, "Mínimo 1 dia"),
    freeShippingThreshold: z.coerce.number().min(0).optional(),
    status: z.boolean().default(true),
}).refine((data) => {
    // Simple string comparison for CEPs works because of the format 00000-000
    return data.zipEnd >= data.zipStart;
}, {
    message: "CEP Final deve ser maior ou igual ao Inicial",
    path: ["zipEnd"],
});

export function ShippingRuleModal({ initialData, onSubmit, isLoading, onCancel }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            zipStart: "",
            zipEnd: "",
            baseCost: 0,
            costPerKg: 0,
            deliveryDays: 1,
            freeShippingThreshold: 0,
            status: true,
        },
    });

    // Reset form when initialData changes (e.g., opening edit modal)
    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        } else {
            form.reset({
                name: "",
                zipStart: "",
                zipEnd: "",
                baseCost: 0,
                costPerKg: 0,
                deliveryDays: 1,
                freeShippingThreshold: 0,
                status: true,
            });
        }
    }, [initialData, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da Regra</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Capital SP" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="zipStart"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP Inicial</FormLabel>
                                <FormControl>
                                    <InputMask
                                        component={Input}
                                        mask="_____-___"
                                        replacement={{ _: /\d/ }}
                                        placeholder="00000-000"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipEnd"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP Final</FormLabel>
                                <FormControl>
                                    <InputMask
                                        component={Input}
                                        mask="_____-___"
                                        replacement={{ _: /\d/ }}
                                        placeholder="99999-999"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="baseCost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Custo Base (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="costPerKg"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adicional por Kg (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="deliveryDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prazo (Dias)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="freeShippingThreshold"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frete Grátis acima de (R$)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" placeholder="Opcional" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Status da Regra</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Salvando..." : "Salvar Regra"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
