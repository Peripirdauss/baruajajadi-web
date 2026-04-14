'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  Trash2, 
  UserX, 
  UserCheck, 
  ShieldAlert, 
  Loader2, 
  RefreshCcw,
  Ban,
  CheckCircle2,
  Clock,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
      toast({ title: 'Fetch Error', description: 'Could not load community members', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id: number, action: 'status' | 'delete', value?: string) => {
    setLoading(true);
    try {
      const method = action === 'delete' ? 'DELETE' : 'PATCH';
      const body = action === 'status' ? JSON.stringify({ id, status: value }) : undefined;
      const url = action === 'delete' ? `/api/admin/users?id=${id}` : '/api/admin/users';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });

      if (res.ok) {
        toast({ 
          title: 'Update Berhasil ✨', 
          description: `User ${action === 'delete' ? 'dihapus' : 'diupdate'} dari circle kita.` 
        });
        fetchUsers();
      }
    } catch (e) {
      toast({ title: 'Gagal', description: 'Terjadi kesalahan sistem.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-24 font-outfit">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/20 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold tracking-widest text-primary lowercase">
            <ShieldAlert className="h-3.5 w-3.5" /> member protocol control
          </div>
          <div className="space-y-1">
             <h1 className="text-6xl font-black tracking-tighter text-foreground leading-[0.9] lowercase">manajemen <span className="text-primary">circle kamu</span></h1>
             <p className="text-muted-foreground font-medium text-lg border-l-2 border-primary/20 pl-4 mt-4 lowercase">pantau, approve, atau kick member yang kurang satu vibe.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="cari email/nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-16 w-full md:w-80 rounded-[1.5rem] bg-white border border-border/50 pl-14 pr-6 font-bold text-sm tracking-tight focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
            />
          </div>
          <Button variant="outline" size="xl" onClick={fetchUsers} className="rounded-2xl bg-white border-border shadow-sm h-16 w-16 p-0 hover:bg-primary hover:text-white transition-all">
            <RefreshCcw className={cn("h-5 w-5", loading && "animate-spin")} />
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-[3rem] overflow-hidden border-white/80 shadow-2xl shadow-black/[0.02] bg-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/10 bg-primary/[0.02]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Member Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Vibe Level</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Identity Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 text-right">Action Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/5">
              {loading && !filteredUsers.length ? (
                <tr>
                  <td colSpan={4} className="p-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <Loader2 className="h-12 w-12 animate-spin text-primary/20" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Scanning community database...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/60 transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-[1.1rem] bg-slate-100 border border-border/50 flex items-center justify-center font-black text-xs text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner italic">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-black tracking-tight text-foreground lowercase italic leading-none mb-1">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground/50 lowercase">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-950 text-white/40 border border-white/5 ring-4 ring-slate-950/20">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full animate-pulse",
                        user.status === 'active' && "bg-emerald-500",
                        user.status === 'pending' && "bg-amber-500",
                        user.status === 'suspended' && "bg-destructive"
                      )}></div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em]",
                        user.status === 'active' && "text-emerald-600",
                        user.status === 'pending' && "text-amber-600",
                        user.status === 'suspended' && "text-destructive"
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {user.status !== 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAction(user.id, 'status', 'active')}
                          className="h-10 px-4 rounded-xl border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-bold text-xs lowercase gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" /> approve
                        </Button>
                      )}
                      {user.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAction(user.id, 'status', 'suspended')}
                          className="h-10 px-4 rounded-xl border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all font-bold text-xs lowercase gap-2"
                        >
                          <Ban className="h-4 w-4" /> suspend
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          if(confirm('Yakin mau depak user ini? Gak bisa balik lagi lho!')) {
                            handleAction(user.id, 'delete');
                          }
                        }}
                        className="h-10 w-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="block group-hover:hidden">
                       <MoreVertical className="h-5 w-5 text-muted-foreground/20 ml-auto" />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-32 text-center">
                    <div className="space-y-4">
                       <div className="h-16 w-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto text-primary/10">
                          <Users size={32} />
                       </div>
                       <p className="text-xl font-black italic tracking-tight text-foreground/20 lowercase">circle masih sepi bestie...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
