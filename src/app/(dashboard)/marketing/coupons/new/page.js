"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CouponForm } from "@/components/marketing/CouponForm";
import { createCoupon } from "@/services/mocks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewCouponPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createCoupon(data);
            router.push("/marketing/coupons");
        } catch (error) {
            console.error("Failed to create coupon:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Novo Cupom</h2>
            </div>
            <div className="mx-auto max-w-4xl">
                <CouponForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
}
