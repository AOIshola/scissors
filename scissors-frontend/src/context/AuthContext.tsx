import { useContext, useState, useEffect, createContext, ReactNode } from 'react'
import { isExpired } from 'react-jwt'
import { auth } from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
// import { useToast } from '@chakra-ui/react';

type User = {
    id: string;
    email: string;

}

type AuthContextType = {
    user: User | null
    isRegistered: boolean;
    isAuthorized: boolean;
    loading: boolean;
    setIsAuthorized: (isAuthorized: boolean) => void
    setIsRegistered: (isRegistered: boolean) => void
    loginUser: (userData: { email: string; password: string }) => Promise<string | void>;
    logoutUser: () => void
    registerUser: (userData: { email: string; first_name?: string; last_name?: string; password: string; password2?: string }) => Promise<string | void>;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false);

    // const toast = useToast();

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
            checkUserStatus().catch(() => setIsAuthorized(false));
            setLoading(false)
        }, 2500);
    }, []);

    const loginUser = async (userData: { email: string; password: string }): Promise<string | void> => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        try {
            const response = await auth.post('/login/', userData)
            if (response.status === 200) {
                const accessToken = response.data.access_token
                const refreshToken = response.data.refresh_token
                const currentUser = response.data
                // console.log(response)
                localStorage.setItem(ACCESS_TOKEN, accessToken)
                localStorage.setItem(REFRESH_TOKEN, refreshToken)
                localStorage.setItem('user', JSON.stringify(currentUser))
                setIsAuthorized(true);
                setIsRegistered(false)
                setUser(currentUser);
                // toast({
                //     title: 'Login Successful',
                //     status: 'success',
                //     duration: 3000,
                //     isClosable: true,
                // });
            }
        } catch (error: any) {
            console.log(error)
            const errMessage = error.response.data.detail
            if (errMessage === 'invalid credentials try again') {
                // toast({
                //     title: 'Login Failed',
                //     description: 'Please check your credentials and try again.',
                //     status: 'error',
                //     duration: 3500,
                //     isClosable: true,
                // });
            } else if (errMessage === 'Email is not verified') {
                // toast({
                //     title: 'Login Failed',
                //     description: `${errMessage}. Redirecting...`,
                //     status: 'error',
                //     duration: 3000,
                //     isClosable: true,
                // });
                setIsRegistered(true)
            } else {
                // toast({
                //     title: 'Login Failed',
                //     description: 'An error occured.',
                //     status: 'error',
                //     duration: 3000,
                //     isClosable: true,
                // })
            };
            return errMessage
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        localStorage.removeItem('user')
        setIsAuthorized(false)
        setUser(null)
        // toast({
        //     title: 'Logout Successful',
        //     status: 'success',
        //     duration: 2000,
        //     isClosable: true,
        // });
    }

    const registerUser = async (userData: { email: string; first_name?: string; last_name?: string; password: string; password2?: string }): Promise<string | void> => {
        localStorage.clear()
        try {
            const response = await auth.post('/register/', userData,);
            if (response.status === 201) {
                setIsRegistered(true)
                // toast({
                //     title: 'Registration Successful',
                //     status: 'success',
                //     duration: 3000,
                //     isClosable: true,
                // });
                // toast({
                //     title: 'An OTP has been sent to your email for verification',
                //     status: 'success',
                //     duration: 3000,
                //     isClosable: true,
                // });
            }
        } catch (error: any) {
            console.log(error)
            // const errMessage = error.response.data.email[0]
            // if (error.response.status === 400 &&
            //     errMessage === 'user with this Email Address already exists.') {
            //     // toast({
            //     //     title: `${errMessage} Try logging in`,
            //     //     status: 'error',
            //     //     duration: 3500,
            //     //     isClosable: true,
            //     // });
            // }
            // return errMessage
        }
    }

    const refreshToken = async (): Promise<void> => {
        const refresh: string | null = localStorage.getItem('refresh');
        const currentUser: string | null = localStorage.getItem('user');
        
        // Ensure the refresh token is available
        if (!refresh) {
            setIsAuthorized(false);
            return;
        }
    
        const token = { refresh };
    
        try {
            const response = await auth.post<{ access: string }>('/token/refresh/', token);
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                if (currentUser) {
                    setUser(JSON.parse(currentUser));
                }
                setIsAuthorized(true);
            }
        } catch (error) {
            console.error(error);
            setIsAuthorized(false);
        }
    };
    
    const checkUserStatus = async (): Promise<void> => {
        const token: string | null = localStorage.getItem('access');
        const currentUser: string | null = localStorage.getItem('user');
    
        if (!token) {
            setIsAuthorized(false);
            localStorage.removeItem('user');
            return;
        }
    
        if (isExpired(token)) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
            if (currentUser) {
                setUser(JSON.parse(currentUser));
            }
        }
    };    

 
    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                isRegistered,
                isAuthorized,
                setIsAuthorized,
                setIsRegistered,
                loginUser,
                logoutUser,
                registerUser,
            }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext