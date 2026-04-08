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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground">Command Center</h1>
          <p className="text-muted-foreground font-medium">Real-time performance and content metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchStats} className="rounded-xl font-bold gap-2">
            <RefreshCcw className={loading ? "animate-spin h-4 w-4" : "h-4 w-4"} />
            Sync Data
          </Button>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent/10 py-1.5 px-3 rounded-full text-accent ring-1 ring-accent/20">
            Node.js Standing-by
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-sm font-bold text-muted-foreground animate-pulse">Aggregating system metrics...</p>
        </div>
      ) : (
        <>
          {/* Quick Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

          {/* Main Visualizations */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-4">
            <OverviewChart />
            <div className="lg:col-span-1">
              <SystemHealth />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            
            <div className="space-y-6">
              <div className="p-8 rounded-[2rem] bg-foreground text-background shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent/40 transition-colors"></div>
                <h3 className="text-2xl font-black mb-4">Powerful Control</h3>
                <p className="text-background/60 text-sm leading-relaxed mb-6 font-medium">
                  You are now managing your own system. All metrics are aggregated directly from your local environment.
                </p>
                <div className="h-1 w-full bg-background/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-2/3"></div>
                </div>
                <p className="text-[10px] uppercase font-black tracking-widest mt-4 opacity-40 italic">System integrity: 99.9%</p>
              </div>

              <div className="p-8 rounded-[2rem] border border-accent/20 bg-accent/5 backdrop-blur-sm group hover:bg-accent/10 transition-all cursor-help">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-ping"></span>
                  Quick Tip
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                  Use the <strong>"Sync Data"</strong> button to manually refresh the metrics if you make changes in the content management tabs.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
