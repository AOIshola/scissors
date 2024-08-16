import React from 'react';

type ButtonWithSpinnerProps = {
    loading: boolean;
    children: React.ReactNode;
    onClick: () => void;
};

const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({ loading, children, onClick }) => (
    <button
        onClick={onClick}
        disabled={loading}
        className='w-36 h-12 my-3 bg-blue-400 self-center rounded-md font-bold flex items-center justify-center'
    >
        {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
            children
        )}
    </button>
);

export default ButtonWithSpinner;