import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

type FilterParams = {
    priceRange: string;
    setPriceRange: (value: string) => void;
    capacity: string;
    setCapacity: (value: string) => void;
    sort: string;
    setSort: (value: string) => void;
    handleClear: () => void;
  };

const RoomFilters = ({
    priceRange,
    setPriceRange,
    capacity,
    setCapacity,
    sort,
    setSort,
    handleClear,
  }: FilterParams) => {
    const handlePriceValueChange = (value: string) => {
      setPriceRange(value);
    };
    const handleCapacityValueChange = (value: string) => {
      setCapacity(value);
    };
    const handleSortValueChange = (value: string) => {
      setSort(value);
    };
  
    const isFiltersActive = priceRange || capacity || sort;
    
    return (
      <div className=" absolute top-[110%] right-[0%] z-10 bg-white py-4 px-6 md:px-10 space-y-3 shadow">
        <div>
          <Label>Select Price Per Slot</Label>
          <Select value={priceRange} onValueChange={handlePriceValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="50-100">$50-$100</SelectItem>
                <SelectItem value="100-200">$100-$200</SelectItem>
                <SelectItem value="200-">$200-</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Select Capacity</Label>
          <Select onValueChange={handleCapacityValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0-20">0-20</SelectItem>
                <SelectItem value="20-40">20-40</SelectItem>
                <SelectItem value="40-80">40-80</SelectItem>
                <SelectItem value="80-">80-</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Sort By: Price Per Slot</Label>
          <Select onValueChange={handleSortValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pricePerSlot">Ascending</SelectItem>
                <SelectItem value="-pricePerSlot">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {isFiltersActive && (
            <Button onClick={handleClear} className="bg-primary">
              Clear
            </Button>
          )}
        </div>
      </div>
    );
  };

export default RoomFilters;