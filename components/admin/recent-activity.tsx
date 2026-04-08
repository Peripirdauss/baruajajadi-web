'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';

const activities = [
  { 
    id: 1, 
    action: 'Hero Content Updated', 
    user: 'Admin', 
    time: '2 mins ago', 
    status: 'Success', 
    type: 'content' 
  },
  { 
    id: 2, 
    action: 'New User Registered', 
    user: 'System', 
    time: '45 mins ago', 
    status: 'Success', 
    type: 'user' 
  },
  { 
    id: 3, 
    action: 'Blog Post Published', 
    user: 'Admin', 
    time: '2 hours ago', 
    status: 'Success', 
    type: 'content' 
  },
  { 
    id: 4, 
    action: 'Database Backup', 
    user: 'System', 
    time: '5 hours ago', 
    status: 'Warning', 
    type: 'system' 
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-md h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight">Recent Activity</CardTitle>
          <CardDescription>Live feed of system and content changes.</CardDescription>
        </div>
        <RefreshCcw className="h-4 w-4 text-muted-foreground cursor-pointer hover:rotate-180 transition-transform duration-500" />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 group">
              <div className="relative mt-1">
                {activity.status === 'Success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                )}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-border group-last:hidden" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground leading-none">{activity.action}</p>
                  <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {activity.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">By {activity.user}</span>
                  <Badge variant="secondary" className="text-[8px] uppercase font-black px-1.5 py-0 h-4 tracking-tighter">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
