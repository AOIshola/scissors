import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router';

const RegisterPage: React.FC = () => {
    const { registerUser } = useAuth();

    const navigate = useNavigate()
    const handleRegister = async (userData: { email: string; first_name?: string; last_name?: string; password: string; password2?: string }) => {
        console.log(userData)
        await registerUser(userData);
        navigate('/login')
    };

    return (
        <div className='flex flex-col items-center w-full border'>
            <h1 className='text-3xl py-4'>Create a New Account</h1>
            <AuthForm onSubmit={handleRegister} isRegistering />
        </div>
    );
};

export default RegisterPage;
