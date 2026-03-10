import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Search, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Country, State, City } from 'country-state-city';
import SearchableDropdown from "@/components/ui/SearchableDropdown";

export function FilterPanel({ filters, onChange }) {
  const [open, setOpen] = useState({
    all: false,
    price: false,
    category: false,
    location: false,
  });

  const [countriesList] = useState(Country.getAllCountries());
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  // Initialize states/cities if filters already have values
  React.useEffect(() => {
    if (filters.country) {
      const countryObj = countriesList.find(c => c.name === filters.country || c.isoCode === filters.country);
      if (countryObj) {
        const states = State.getStatesOfCountry(countryObj.isoCode);
        setStatesList(states);
        if (filters.state) {
          const stateObj = states.find(s => s.name === filters.state || s.isoCode === filters.state);
          if (stateObj) {
            setCitiesList(City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode));
          }
        }
      }
    }
  }, []);

  // ✅ ONLY RESET WHAT MARKETPLACE PAGE USES
  const handleClear = () => {
    onChange({
      priceMin: "",
      priceMax: "",
      category: "",
      country: "",
      state: "",
      city: "",
      search: "",
    });
    setStatesList([]);
    setCitiesList([]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
      {/* TOP ROW */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-start justify-start">
        {/* Search (UI only, not affecting filters) */}
        <div className="relative flex-1 w-full border border-gray-300 rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for items..."
            value={filters.search || ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-9 h-9 sm:h-10 bg-white border-gray-300 text-gray-900 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(o => ({ ...o, all: !o.all }))}
            className="text-xs sm:text-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-[#00152d]" />
            Location & More
          </Button>




        </div>
      </div>

      {/* FILTER PANELS */}
      {(open.all || open.price || open.category || open.location) && (
        <div className="mt-4 grid grid-cols-1 text-[#00152d] text-md md:grid-cols-3 gap-6 border-t pt-4">

          {/* LOCATION SECTION */}
          {/* {(open.all || open.location) && (
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-100">
              <SearchableDropdown
                label="Country"
                placeholder="All Countries"
                options={countriesList}
                value={filters.country}
                onChange={(c) => {
                  onChange({
                    ...filters,
                    country: c.name,
                    state: "",
                    city: ""
                  });
                  setStatesList(State.getStatesOfCountry(c.isoCode));
                  setCitiesList([]);
                }}
              />
              <SearchableDropdown
                label="State"
                placeholder="All States"
                options={statesList}
                value={filters.state}
                disabled={!filters.country}
                onChange={(s) => {
                  onChange({
                    ...filters,
                    state: s.name,
                    city: ""
                  });
                  const cCode = countriesList.find(c => c.name === filters.country)?.isoCode;
                  if (cCode) {
                    setCitiesList(City.getCitiesOfState(cCode, s.isoCode));
                  }
                }}
              />
              <SearchableDropdown
                label="City"
                placeholder="All Cities"
                options={citiesList}
                value={filters.city}
                disabled={!filters.state}
                onChange={(c) => {
                  onChange({
                    ...filters,
                    city: c.name
                  });
                }}
              />
            </div>
          )} */}

          {/* PRICE */}
          {(open.all || open.price) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMin: e.target.value,
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMax: e.target.value,
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
              </div>
            </div>
          )}

          {/* CATEGORY */}
          {(open.all || open.category) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
              <select
                value={filters.category}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    category: e.target.value,
                  })
                }
                className="w-full h-9 sm:h-10 border text-[#00152d] border-gray-300 rounded-lg px-3 text-sm"
              >
                <option value="">All</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="moving">Moving</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          )}
        </div>
      )}

    </div>
  );
}