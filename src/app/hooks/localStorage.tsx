import {useCallback} from 'react';

type ReturnValue = {
    load: (key: string) => string;
    save: (key: string, value: string) => boolean;
    remove: (key: string) => void;
};

const useLocalStorage = (): ReturnValue => {
    const storage = 'localStorage';

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const load = useCallback(
        (key: string): string => {
            return isBrowser ? window[storage][key] : '';
        },
        [isBrowser],
    );

    const save = useCallback(
        (key: string, value: string): boolean => {
            if (isBrowser) {
                window[storage].setItem(key, value);
                return true;
            }

            return false;
        },
        [isBrowser],
    );

    const remove = useCallback(
        (key: string): void => {
            if (isBrowser) {
                window[storage].removeItem(key);
            }
        },
        [isBrowser],
    );

    return {
        load,
        save,
        remove,
    };
};

export default useLocalStorage;
