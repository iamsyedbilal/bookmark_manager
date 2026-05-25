import { ArrowUpDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useBookmarkStore } from "../store/bookmarkstore";

export default function SortBy() {
  const sortBy = useBookmarkStore((state) => state.sortBy);
  const setSortBy = useBookmarkStore((state) => state.setSortBy);
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger
        className="
          w-fit
          
          gap-2
          rounded-sm
          bg-card
          px-2
          py-4
          text-base
          font-medium
          shadow-sm
        ">
        <ArrowUpDown className="h-4 w-4" />
        <span>Sort by</span>

        <SelectValue />
      </SelectTrigger>

      <SelectContent
        className="
          rounded-sm
         mt-10
  
          bg-card
          shadow-lg
        ">
        <SelectItem value="recently-added">Recently added</SelectItem>

        <SelectItem value="recently-visited">Recently visited</SelectItem>

        <SelectItem value="most-visited">Most visited</SelectItem>
      </SelectContent>
    </Select>
  );
}
