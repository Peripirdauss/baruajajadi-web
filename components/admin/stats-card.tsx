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
    <Card className={cn("relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-700 bg-white/40 border-white/60 shadow-2xl shadow-black/[0.02] rounded-[2.5rem] p-4 font-outfit", className)}>
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-[10px] font-bold lowercase tracking-widest text-muted-foreground/40">{title}</CardTitle>
        <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
          <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-4xl font-extrabold tracking-tighter text-foreground lowercase">{value}</div>
          {trend && (
            <div className={cn("text-[10px] font-black px-3 py-1 rounded-full border shadow-sm", 
              trend.color === 'text-emerald-500' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"
            )}>
              {trend.percentage}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-medium lowercase tracking-widest opacity-60">{description}</p>
        
        {/* Decorative background glow */}
        <div className="absolute -bottom-12 -right-12 h-32 w-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      </CardContent>
    </Card>
  );
}

