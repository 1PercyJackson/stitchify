
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  name: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface TabStoreProps {
  items: TabItem[]
  defaultTab?: string
  variant?: "horizontal" | "vertical"
  className?: string
}

export function TabStore({
  items,
  defaultTab,
  variant = "horizontal",
  className,
}: TabStoreProps) {
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab || items[0]?.id)

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex border-b border-gray-200",
          variant === "vertical" ? "flex-col border-b-0 border-r" : "space-x-1"
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center justify-center py-2 px-4 text-sm font-medium transition-colors",
              variant === "vertical" ? "border-r-2 pr-3 justify-start" : "border-b-2",
              activeTab === item.id
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              item.icon && "gap-2"
            )}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
      <div className="py-4">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  )
}
