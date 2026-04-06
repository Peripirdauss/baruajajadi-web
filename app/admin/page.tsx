import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { LayoutDashboard, Image, Wrench, FileText, Activity } from 'lucide-react'

const stats = [
  { title: 'Total Tools', value: '6', icon: Wrench, description: 'Active and featured tools' },
  { title: 'Total Assets', value: '24', icon: Image, description: 'Images and resources' },
  { title: 'Blog Posts', value: '12', icon: FileText, description: 'Published articles' },
  { title: 'Last Updated', value: 'Just now', icon: Activity, description: 'Content synchronization' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage and control your frontend content from one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Welcome to the Admin Panel</CardTitle>
            <CardDescription>
              Use the sidebar to navigate to different sections of your website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              From here you can:
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
              <li>Edit the Hero section text and stats</li>
              <li>Manage your featured tools and their categories</li>
              <li>Configure your asset gallery and blog content</li>
              <li>Monitor site performance and updates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
