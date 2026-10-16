"use client";

import Select, {
  components,
  type StylesConfig,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
} from "react-select";
import { getCities, getCitiesLocations } from "@/lib/api/clientApi";
import type { City } from "@/types/city";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import css from "./Location.module.css";
import Icon from "@/components/Icon/Icon";

interface LocationOption {
  value: string;
  label: string;
  cityName: string;
}
interface LocationProps {
  onLocationChange: (locationId: string | null) => void;
  selectedLocationId: string | null;
}

const selectStyles: StylesConfig<LocationOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: "auto",
border: "none",
outline: state.isFocused ? "1px solid var(--color-yellow)" : "none",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.28571,
    letterSpacing: "-0.03em",
    borderRadius: "30px",
    padding: "12px",
    boxShadow: "none",
    cursor: "text",
    "&:hover": {
      borderColor: "var(--color-yellow)",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    gap: "4px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "var(--color-black)",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.28571,
    letterSpacing: "-0.03em",
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    color: "rgba(38, 38, 38, 0.5)",
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    color: "var(--color-black)",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    gap: "4px",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 0,
    cursor: "pointer",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    marginTop: "4px",
    border: "1px solid var(--color-yellow)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "none",
  }),

  menuList: (base) => ({
    ...base,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "8px",
  }),
  option: (base) => ({
    ...base,
    padding: "0",
    cursor: "pointer",
    backgroundColor: "white",
    color: "rgba(38, 38, 38, 0.4)",
    "&:active": {
      backgroundColor: "white",
    },
  }),
};

const CustomClearIndicator = (
  props: ClearIndicatorProps<LocationOption, false>,
) => (
  <components.ClearIndicator {...props}>
    <Icon name="close" width={18} height={18} className={css.icon}/>
  </components.ClearIndicator>
);

const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<LocationOption, false>,
) => (
  <components.DropdownIndicator {...props}>
        <Icon name="search" width={18} height={18} className={css.icon}/>
  </components.DropdownIndicator>
);

export default function Location({
  onLocationChange,
  selectedLocationId,
}: LocationProps) {
  const instanceId = useId();
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [cityLocations, setCityLocations] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = async (value: string) => {
    setInputValue(value);
    if (value.trim().length < 3) {
      setOptions([]);
      return;
    }
    const cities: City[] = await getCities(value.trim());
    setOptions(
      cities.map((city) => ({
        value: city._id,
        label: `${city.stateEn}, ${city.cityEn}`,
        cityName: city.cityEn,
      })),
    );
  };

  const handleChange = (option: LocationOption | null) => {
    if (!option) {
      onLocationChange(null);
      return;
    }

    const cityExists = cityLocations.some((city) => city._id === option.value);

    if (!cityExists) {
      toast.error(
        `No notices found in ${option.cityName}. Please select another city.`,
      );
      setInputValue("");
      setOptions([]);
      onLocationChange(null);
      return;
    }

    setOptions((prev) => {
      const exists = prev.some((item) => item.value === option.value);
      return exists ? prev : [...prev, option];
    });

    onLocationChange(option.value);
  };

  const selectedCity = cityLocations.find(
    (city) => city._id === selectedLocationId,
  );

  const selectedOption =
    options.find((option) => option.value === selectedLocationId) ??
    (selectedCity
      ? {
          value: selectedCity._id,
          label: `${selectedCity.stateEn}, ${selectedCity.cityEn}`,
          cityName: selectedCity.cityEn,
        }
      : null);

  useEffect(() => {
    const fetchCityLocations = async () => {
      try {
        const cities = await getCitiesLocations();
        setCityLocations(cities);
      } catch (error) {
        console.error("Failed to load city locations:", error);
      }
    };

    fetchCityLocations();
  }, []);

  const formatOptionLabel = (
    option: LocationOption,
    meta: { context: "menu" | "value" },
  ) => {
    if (meta.context === "value") {
      return (
        <span style={{ color: "var(--color-black)" }}>{option.label}</span>
      );
    }
    const query = inputValue.trim();
    const index = option.label.toLowerCase().indexOf(query.toLowerCase());

    if (!query || index === -1) {
      return (
        <span style={{ color: "rgba(38, 38, 38, 0.4)" }}>{option.label}</span>
      );
    }

    const before = option.label.slice(0, index);
    const match = option.label.slice(index, index + query.length);
    const after = option.label.slice(index + query.length);

    return (
      <span style={{ color: "rgba(38, 38, 38, 0.4)" }}>
        {before}
        <span style={{ color: "var(--color-black)" }}>{match}</span>
        {after}
      </span>
    );
  };

  return (
    <Select<LocationOption, false>
      options={options}
      value={selectedOption}
      inputValue={inputValue}
      instanceId={instanceId}
      onInputChange={handleInputChange}
      onChange={handleChange}
      placeholder="Location"
      isClearable
      formatOptionLabel={formatOptionLabel}
      noOptionsMessage={() => "Start typing a city"}
          styles={selectStyles}
          components={{
  ClearIndicator: CustomClearIndicator,
  DropdownIndicator: CustomDropdownIndicator,
}}
    />
  );
}
