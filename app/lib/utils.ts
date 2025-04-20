import { getCountryDataList } from 'countries-list';

const countryData = getCountryDataList();

export const getCountryFromName = (name: string) => {
  const country = Object.values(countryData).find((country) => country.name.toLowerCase() === name.toLowerCase());
  if (!country) return null;

  return {
    name: country.name,
    code: country.iso2,
  };
};

export const getCountryFromCode = (code: string) => {
  const country = Object.values(countryData).find((country) => country.iso2.toLowerCase() === code.toLowerCase());
  if (!country) return null;

  return {
    name: country.name,
    code: country.iso2,
  };
};
