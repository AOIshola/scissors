import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router';

const LoginPage: React.FC = () => {
    const { loginUser, isAuthorized } = useAuth();

    useEffect(() => {
		if (isAuthorized) {
			navigate('/', { replace: true })
		}
	}, [isAuthorized])

    const navigate = useNavigate();

    const handleLogin = async (userData: { email: string; password: string }) => {
        await loginUser(userData);
        navigate('/')
    };

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl py-4'>Login to Your Account</h1>
            <AuthForm onSubmit={handleLogin} />
        </div>
    );
};

export default LoginPage;