import { Button } from "./components/ui/button";
import { getRestaurants } from "./services/get-restaurants";

function App() {
  const handleClick = async () => {
    const restaurants = await getRestaurants();
    console.log("restaurants", restaurants);
  };

  return (
    <>
      <h1 className="text-9xl">Hello World</h1>
      <Button onClick={handleClick}>Click</Button>
    </>
  )
}

export default App
