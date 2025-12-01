"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const data = [
    { name: "01", total: 1200 }, { name: "03", total: 1500 }, { name: "05", total: 1100 },
    { name: "07", total: 1800 }, { name: "09", total: 2400 }, { name: "11", total: 2100 },
    { name: "13", total: 2800 }, { name: "15", total: 3200 }, { name: "17", total: 2900 },
    { name: "19", total: 3500 }, { name: "21", total: 3100 }, { name: "23", total: 3800 },
    { name: "25", total: 4200 }, { name: "27", total: 3900 }, { name: "30", total: 4500 },
];

export function SalesChart({ className }) {
    return (
        <Card className={`col-span-4 shadow-lg border-border/50 bg-gradient-to-b from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-950/50 flex flex-col ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">Receita Recente</CardTitle>
                    <CardDescription>Performance de vendas nos últimos 30 dias.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium">
                    <Calendar className="size-3.5" />
                    Últimos 30 dias
                </Button>
            </CardHeader>
            <CardContent className="pl-0 flex-1 min-h-[300px]">
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <filter id="shadow" height="200%">
                                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6366f1" floodOpacity="0.3" />
                                </filter>
                            </defs>
                            <XAxis
                                dataKey="name"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `R$${value / 1000}k`}
                                dx={-10}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: 'rgba(0,0,0,0.05)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                                    padding: '12px 16px',
                                    backdropFilter: 'blur(8px)'
                                }}
                                itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                                labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '12px' }}
                                formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                                cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#6366f1"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                filter="url(#shadow)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
