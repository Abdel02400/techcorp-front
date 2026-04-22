import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useMounted = (): boolean => {
    return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
};
