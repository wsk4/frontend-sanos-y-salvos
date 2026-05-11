import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../app/authSlice';

export const TokenSync = () => {
    const { getToken, isSignedIn } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const sync = async () => {
            if (isSignedIn) {
                const token = await getToken();
                dispatch(setToken(token));
            } else {
                dispatch(clearToken());
            }
        };
        sync();
    }, [isSignedIn, getToken, dispatch]);

    return null;
};