'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/admin/stats-card';
import { OverviewChart } from '@/components/admin/overview-chart';
import { RecentActivity } from '@/components/admin/recent-activity';
import { SystemHealth } from '@/components/admin/system-health';
import { Users, Wrench, FileText, LucideImage as Image, Loader2, RefreshCcw, Activity, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/perip/api/admin/stats');
      const data = await res.json();
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const icons = [Users, Wrench, FileText, Image];

  return (
    <div className="space-y-12 pb-24">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/20 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold tracking-widest text-primary lowercase">
            <Activity className="h-3.5 w-3.5" /> pusat informasi 👋
          </div>
          <div className="space-y-1">
             <h1 className="text-6xl font-black tracking-tighter text-foreground leading-[0.9] lowercase">halo <span className="text-primary">bestie admin</span></h1>
             <p className="text-muted-foreground font-medium text-lg border-l-2 border-primary/20 pl-4 mt-4 lowercase">pantau perkembangan bisnis dan update tools sakti kamu di sini.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="xl" onClick={fetchStats} className="rounded-2xl bg-white border-border shadow-sm font-black uppercase tracking-widest text-[10px] gap-3 px-10 h-16 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 group">
            <RefreshCcw className={cn("h-4 w-4 transition-transform group-hover:rotate-180 duration-500", loading && "animate-spin")} />
            Refresh Signals
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center gap-8">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
             <Loader2 className="h-20 w-20 animate-spin text-primary relative z-10" />
          </div>
          <div className="text-center space-y-3">
            <p className="text-2xl font-black text-foreground tracking-tight uppercase italic animate-pulse">Synchronizing Nodes...</p>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Establishing encrypted handshake</p>
          </div>
        </div>
      ) : (
        <>
          {/* Quick Metrics */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-4 duration-700">
            {stats.map((stat, i) => (
              <StatsCard 
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={icons[i] || Activity}
                trend={stat.trend}
              />
            ))}
          </div>

          {/* Analytics & System Health */}
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-4 animate-in fade-in duration-1000 delay-200">
            <div className="lg:col-span-3 glass-card rounded-[3rem] p-2 bg-white/40 border-white/80 shadow-2xl shadow-black/[0.02]">
               <OverviewChart />
            </div>
            <div className="lg:col-span-1">
               <SystemHealth />
            </div>
          </div>

          {/* Activity & Infrastructure */}
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-3 animate-in fade-in duration-1000 delay-400">
            <div className="lg:col-span-2 glass-card rounded-[3rem] p-6 bg-white/40 border-white/80 shadow-2xl shadow-black/[0.02]">
              <RecentActivity />
            </div>
            
            <div className="space-y-10">
              <div className="p-12 rounded-[3rem] bg-slate-950 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-64 w-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:bg-primary/40 transition-colors duration-1000"></div>
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]"></div>
                
                <h3 className="text-4xl font-black mb-6 leading-none lowercase">misi cuan <br/>kita 🚀</h3>
                <p className="text-white/40 text-base leading-relaxed mb-10 font-medium lowercase">
                  semua tools dan aset dibuat biar kerjaan kamu makin sat-set. pastikan semua sinyal aman terkendali!
                </p>
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                      <span>Neural Load</span>
                      <span className="text-accent">Optimal</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div className="h-full bg-gradient-to-r from-primary via-primary to-accent w-[85%] animate-pulse"></div>
                   </div>
                </div>
                <div className="flex items-center gap-3 mt-10">
                   <div className="h-2 w-2 rounded-full bg-accent animate-ping"></div>
                   <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40">Status: Fully Guarded</p>
                </div>
              </div>

              <div className="p-12 rounded-[3rem] glass-card group hover:border-primary/20 transition-all cursor-default border-dashed bg-white/20 border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                     <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                  </div>
                  <h4 className="font-black text-xl lowercase tracking-tight">update semuanya ✨</h4>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed font-medium lowercase">
                  sinkronkan semua perubahan kamu biar langsung aktif di website utama. gaskeun!
                </p>
                <Button variant="link" className="p-0 text-primary font-black mt-6 group-hover:translate-x-2 transition-transform uppercase tracking-widest text-[10px] italic">
                   System Docs <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
