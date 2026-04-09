'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/admin/stats-card';
import { OverviewChart } from '@/components/admin/overview-chart';
import { RecentActivity } from '@/components/admin/recent-activity';
import { SystemHealth } from '@/components/admin/system-health';
import { Users, Wrench, FileText, Image, Loader2, RefreshCcw, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
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
    <div className="space-y-10 pb-20">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase">
            <Activity className="h-3 w-3" /> System Overview
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground leading-none">Command <span className="text-primary">Center</span></h1>
          <p className="text-muted-foreground font-medium text-lg">Real-time performance and system intelligence.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="lg" onClick={fetchStats} className="rounded-full glass font-bold gap-3 px-8 hover:bg-primary/10 hover:border-primary/30 transition-all">
            <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
            Refresh Core
          </Button>
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase opacity-60">Engine Status</span>
            <span className="text-xs font-bold text-primary">STABLE</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[50vh] flex flex-col items-center justify-center gap-6">
          <div className="relative">
             <Loader2 className="h-16 w-16 animate-spin text-primary opacity-20" />
             <Activity className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-bold text-foreground animate-pulse">Synchronizing Data Streams...</p>
            <p className="text-sm text-muted-foreground font-mono">Connecting to local node selector</p>
          </div>
        </div>
      ) : (
        <>
          {/* Quick Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-4 duration-500">
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
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-4 animate-in fade-in duration-700 delay-200">
            <div className="lg:col-span-3 glass-card rounded-[2.5rem] p-1">
               <OverviewChart />
            </div>
            <div className="lg:col-span-1">
               <SystemHealth />
            </div>
          </div>

          {/* Activity & Infrastructure */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 animate-in fade-in duration-700 delay-300">
            <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-4">
              <RecentActivity />
            </div>
            
            <div className="space-y-8">
              <div className="p-10 rounded-[2.5rem] bg-foreground text-background shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-48 w-48 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] group-hover:bg-primary/40 transition-colors duration-1000"></div>
                <h3 className="text-3xl font-black mb-4 leading-tight">Quantum <br/>Control</h3>
                <p className="text-background/50 text-base leading-relaxed mb-8 font-medium">
                  Autonomous workspace management active. System integrity is monitored in real-time.
                </p>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-mono font-bold uppercase opacity-60">
                      <span>Resources</span>
                      <span>Normal</span>
                   </div>
                   <div className="h-1.5 w-full bg-background/10 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-primary to-accent w-4/5"></div>
                   </div>
                </div>
                <p className="text-[10px] uppercase font-mono font-black tracking-[0.3em] mt-8 opacity-30">Status: Secure</p>
              </div>

              <div className="p-10 rounded-[2.5rem] glass-card group hover:border-primary/30 transition-all cursor-help border-dashed">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
                  <h4 className="font-bold text-lg tracking-tight">Node Insight</h4>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                   All content changes are reflected globally after manual sync or automated build cycles.
                </p>
                <Button variant="link" className="p-0 text-primary font-bold mt-4 group-hover:translate-x-1 transition-transform">
                   Read Documentation <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
