import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    percentage: string;
    color: string;
  };
  className?: string;
}

export function StatsCard({ title, value, description, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("relative overflow-hidden glass-card group hover:translate-y-[-2px] transition-all duration-500", className)}>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">{title}</CardTitle>
        <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mb-1">
          <div className="text-3xl font-mono font-bold tracking-tighter">{value}</div>
          {trend && (
            <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full ring-1 ring-inset", 
              trend.color === 'text-emerald-500' ? "bg-emerald-500/10 ring-emerald-500/20 text-emerald-500" : "bg-destructive/10 ring-destructive/20 text-destructive"
            )}>
              {trend.percentage}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-medium">{description}</p>
        
        {/* Decorative background glow */}
        <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      </CardContent>
    </Card>
  );
}

