export const MOCK_REPORTS = {
    sales: {
        kpis: [
            { title: "Receita Bruta", value: "R$ 145.230,00", trend: "+12.5%", trendUp: true },
            { title: "Ticket Médio", value: "R$ 345,00", trend: "+2.1%", trendUp: true },
            { title: "Taxa de Conversão", value: "2.4%", trend: "-0.5%", trendUp: false },
            { title: "Total de Pedidos", value: "421", trend: "+8.4%", trendUp: true },
        ],
        revenue_evolution: Array.from({ length: 30 }).map((_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            value: Math.floor(Math.random() * 5000) + 2000 + (i * 100) // Increasing trend
        })),
        sales_by_category: [
            { name: 'Roupas', value: 45000 },
            { name: 'Acessórios', value: 32000 },
            { name: 'Calçados', value: 28000 },
            { name: 'Bolsas', value: 15000 },
        ],
        top_products: [
            { id: 1, name: "Vestido Floral Vintage", sales: 45, revenue: "R$ 6.750,00", stock: 12, image: "https://picsum.photos/seed/p1/50/50" },
            { id: 2, name: "Jaqueta Jeans 90s", sales: 38, revenue: "R$ 5.320,00", stock: 5, image: "https://picsum.photos/seed/p2/50/50" },
            { id: 3, name: "Bolsa Couro Marrom", sales: 32, revenue: "R$ 9.600,00", stock: 8, image: "https://picsum.photos/seed/p3/50/50" },
            { id: 4, name: "Óculos Retro", sales: 28, revenue: "R$ 2.800,00", stock: 45, image: "https://picsum.photos/seed/p4/50/50" },
            { id: 5, name: "Camisa Seda Branca", sales: 25, revenue: "R$ 3.750,00", stock: 2, image: "https://picsum.photos/seed/p5/50/50" },
        ]
    },
    inventory: {
        kpis: [
            { title: "Valor em Estoque", value: "R$ 850.000,00", trend: "Preço Venda", trendUp: true },
            { title: "Peças Paradas (>180d)", value: "142", trend: "Crítico", trendUp: false, alert: true },
            { title: "Novos Cadastros", value: "85", trend: "Este Mês", trendUp: true },
            { title: "Giro de Estoque", value: "4.2", trend: "Anual", trendUp: true },
        ],
        stock_aging: [
            { name: '0-30 dias', value: 450 },
            { name: '31-60 dias', value: 320 },
            { name: '61-90 dias', value: 180 },
            { name: '90+ dias', value: 142 },
        ],
        liquidation_suggestions: [
            { id: 101, name: "Casaco Lã Inverno 2023", days_in_stock: 210, price: "R$ 450,00", suggested_discount: "30%" },
            { id: 102, name: "Bota Cano Alto", days_in_stock: 195, price: "R$ 280,00", suggested_discount: "25%" },
            { id: 103, name: "Saia Plissada", days_in_stock: 188, price: "R$ 120,00", suggested_discount: "40%" },
            { id: 104, name: "Blazer Xadrez", days_in_stock: 182, price: "R$ 320,00", suggested_discount: "20%" },
        ]
    },
    finance: {
        kpis: [
            { title: "Faturamento Líquido", value: "R$ 112.450,00", trend: "Após Comissões", trendUp: true },
            { title: "Pago a Fornecedores", value: "R$ 32.780,00", trend: "Este Mês", trendUp: true },
            { title: "Repasses Pendentes", value: "R$ 8.450,00", trend: "Próx. Semana", trendUp: false },
            { title: "Lucro Operacional", value: "R$ 45.200,00", trend: "+15%", trendUp: true },
        ],
        revenue_vs_payouts: Array.from({ length: 12 }).map((_, i) => ({
            name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
            revenue: Math.floor(Math.random() * 50000) + 80000,
            payouts: Math.floor(Math.random() * 20000) + 30000
        })),
        supplier_extract: [
            { id: 1, name: "Brechó da Maria", sold_items: 12, to_receive: "R$ 1.250,00", status: "Pendente" },
            { id: 2, name: "Vintage Soul", sold_items: 8, to_receive: "R$ 890,00", status: "Pago" },
            { id: 3, name: "Acervo Chic", sold_items: 15, to_receive: "R$ 2.100,00", status: "Pendente" },
            { id: 4, name: "Retro Style", sold_items: 5, to_receive: "R$ 450,00", status: "Pago" },
        ]
    }
};
