
import * as React from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCountries } from "@/hooks/useCountries"

interface Country {
  name: string
  alpha_2: string
  alpha_3: string
  flag_url: string
}

interface CountrySelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function CountrySelect({
  value,
  onValueChange,
  placeholder = "Select country...",
  className
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const { countries, isLoading, searchCountries } = useCountries()

  const selectedCountry = countries.find((country) => country.alpha_3 === value)

  const handleSearch = (searchValue: string) => {
    searchCountries(searchValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-12 bg-input/50 border-white/10 focus:border-primary/50",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {selectedCountry ? (
              <>
                <img
                  src={selectedCountry.flag_url}
                  alt={`${selectedCountry.name} flag`}
                  className="w-4 h-4 rounded-sm"
                />
                <span>{selectedCountry.name}</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{placeholder}</span>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search countries..."
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : "No country found."}
            </CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.alpha_3}
                  value={country.alpha_3}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <img
                      src={country.flag_url}
                      alt={`${country.name} flag`}
                      className="w-4 h-4 rounded-sm"
                    />
                    <span>{country.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country.alpha_3 ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
