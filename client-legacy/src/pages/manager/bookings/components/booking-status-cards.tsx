import { Card } from "@/components/ui/card"
import { Activity, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface BookingStats {
  active: number
  pending: number
  completed: number
  canceled: number
}

export const BookingStatusCards = () => {
  const [stats, setStats] = useState<BookingStats>({
    active: 0,
    pending: 0,
    completed: 0,
    canceled: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookingStats = async () => {
      try {
        // Replace with actual API call
        const mockStats = {
          active: 24,
          pending: 12,
          completed: 156,
          canceled: 8
        }
        setStats(mockStats)
      } catch (error) {
        console.error("Failed to fetch booking stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingStats()
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
    <BookingStatusCard 
      type="active" 
      count={stats.active} 
      icon={Activity}
      iconColor="text-purple-800"
      description="Currently ongoing bookings"
    />
    <BookingStatusCard 
      type="pending" 
      count={stats.pending}
      icon={Clock}
      iconColor="text-purple-800"
      description="Awaiting confirmation"
    />
    <BookingStatusCard 
      type="completed" 
      count={stats.completed}
      icon={CheckCircle2}
      iconColor="text-purple-800"
      description="Successful bookings"
    />
    <BookingStatusCard 
      type="canceled" 
      count={stats.canceled}
      icon={XCircle}
      iconColor="text-purple-800"
      description="Canceled bookings"
    />
  </div>
  
  )
}

interface BookingStatusCardProps {
  type: string
  count: number
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  description: string
}

const BookingStatusCard = ({ 
  type, 
  count, 
  icon: Icon, 
  iconColor, 
}: BookingStatusCardProps) => {
  return (
    <Card className="p-6 ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 capitalize">{type} Bookings</p>
          <h3 className="text-2xl font-bold mt-1">{count}</h3>
        </div>
        <div className={` rounded-full  ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">No. of Bookings</p>
    </Card>
  )
}