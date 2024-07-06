import { useEffect, useState } from 'react';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    const currentValue = localStorage.getItem(key);

    if (currentValue) {
      return JSON.parse(currentValue);
    } else {
      return defaultValue;
    }
  });

  const clearValue = () => localStorage.removeItem(key);

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);

  return { value, setValue, clearValue };
};
