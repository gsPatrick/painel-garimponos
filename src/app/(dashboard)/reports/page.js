"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ReportsSalesTab } from "@/components/reports/ReportsSalesTab";
import { ReportsInventoryTab } from "@/components/reports/ReportsInventoryTab";
import { ReportsFinanceTab } from "@/components/reports/ReportsFinanceTab";
import { MOCK_REPORTS } from "@/services/mockReports";

export default function ReportsPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Relatórios e Analytics</h2>
                    <p className="text-muted-foreground mt-1">Inteligência de dados para tomada de decisão.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DateRangePicker />
                    <Button variant="outline" size="icon">
                        <Download className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <FileText className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="sales" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="sales">Vendas</TabsTrigger>
                    <TabsTrigger value="inventory">Estoque</TabsTrigger>
                    <TabsTrigger value="finance">Financeiro</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ReportsSalesTab data={MOCK_REPORTS.sales} />
                </TabsContent>

                <TabsContent value="inventory" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ReportsInventoryTab data={MOCK_REPORTS.inventory} />
                </TabsContent>

                <TabsContent value="finance" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ReportsFinanceTab data={MOCK_REPORTS.finance} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
