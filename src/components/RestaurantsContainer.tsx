import type { Restaurant } from "@/interfaces/restaurants"
import { ChevronDown } from "lucide-react"
import { useCallback, useMemo, useState, type ChangeEvent } from "react"
import { RestaurantCard } from "./RestaurantCard"
import { RestaurantCardLoading } from "./RestaurantCardLoading"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"

type Props = {
  restaurants: Restaurant[]
  isLoading: boolean
}

type SortBy = 'rating' | 'name'

export const RestaurantsContainer = ({ restaurants, isLoading }: Props) => {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<SortBy>('rating')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSortChange = useCallback((sort: SortBy) => {
    setSortBy(sort)
  }, [])

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [restaurants, search])

  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }, [filteredRestaurants, sortBy])

  return (
    <section className="space-y-4 w-full h-full overflow-auto">
      <div>
        <div className="w-full p-2">
          <Input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <div className="w-full p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between items-center disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Sort: {sortBy}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange('rating')}>
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('name')}>
                Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {
        isLoading && Array.from({ length: 5 }).map((_, index) => (
          <RestaurantCardLoading key={index} />
        ))
      }
      {
        !isLoading && sortedRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))
      }
    </section>
  )
}