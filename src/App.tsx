import { Button } from "./components/ui/button"

function App() {
  const handleClick = () => {
    console.log("Button clicked")
  };

  return (
    <>
      <h1 className="text-9xl">Hello World</h1>
      <Button onClick={handleClick}>Click</Button>
    </>
  )
}

export default App
