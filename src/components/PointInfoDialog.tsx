import { useMapContext } from "@/context/map"
import { LocateFixed, Trash2 } from "lucide-react"
import { useMemo } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export const PointInfoDialog = () => {
  const setPoint = useMapContext(state => state.setPoint)
  const setRadius = useMapContext(state => state.setRadius)
  const radius = useMapContext(state => state.radius)
  const restaurantsWithinRadio = useMapContext(state => state.restaurantsWithinRadio)

  const averageRating = useMemo(() => {
    if (restaurantsWithinRadio.length === 0) return 0;

    const total = restaurantsWithinRadio.reduce((sum, restaurant) => {
      return sum + (restaurant.rating || 0);
    }, 0);

    return total / restaurantsWithinRadio.length;
  }, [restaurantsWithinRadio]);

  const standardDeviation = useMemo(() => {
    if (restaurantsWithinRadio.length === 0) return 0;

    const avg = averageRating;

    const variance = restaurantsWithinRadio.reduce((sum, restaurant) => {
      return sum + Math.pow((restaurant.rating || 0) - avg, 2);
    }, 0) / restaurantsWithinRadio.length;

    return Math.sqrt(variance);
  }, [restaurantsWithinRadio, averageRating]);

  const topFiveRestaurants = useMemo(() => {
    return [...restaurantsWithinRadio]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  }, [restaurantsWithinRadio]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <LocateFixed />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-4/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Custom Point Info</DialogTitle>
          <DialogDescription>
            Here you can see information about the custom point you selected on the map.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-4">
          <div className="space-y-2 mb-4">
            <Input className="w-full mt-2" readOnly value={`Searching restaurants within ${radius} meters`} />
            <Slider
              defaultValue={[10]}
              onValueChange={(value) => setRadius(value[0])}
              value={[radius]}
              min={10}
              max={500}
              step={10}
            />
          </div>
          <div className="w-full">
            <section className="space-y-8 mb-4">
              <Table>
                <TableCaption>
                  Restaurants within {radius} meters
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurantsWithinRadio.map(restaurant => (
                    <TableRow key={restaurant.id}>
                      <TableCell>{restaurant.name}</TableCell>
                      <TableCell>{restaurant.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table>
                <TableCaption>
                  Top 5 Restaurants within {radius} meters:
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topFiveRestaurants.map((restaurant, index) => (
                    <TableRow key={restaurant.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{restaurant.name}</TableCell>
                      <TableCell>{restaurant.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            <p>Average rating: <strong>{averageRating.toFixed(2)}</strong></p>
            <p>Standard Deviation of ratings: <strong>{standardDeviation.toFixed(2)}</strong></p>
          </div>
          <DialogFooter>
            <Button onClick={() => setPoint(null)} variant="destructive">
              Clear Point
              <Trash2 />
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}