import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        userLoggedIn ? (
            <nav className='flex flex-row gap-x-2 w-full z-20  top-0 left-0 h-12 border-b pl-2 bg-red-200'>
                <button 
                    onClick={() => { 
                        doSignOut().then(() => { 
                            navigate('/home/index.jsx   ');
                        });
                    }} 
                    className='text-sm text-red-600 underline'>
                    Logout
                </button>
            </nav>
        ) : (
            <></> // Render nothing if the user is not logged in
        )
    );
}

export default Header;
