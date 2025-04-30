import React, { useState } from 'react';

const FoodSearchPage = ({ onClose, onAddMeal }) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchText) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://pratikw.pythonanywhere.com/foods/${searchText}`);
            
            if (response.status === 404) {
                throw new Error('Food not found');
            }
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Add meal to the parent component
            onAddMeal({
                name: result.name,
                calories: result.calories,
                url: result.url,
                carbs: result.carbs,
                protein: result.protein,
                allergens: result.allergens,
                fat: result.fat
            });

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        onClose();
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-5 rounded-md shadow-md'>
                <div className='flex justify-between mb-4'>
                    <h2 className='text-xl font-bold'>Search for Food</h2>
                    <button className='text-red-600' onClick={onClose}>
                        Close
                    </button>
                </div>
                <input
                    type='text'
                    placeholder='Enter food name'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    className='w-full p-2 border rounded-md mb-4'
                />
                <button
                    onClick={handleSearch}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
                {error && <p className='text-red-500 mt-2'>Error: {error}</p>}
            </div>
        </div>
    );
};

export default FoodSearchPage;
