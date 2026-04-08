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
    <Card className={cn("overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {trend && (
            <div className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-accent/5", trend.color)}>
              {trend.percentage}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-medium">{description}</p>
        
        {/* Subtle decorative element */}
        <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
      </CardContent>
    </Card>
  );
}
