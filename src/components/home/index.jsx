import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Avatar, CircularProgress } from '@mui/material';
import Progress from './components-home/progress';
import Meal from './components-home/meal';

const Home = () => {
    const { currentUser } = useAuth();
    const [date, setDate] = useState('');

    const [breakfastTotals, setBreakfastTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    const [morningSnackTotals, setMorningSnackTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    const [lunchTotals, setLunchTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    const [eveningSnackTotals, setEveningSnackTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    const [dinnerTotals, setDinnerTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        activityLevel: '',
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
    });
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const calculateRequirements = (e) => {
        e.preventDefault();
        setLoading(true);

        const { height, weight, activityLevel } = formData;

        const bmr = 10 * weight + 6.25 * height - 5 * 25 + 5; // Simplified for a male
        let activityMultiplier = 1.2; // Default sedentary
        if (activityLevel === 'light') activityMultiplier = 1.375;
        else if (activityLevel === 'moderate') activityMultiplier = 1.55;
        else if (activityLevel === 'active') activityMultiplier = 1.725;

        const dailyCalories = bmr * activityMultiplier;
        const dailyCarbs = (dailyCalories * 0.5) / 4; // 50% of calories from carbs
        const dailyFat = (dailyCalories * 0.25) / 9;  // 25% of calories from fat
        const dailyProtein = (dailyCalories * 0.25) / 4; // 25% of calories from protein

        setFormData({
            ...formData,
            calories: dailyCalories.toFixed(0),
            carbs: dailyCarbs.toFixed(0),
            fat: dailyFat.toFixed(0),
            protein: dailyProtein.toFixed(0),
        });

        setTimeout(() => {
            setLoading(false);
            setFormSubmitted(true);
        }, 2000); // 2 seconds loading time
    };

    const calculateTotal = () => {
        return [breakfastTotals, morningSnackTotals, lunchTotals, eveningSnackTotals, dinnerTotals].reduce(
            (acc, current) => {
                acc.calories += current.calories;
                acc.protein += current.protein;
                acc.carbs += current.carbs;
                acc.fats += current.fats;
                return acc;
            },
            { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
    };

    const handleTotalsUpdate = (mealType, newTotals) => {
        switch (mealType) {
            case 'Breakfast':
                setBreakfastTotals(newTotals);
                break;
            case 'Morning Snack':
                setMorningSnackTotals(newTotals);
                break;
            case 'Lunch':
                setLunchTotals(newTotals);
                break;
            case 'Evening Snack':
                setEveningSnackTotals(newTotals);
                break;
            case 'Dinner':
                setDinnerTotals(newTotals);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        setDate(formattedDate);
    }, []);

    const total = calculateTotal();

    // Extract daily requirements from formData
    const dailyRequirements = {
        calories: parseFloat(formData.calories),
        carbs: parseFloat(formData.carbs),
        protein: parseFloat(formData.protein),
        fats: parseFloat(formData.fat),
    };

    return (
        <>
            {!formSubmitted ? (
                <div className="p-4 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center">Enter Your Information</h2>
                    <form onSubmit={calculateRequirements} className="space-y-4 mt-4">
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold mb-2">Height (cm):</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                required
                                className="border p-3 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold mb-2">Weight (kg):</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                className="border p-3 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg font-semibold mb-2">Activity Level:</label>
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                required
                                className="border p-3 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select...</option>
                                <option value="sedentary">Sedentary (little to no exercise)</option>
                                <option value="light">Light (light exercise)</option>
                                <option value="moderate">Moderate (exercise 3-5 days a week)</option>
                                <option value="active">Active (hard exercise 6-7 days a week)</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    {loading && (
                        <div className="flex justify-center mt-4">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="flex justify-between p-5">
                        <div>
                            <p className="text-2xl font-bold">Hi, {currentUser.displayName}!</p>
                            <br />
                            <p className="text-xl font-semibold text-gray-500 -mt-7">New Day, New Life</p>
                        </div>
                        <div className="text-4xl">
                            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
                        </div>
                    </div>
                    <Progress total={total} dailyRequirements={dailyRequirements} />
                    <div className="flex justify-between items-center p-2 m-3 pt-1 rounded-md bg-slate-400">
                        <div className='text-3xl p-2 text-gray-200 font-extrabold italic'>{date}</div>
                        <div className='text-white text-3xl font-bold'>{total.calories} Kcal</div>
                    </div>
                    <div className='-mt-5'>
                        <Meal title="Breakfast" onTotalsChange={(newTotals) => handleTotalsUpdate('Breakfast', newTotals)} />
                    </div>
                    <Meal title="Morning Snack" onTotalsChange={(newTotals) => handleTotalsUpdate('Morning Snack', newTotals)} />
                    <Meal title="Lunch" onTotalsChange={(newTotals) => handleTotalsUpdate('Lunch', newTotals)} />
                    <Meal title="Evening Snack" onTotalsChange={(newTotals) => handleTotalsUpdate('Evening Snack', newTotals)} />
                    <Meal title="Dinner" onTotalsChange={(newTotals) => handleTotalsUpdate('Dinner', newTotals)} />
                </div>
            )}
        </>
    );
};

export default Home;
