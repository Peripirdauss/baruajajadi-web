'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function OverviewChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await fetch('/api/admin/analytics');
        const data = await res.json();
        if (data.stats) setChartData(data.stats);
      } catch (e) {
        console.error('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    }
    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
      </div>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-none bg-transparent shadow-none font-outfit">
      <CardHeader className="flex flex-row items-center justify-between pb-12 pt-8 px-10">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight lowercase">aktivitas cuan ✨</CardTitle>
          <CardDescription className="text-sm font-medium lowercase">pantau traffic cuan yang masuk ke website kamu.</CardDescription>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-bold lowercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(29,78,216,0.4)]"></div>
            <span>pengunjung total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary/20"></div>
            <span>pengunjung aktif</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[400px] w-full pl-6 pr-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData.length > 0 ? chartData : [
            { name: '...', total: 0, active: 0 },
            { name: '...', total: 0, active: 0 }
          ]}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={10} 
              fontWeight={700}
              tickLine={false} 
              axisLine={false} 
              dy={15}
              tickFormatter={(value) => value.toLowerCase()}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={10} 
              fontWeight={700}
              tickLine={false} 
              axisLine={false} 
              dx={-15}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-2xl backdrop-blur-xl border-border/20">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-6">
                          <span className="text-[10px] font-bold lowercase tracking-widest text-muted-foreground/40">catatan {payload[0].payload.name}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm font-bold text-foreground lowercase px-2">total: {payload[0].value}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary/20" />
                            <span className="text-sm font-medium text-muted-foreground lowercase px-2">aktif: {payload[1].value}</span>
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
              stroke="#1d4ed8"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorTotal)"
              animationDuration={2500}
              strokeLinecap="round"
            />
            <Area
              type="monotone"
              dataKey="active"
              stroke="#1d4ed8"
              strokeWidth={2}
              strokeDasharray="8 8"
              fillOpacity={1}
              fill="url(#colorActive)"
              animationDuration={3000}
              strokeLinecap="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
