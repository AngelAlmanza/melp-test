import { useEffect, useState } from "react";
import { RestaurantsContainer } from "./components/RestaurantsContainer";
import type { Restaurant } from "./interfaces/restaurants";
import { getRestaurants } from "./services/get-restaurants";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    getRestaurants()
      .then((restaurants) => {
        if (restaurants.right) {
          setRestaurants(restaurants.right);
        } else {
          // TODO: Show errror message
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurants on mount:", error);
      })
      .finally(() => {
        // Simulate a loading delay for demonstration purposes
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      });
  }, [])

  return (
    <div className="w-screen h-screen overflow-auto flex">
      <aside className="w-1/4 h-full p-4">
        <RestaurantsContainer restaurants={restaurants} isLoading={isLoading} />
      </aside>
      <main className="w-3/4 h-full">
        <h1 className="text-9xl">Hello World</h1>
      </main>
    </div>
  )
}

export default App
