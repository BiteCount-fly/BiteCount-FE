import React, { useState, useEffect } from 'react';
import { createSvgIcon } from '@mui/material/utils';
import FoodSearchPage from './searchModal';

const Meal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meals, setMeals] = useState([]);
    const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

    // Recalculate totals whenever meals change
    useEffect(() => {
        const calculateTotals = () => {
            return meals.reduce((totals, meal) => {
                totals.calories += meal.calories;
                totals.protein += meal.protein;
                totals.carbs += meal.carbs;
                totals.fats += meal.fat;
                return totals;
            }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
        };

        const newTotals = calculateTotals();
        setTotals(newTotals);

        // Notify the parent component of the change
        if (props.onTotalsChange) {
            props.onTotalsChange(newTotals);
        }
    }, [meals]); // Only depend on meals

    const PlusIcon = createSvgIcon(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
    );

    const MinusIcon = createSvgIcon(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>,
        'Minus',
    );

    // Function to add a new meal
    const addMeal = (meal) => {
        setMeals((prevMeals) => [...prevMeals, meal]);
    };

    // Function to remove a meal
    const removeMeal = (index) => {
        setMeals((prevMeals) => {
            const updatedMeals = prevMeals.filter((_, mealIndex) => mealIndex !== index);
            // Return the updated list of meals
            return updatedMeals;
        });
    };

    return (
        <>
            <div className={`p-3 m-3 rounded-md bg-blue-400 text-white ${isModalOpen ? 'blur-sm' : ''}`}>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <div className='text-2xl font-bold pb-2 text-white'>
                            {props.title}
                        </div>
                        <div className='font-semibold text-2xl'>
                            {totals.calories} kcal
                        </div>
                    </div>

                    {meals.map((meal, index) => (
                        <div key={index} className='flex justify-between items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <img src={meal.url} alt={`${meal.name}-img`} className='h-[50px] w-[50px] rounded-md' />
                                <div className='font-semibold'>{meal.name}</div>
                            </div>
                            <div className='flex gap-3 items-center '>
                                <div className='font-semibold'>{meal.calories} Kcal</div>
                                <button
                                    className='bg-red-400 text-white p-2 rounded-full flex items-center justify-center w-8 h-8'
                                    onClick={() => removeMeal(index)}
                                >
                                    <MinusIcon />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div
                        className='flex justify-center mt-4 cursor-pointer'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <button className='bg-gray-200 text-blue-600 font-semibold py-2 px-4 rounded-md flex items-center gap-2'>
                            <PlusIcon />
                            Add more Meal
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <FoodSearchPage onClose={() => setIsModalOpen(false)} onAddMeal={addMeal} />
            )}
        </>
    );
};

export default Meal;
