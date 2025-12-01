"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DateRangePicker() {
    return (
        <div className="flex items-center gap-2">
            <Select defaultValue="30d">
                <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d">Últimos 3 meses</SelectItem>
                    <SelectItem value="ytd">Ano Atual</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
