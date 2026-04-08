'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Mon', total: 400, active: 240 },
  { name: 'Tue', total: 700, active: 450 },
  { name: 'Wed', total: 600, active: 400 },
  { name: 'Thu', total: 900, active: 560 },
  { name: 'Fri', total: 1100, active: 800 },
  { name: 'Sat', total: 1500, active: 1100 },
  { name: 'Sun', total: 1300, active: 950 },
];

export function OverviewChart() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-border/50 bg-card/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight">Activity Overview</CardTitle>
          <CardDescription>Visualizing traffic and engagement patterns across your platform.</CardDescription>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-accent"></div>
            <span>Platform Traffic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-accent/30"></div>
            <span>Active Sessions</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] w-full pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
              dx={-10}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-background/95 p-3 shadow-xl backdrop-blur-sm">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{payload[0].payload.name}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-accent" />
                            <span className="text-sm font-bold text-foreground">Traffic: {payload[0].value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-accent/30" />
                            <span className="text-sm font-medium text-muted-foreground">Active: {payload[1].value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--accent)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="active"
              stroke="var(--accent)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorActive)"
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
