import { useState } from "react";

export function useDebouncedState<T>(delay: number, initialValue: T | undefined = undefined): [T | undefined, (value: T | undefined) => void] {
    const [value, setValue] = useState<T | undefined>(initialValue);
    let timer: NodeJS.Timeout;

    function setDebouncedValue(value: T | undefined) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setValue(value);
        }, delay);
    }


    return [value, setDebouncedValue];
}