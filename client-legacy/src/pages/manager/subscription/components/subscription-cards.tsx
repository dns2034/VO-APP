import { Card } from "@/components/ui/card"
import { Star, CheckCircle2, XCircle, List } from "lucide-react"
import { useEffect, useState } from "react"

interface SubscriptionStats {
  total: number
  active: number
  inactive: number
  mostPopular: string
}

export const SubscriptionCards = () => {
  const [stats, setStats] = useState<SubscriptionStats>({
    total: 0,
    active: 0,
    inactive: 0,
    mostPopular: ""
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionStats = async () => {
      try {
        // Replace with actual API call
        const mockStats = {
          total: 5,
          active: 3,
          inactive: 2,
          mostPopular: "Premium Plan"
        }
        setStats(mockStats)
      } catch (error) {
        console.error("Failed to fetch subscription stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-1/2 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <SubscriptionCard 
        type="total" 
        count={stats.total} 
        icon={List}
        iconColor="text-purple-800"
        description="All subscription plans"
      />
      <SubscriptionCard 
        type="active" 
        count={stats.active} 
        icon={CheckCircle2}
        iconColor="text-purple-800"
        description="Currently active plans"
      />
      <SubscriptionCard 
        type="inactive" 
        count={stats.inactive}
        icon={XCircle}
        iconColor="text-purple-800"
        description="Inactive plans"
      />
      <SubscriptionCard 
        type="mostPopular" 
        name={stats.mostPopular}
        icon={Star}
        iconColor="text-purple-800"
        description="Top plan"
      />
    </div>
  )
}

interface SubscriptionCardProps {
  type: string
  count?: number
  name?: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  description: string
}

const SubscriptionCard = ({ 
  type, 
  count, 
  name,
  icon: Icon, 
  iconColor, 
  description
}: SubscriptionCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 capitalize">{type} Plans</p>
          <h3 className="text-2xl font-bold mt-1">
            {type === 'mostPopular' ? name : count}
          </h3>
        </div>
        <div className={`rounded-full ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {type === 'mostPopular' ? description : `No. of ${type === 'total' ? '' : type} Plans`}
      </p>
    </Card>
  )
}