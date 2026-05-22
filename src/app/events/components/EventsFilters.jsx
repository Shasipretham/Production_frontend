import React, { memo, useEffect } from "react"
import { Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export const EventsFilters = memo(({
    activeFilter,
    setActiveFilter,
    eventCategories,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    selectedFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    isScrolled
}) => {

    // Prevent body scroll lock issues
    useEffect(() => {
        document.body.style.overflow = "auto"
        document.documentElement.style.overflow = "auto"

        return () => {
            document.body.style.overflow = "auto"
            document.documentElement.style.overflow = "auto"
        }
    }, [showFilters])

    return (
        <div
            className={`bg-white py-4 sm:py-6 px-4 sticky top-16 z-20 border-b transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"
                }`}
        >
            <div className="container mx-auto max-w-7xl overflow-visible">

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

                    {/* Category Filters */}
                    <div className="flex-1 w-full overflow-hidden">

                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">

                            <button
                                onClick={() => setActiveFilter("all")}
                                className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 text-sm shadow-sm hover:shadow-md ${activeFilter === "all"
                                        ? "bg-[#00142E] text-white"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <Grid className="h-4 w-4" />
                                All Events
                            </button>

                            {eventCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveFilter(category.id)}
                                    className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 text-sm shadow-sm hover:shadow-md ${activeFilter === category.id
                                            ? "bg-[#00142E] text-white"
                                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {category.icon && (
                                        <span className="text-base">
                                            {category.icon}
                                        </span>
                                    )}

                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">

                        {/* View Toggle */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-all ${viewMode === "grid"
                                        ? "bg-white shadow-sm"
                                        : ""
                                    }`}
                            >
                                <Grid className="h-4 w-4 text-gray-700" />
                            </button>

                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-all ${viewMode === "list"
                                        ? "bg-white shadow-sm"
                                        : ""
                                    }`}
                            >
                                <List className="h-4 w-4 text-gray-700" />
                            </button>
                        </div>

                        {/* Filter Button */}
                        <Button
                            variant="outline"
                            className={`relative h-11 px-5 rounded-lg transition-all ${hasActiveFilters
                                    ? "bg-[#00142E]/10 border-[#00142E]/30 text-[#00142E]"
                                    : "bg-white border-gray-200 text-gray-700"
                                }`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" />

                            Filters

                            {hasActiveFilters && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00142E] text-white text-xs rounded-full flex items-center justify-center">
                                    {
                                        Object.values(selectedFilters).filter(
                                            (v) => v !== ""
                                        ).length
                                    }
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="mt-5 p-5 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner overflow-visible">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>

                                <select
                                    value={selectedFilters.date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "date",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00142E] bg-white"
                                >
                                    <option value="">Any Date</option>
                                    <option value="today">Today</option>
                                    <option value="tomorrow">Tomorrow</option>
                                    <option value="this-week">This Week</option>
                                    <option value="this-weekend">
                                        This Weekend
                                    </option>
                                    <option value="next-week">Next Week</option>
                                    <option value="this-month">
                                        This Month
                                    </option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price
                                </label>

                                <select
                                    value={selectedFilters.price}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "price",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00142E] bg-white"
                                >
                                    <option value="">Any Price</option>
                                    <option value="free">Free</option>
                                    <option value="0-25">$0 - $25</option>
                                    <option value="25-50">$25 - $50</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="100+">$100+</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>

                                <select
                                    value={selectedFilters.location}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00142E] bg-white"
                                >
                                    <option value="">Any Location</option>
                                    <option value="online">Online</option>
                                    <option value="nearby">Near Me</option>
                                    <option value="new-york">New York</option>
                                    <option value="london">London</option>
                                    <option value="tokyo">Tokyo</option>
                                    <option value="paris">Paris</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-2">
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="flex-1 h-12 rounded-xl"
                                >
                                    Clear
                                </Button>

                                <Button
                                    className="flex-1 h-12 bg-[#00142E] hover:bg-[#00142E]/90 text-white rounded-xl"
                                    onClick={() => setShowFilters(false)}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})

EventsFilters.displayName = "EventsFilters"