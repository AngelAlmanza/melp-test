import { useEffect } from "react";
import { MelpHeader } from "./components/MelpHeader";
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
    <div className="w-screen h-screen overflow-auto flex flex-col lg:flex-row justify-between relative">
      <header className="z-20 lg:absolute lg:top-0 lg:right-0 lg:w-2/5">
        <MelpHeader />
      </header>
      <aside className="w-full h-fit overflow-x-scroll bg-transparent p-2 z-20 lg:h-full lg:overflow-y-auto lg:w-2/5 lg:overflow-x-hidden">
        <RestaurantsContainer />
      </aside>
      <main className="w-screen h-full absolute top-0 left-0 z-0 lg:relative lg:w-3/5">
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
