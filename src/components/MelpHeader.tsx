import { useRestaurantContext } from "@/context/restaurant"
import { useUIContext } from "@/context/ui"
import { ChevronDown } from "lucide-react"
import { type ChangeEvent } from "react"
import { PointInfoDialog } from "./PointInfoDialog"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"

export const MelpHeader = () => {
  const search = useRestaurantContext(state => state.searchQuery)
  const setSearch = useRestaurantContext(state => state.setSearchQuery)
  const sortBy = useRestaurantContext(state => state.sortBy)
  const setSortBy = useRestaurantContext(state => state.setSortBy)
  const isLoading = useUIContext(state => state.isLoading)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <section className="w-4/5 ml-auto lg:w-full">
      <div className="w-full p-2">
        <Input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={handleSearchChange}
          className="w-full bg-white"
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
            <DropdownMenuItem onClick={() => setSortBy('rating')}>
              Rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('name')}>
              Name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-end">
        <PointInfoDialog />
      </div>
    </section>
  )
}