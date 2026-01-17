import { useRestaurantContext } from "@/context/restaurant"
import { useUIContext } from "@/context/ui"
import { useEffect, useMemo } from "react"
import { RestaurantCard } from "./RestaurantCard"
import { RestaurantCardLoading } from "./RestaurantCardLoading"

export const RestaurantsContainer = () => {
  const restaurants = useRestaurantContext(state => state.restaurants)
  const filteredRestaurants = useRestaurantContext(state => state.filteredRestaurants)
  const setFilteredRestaurants = useRestaurantContext(state => state.setFilteredRestaurants)
  const isLoading = useUIContext(state => state.isLoading)
  const sortBy = useRestaurantContext(state => state.sortBy)
  const search = useRestaurantContext(state => state.searchQuery)
  const setSelectedRestaurant = useRestaurantContext(state => state.setSelectedRestaurant)

  const handleClickCard = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId)
  }

  const sortedRestaurants = useMemo(() => {
    return [...filteredRestaurants].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      } else {
        return a.name.localeCompare(b.name)
      }
    })
  }, [filteredRestaurants, sortBy])

  useEffect(() => {
    const results = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredRestaurants(results)
  }, [search, restaurants, setFilteredRestaurants])

  return (
    <section className="w-full h-full flex gap-x-4 lg:flex-col lg:gap-y-4 bg-transparent">
      {
        isLoading && Array.from({ length: 5 }).map((_, index) => (
          <RestaurantCardLoading key={index} />
        ))
      }
      {
        !isLoading && sortedRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={() => handleClickCard(restaurant.id)} />
        ))
      }
    </section>
  )
}