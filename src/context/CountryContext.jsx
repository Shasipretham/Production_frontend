import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hostApi } from "@/store/api/hostApi";
import { authApi } from "@/store/api/authApi";
import { COUNTRIES } from "@/lib/mock-data";

const CountryContext = createContext(null);

const DEFAULT_COUNTRY = COUNTRIES.find(c => c.code === "IN") || { name: "India", code: "IN", flag: "🇮🇳", currency: "INR" };

export const CountryProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [activeCountry, setActiveCountry] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("selectedCountry");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.code) return parsed;
        } catch (e) {
          console.error("Error parsing selectedCountry", e);
        }
      }
    }
    return DEFAULT_COUNTRY;
  });
  
  const [isSelected, setIsSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem("selectedCountry");
    }
    return false;
  });
  
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);

  useEffect(() => {
    if (!isSelected) {
      initializeWithGeolocation();
    }
  }, [isSelected]);

  const initializeWithGeolocation = async () => {
    try {
      setIsGeolocationLoading(true);
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        if (data && data.country_code) {
          const country = COUNTRIES.find(c => c.code === data.country_code);
          if (country) {
            setActiveCountry(country);
            setIsSelected(true);
            return;
          }
        }
      } else {
        console.warn(`Geolocation API failed with status: ${response.status}`);
      }
    } catch (e) {
      console.error("Geolocation network request failed:", e.message);
    } finally {
      setIsGeolocationLoading(false);
      // Ensure we mark as selected to prevent infinite loops, even on failure
      setIsSelected(true);
    }
  };

  const setCountry = useCallback((country) => {
    setActiveCountry(country);
    setIsSelected(true);
    localStorage.setItem("selectedCountry", JSON.stringify(country));

    // Reset all API states to force refetch with new headers
    dispatch(hostApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
  }, [dispatch]);

  const formatPrice = useCallback((amount) => {
    if (amount === undefined || amount === null) return "";

    const currency = activeCountry?.currency || 'INR';
    const locale = activeCountry?.code === 'IN' ? 'en-IN' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, [activeCountry]);

  return (
    <CountryContext.Provider
      value={{
        activeCountry,
        setCountry,
        isSelected,
        formatPrice,
        isGeolocationLoading
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};


export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error("useCountry must be used inside CountryProvider");
  }
  return ctx;
};