import { useEffect } from "react";
import { RestaurantsContainer } from "./components/RestaurantsContainer";
import { RestaurantsMap } from "./components/RestaurantsMap";
import { ShowErrorAlert } from "./components/ShowErrorAlert";
import { useRestaurantContext } from "./context/restaurant";
import { useUIContext } from "./context/ui";
import { getRestaurants } from "./services/get-restaurants";

function App() {
  const setRestaurants = useRestaurantContext(state => state.setRestaurants)
  const setError = useUIContext(state => state.setErrorMsg)
  const error = useUIContext(state => state.errorMsg)
  const setIsLoading = useUIContext(state => state.setIsLoading)

  useEffect(() => {
    setIsLoading(true);

    getRestaurants()
      .then((restaurants) => {
        if (restaurants.right) {
          setRestaurants(restaurants.right);
        } else {
          setError(restaurants.left);
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
  }, [setRestaurants, setError, setIsLoading]);

  return (
    <div className="w-screen h-screen overflow-auto flex relative">
      <aside className="w-1/4 h-full p-4">
        <RestaurantsContainer />
      </aside>
      <main className="w-3/4 h-full">
        {
          !error && <RestaurantsMap />
        }
        {
          error && <ShowErrorAlert />
        }
      </main>
    </div>
  )
}

export default App
