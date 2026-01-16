import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export const RestaurantCardLoading = () => {
  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <Skeleton className="w-full h-32 rounded" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
      </CardContent>
    </Card>
  )
}