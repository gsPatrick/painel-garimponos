import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    className
}) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-xl bg-muted/5 animate-in fade-in zoom-in-95 duration-500",
            className
        )}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                {Icon && <Icon className="w-8 h-8 text-muted-foreground" />}
            </div>
            <h3 className="text-lg font-semibold tracking-tight mb-1">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
                {description}
            </p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
