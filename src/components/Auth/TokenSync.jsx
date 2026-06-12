import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../app/authSlice';

export const TokenSync = () => {
    const { getToken, isSignedIn } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(clearToken());
            return;
        }

        // Sincroniza inmediatamente
        const sync = async () => {
            const token = await getToken();
            dispatch(setToken(token));
        };

        sync();

        // Refresca el token cada 50 segundos (antes de que expire a los 60s)
        const interval = setInterval(sync, 50 * 1000);

        return () => clearInterval(interval);
    }, [isSignedIn, getToken, dispatch]);

    return null;
};