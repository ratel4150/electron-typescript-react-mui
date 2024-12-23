// src\renderer\hooks\useLocalStorage.ts
import React from 'react'

function useLocalStorage(keyName:any, defaultValue:any) {

    const [storedValue, setStoredValue] = React.useState(() => {
        try {
          const value = window.localStorage.getItem(keyName);
          if (value) {
            return JSON.parse(value);
          } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
          }
        } catch (err) {
          return defaultValue;
        }
      });
      const setValue = (newValue:any) => {
        try {
          window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
          console.log(err);
        }
        setStoredValue(newValue);
      };
      return [storedValue, setValue];
}

export default useLocalStorage
