'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cloud, Database, Cpu, Activity } from 'lucide-react';

export function SystemHealth() {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-md overflow-hidden relative group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tight">System Health</CardTitle>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-green-500 uppercase tracking-widest text-[10px]">Operational</span>
          </div>
        </div>
        <CardDescription>Real-time performance metrics for your host system.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
            <div className="flex items-center gap-2 text-muted-foreground italic">
              <Cpu className="h-3 w-3" /> CPU Usage
            </div>
            <span className="text-foreground">24%</span>
          </div>
          <Progress value={24} className="h-1.5 bg-accent/10" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
            <div className="flex items-center gap-2 text-muted-foreground italic">
              <Activity className="h-3 w-3" /> Memory Load
            </div>
            <span className="text-foreground">42%</span>
          </div>
          <Progress value={42} className="h-1.5 bg-accent/10" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="p-2 rounded-xl bg-accent/10 text-accent mb-1 mx-auto w-fit">
                <Database className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground">DB Status</p>
              <p className="text-xs font-bold text-green-500">Normal</p>
            </div>
            <div className="text-center">
              <div className="p-2 rounded-xl bg-accent/10 text-accent mb-1 mx-auto w-fit">
                <Cloud className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-black uppercase text-muted-foreground">Network</p>
              <p className="text-xs font-bold text-green-500">12ms</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-muted-foreground">Last Ping</p>
            <p className="text-xs font-bold text-foreground">Recently</p>
          </div>
        </div>
      </CardContent>
      
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
    </Card>
  );
}
