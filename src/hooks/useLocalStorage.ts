import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Get initial value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Sync state to localStorage on changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    const addItem = (item: T extends any[] ? any : never) => {
        if (Array.isArray(storedValue)) {
            setStoredValue([...storedValue, item] as any);
        }
    };

    const updateItem = (id: string, updates: Partial<T extends any[] ? any : never>) => {
        if (Array.isArray(storedValue)) {
            setStoredValue(
                storedValue.map((item) => (item.id === id ? { ...item, ...updates } : item)) as any
            );
        }
    };

    const removeItem = (id: string) => {
        if (Array.isArray(storedValue)) {
            setStoredValue(storedValue.filter((item) => item.id !== id) as any);
        }
    };

    return [storedValue, setStoredValue, { addItem, updateItem, removeItem }] as const;
}
