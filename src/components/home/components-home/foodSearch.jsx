import React, { useState } from 'react';

const FoodSearchPage = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://pratikw.pythonanywhere.com/foods/${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(response.url); // Log the actual result (parsed JSON) here
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Search for Food</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type='text' 
                    placeholder='Enter food name...' 
                    value={query}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
                <button 
                    type='submit' 
                    className='bg-blue-500 text-white py-2 px-4 rounded-md'
                >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className='text-red-500'>Error: {error}</p>}
        </div>
    );
};

export default FoodSearchPage;
