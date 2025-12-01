"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CouponForm } from "@/components/marketing/CouponForm";
import { getCouponById, updateCoupon } from "@/services/mocks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditCouponPage() {
    const router = useRouter();
    const params = useParams();
    const [coupon, setCoupon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const data = await getCouponById(params.id);
                // Convert string dates back to Date objects for the form
                if (data) {
                    setCoupon({
                        ...data,
                        startDate: new Date(data.startDate),
                        endDate: data.endDate ? new Date(data.endDate) : null
                    });
                }
            } catch (error) {
                console.error("Failed to fetch coupon:", error);
            } finally {
                setIsFetching(false);
            }
        };
        if (params.id) {
            fetchCoupon();
        }
    }, [params.id]);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await updateCoupon(params.id, data);
            router.push("/marketing/coupons");
        } catch (error) {
            console.error("Failed to update coupon:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <div className="p-8">Carregando cupom...</div>;
    }

    if (!coupon) {
        return <div className="p-8">Cupom não encontrado.</div>;
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Editar Cupom</h2>
            </div>
            <div className="mx-auto max-w-4xl">
                <CouponForm initialData={coupon} onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
}
