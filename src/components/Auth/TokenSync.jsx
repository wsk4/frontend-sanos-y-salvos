// src/components/Auth/TokenSync.jsx
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../app/authSlice';

export const TokenSync = () => {
    const { getToken, isSignedIn, isLoaded } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            dispatch(clearToken());
            return;
        }

        const sync = async () => {
            const token = await getToken();
            dispatch(setToken(token));
        };

        sync();

        const interval = setInterval(sync, 50 * 1000);
        return () => clearInterval(interval);

    }, [isLoaded, isSignedIn, getToken, dispatch]);

    return null;
};