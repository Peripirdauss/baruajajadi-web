'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cloud, Database, Cpu, Activity } from 'lucide-react';

export function SystemHealth() {
  return (
    <Card className="border-white/80 bg-white/40 backdrop-blur-3xl overflow-hidden relative group rounded-[2.5rem] shadow-2xl shadow-black/[0.02] font-outfit">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-xl font-bold lowercase tracking-tight">mood server ✨</CardTitle>
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-600 lowercase tracking-widest">aman</span>
          </div>
        </div>
        <CardDescription className="text-xs font-medium">Real-time performance metrics for high-intensity nodes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold lowercase tracking-widest">
            <div className="flex items-center gap-2 text-muted-foreground/40">
              <Cpu className="h-3.5 w-3.5" /> beban pikiran server
            </div>
            <span className="text-primary font-black">24%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-border/10">
             <div className="h-full bg-primary w-[24%] animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold lowercase tracking-widest">
            <div className="flex items-center gap-2 text-muted-foreground/40">
              <Activity className="h-3.5 w-3.5" /> otak server
            </div>
            <span className="text-primary font-black">42%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-border/10">
             <div className="h-full bg-primary/40 w-[42%]"></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/30">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border text-primary mb-2 mx-auto w-fit group-hover:scale-110 transition-transform">
                <Database className="h-4 w-4" />
              </div>
              <p className="text-[8px] font-bold lowercase text-muted-foreground/40 tracking-widest">database</p>
              <p className="text-[10px] font-bold text-emerald-600 lowercase">aman</p>
            </div>
            <div className="text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border text-primary mb-2 mx-auto w-fit group-hover:scale-110 transition-transform">
                <Cloud className="h-4 w-4" />
              </div>
              <p className="text-[8px] font-bold lowercase text-muted-foreground/40 tracking-widest">jaringan</p>
              <p className="text-[10px] font-bold text-emerald-600 lowercase">12ms</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold lowercase text-muted-foreground/40 tracking-widest">id server</p>
            <p className="text-[10px] font-black text-foreground lowercase">primary_01</p>
          </div>
        </div>
      </CardContent>
      
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-16 -left-16 h-32 w-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
    </Card>
  );
}
