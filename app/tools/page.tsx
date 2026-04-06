'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToolsSearch } from '@/components/tools-search'
import { ToolsFilters } from '@/components/tools-filters'
import { ToolsGrid } from '@/components/tools-grid'

const TOOL_CATEGORIES = ['All', 'Figma', 'JSON Tools', 'AI Tools', 'Design', 'Productivity']

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="border-b border-border bg-card py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold md:text-5xl">
              Powerful Tools for Creators
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our curated collection of productivity and design tools
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <ToolsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <ToolsFilters
              categories={TOOL_CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* Tools Grid */}
            <div className="lg:col-span-3">
              <ToolsGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
