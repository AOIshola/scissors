import React, { useState } from 'react';
import ButtonWithSpinner from './ButtonWithSpinner';

type AuthFormProps = {
    onSubmit: (userData: { email: string; first_name?: string; last_name?: string; password: string; password2?: string }) => Promise<void>;
    isRegistering?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegistering = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({ email, password, ...(isRegistering && { last_name, first_name, password2 }) });
        setLoading(false);
    };

    return (
        <div className="flex justify-center w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-[40%]">
                <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>
                    <label className='self-start my-3 text-lg'>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-amber-50 border border-blue-400 h-12 w-full px-2"
                        required
                    />
                </div>
                {isRegistering && (
                    <>
                        <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>
                            <label className='self-start my-3 text-lg'>Last Name:</label>
                            <input
                                type="text"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-amber-50 border border-blue-400 h-12 w-full px-2"
                                required
                            />
                        </div>
                        <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>
                            <label className='self-start my-3 text-lg'>First Name:</label>
                            <input
                                type="text"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-amber-50 border border-blue-400 h-12 w-full px-2"
                                required
                            />
                        </div>
                    </>
                )}
                <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>
                    <label className='self-start my-3 text-lg'>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-amber-50 border border-blue-400 h-12 w-full px-2"
                        required
                    />
                </div>
                {isRegistering && (
                    <>
                        <div className='my-3 mx-auto w-[80%] flex flex-col items-start'>
                            <label className='self-start my-3 text-lg'>Password2:</label>
                            <input
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className="bg-amber-50 border border-blue-400 h-12 w-full px-2"
                                required
                            />
                        </div>
                    </>
                )}
                <ButtonWithSpinner onClick={() => { }} loading={loading}>
                    {isRegistering ? 'Register' : 'Login'}
                </ButtonWithSpinner>
            </form>
        </div>
    );
};

export default AuthForm;