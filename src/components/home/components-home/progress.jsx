import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

const Progress = ({ total, dailyRequirements }) => {
    // Calculate progress for each nutrient
    const calorieProgress = (total.calories / dailyRequirements.calories) * 100;
    const remainingCalories = dailyRequirements.calories - total.calories;

    const carbProgress = (total.carbs / dailyRequirements.carbs) * 100;
    const proteinProgress = (total.protein / dailyRequirements.protein) * 100;
    const fatProgress = (total.fats / dailyRequirements.fats) * 100;

    // Define thresholds
    const getColor = (value, threshold) => (value > threshold ? 'red' : 'blue');

    return (
        <div className="p-5 m-3 rounded-md bg-slate-400">
            <div className='flex justify-between items-center'>
                <div className="relative w-[200px] h-[200px]">
                    <div className="scale-x-[-1]">
                        <CircularProgress
                            variant="determinate"
                            size={200}
                            value={calorieProgress}
                            className="rounded-[25%]"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                        <p className="text-6xl font-bold">{remainingCalories.toFixed(0)}</p>
                        <p className="text-m mt-1">Remaining Calories</p>
                    </div>
                </div>

                <div className="pr-5">
                    <div className="h-[250px] w-[2px] bg-gray-500"></div>
                </div>

                <div className="pt-2 pr-8 flex flex-col gap-5">
                    {/* Carbs */}
                    <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Carbs</span>
                        <LinearProgress
                            variant="determinate"
                            value={carbProgress}
                            sx={{
                                height: '8px',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: getColor(total.carbs, dailyRequirements.carbs),
                                    borderRadius: '5px',
                                },
                                backgroundColor: 'lightgray',
                                borderRadius: '5px',
                            }}
                        />
                        <span style={{ fontSize: '0.8rem' }}>{total.carbs.toFixed(1)}/{dailyRequirements.carbs.toFixed(0)} g</span>
                    </div>

                    {/* Protein */}
                    <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Protein</span>
                        <LinearProgress
                            variant="determinate"
                            value={proteinProgress}
                            sx={{
                                height: '8px',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: getColor(total.protein, dailyRequirements.protein),
                                    borderRadius: '5px',
                                },
                                backgroundColor: 'lightgray',
                                borderRadius: '5px',
                            }}
                        />
                        <span style={{ fontSize: '0.8rem' }}>{total.protein.toFixed(1)}/{dailyRequirements.protein.toFixed(0)} g</span>
                    </div>

                    {/* Fats */}
                    <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Fats</span>
                        <LinearProgress
                            variant="determinate"
                            value={fatProgress}
                            sx={{
                                height: '8px',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: getColor(total.fats, dailyRequirements.fats),
                                    borderRadius: '5px',
                                },
                                backgroundColor: 'lightgray',
                                borderRadius: '5px',
                            }}
                        />
                        <span style={{ fontSize: '0.8rem' }}>{total.fats.toFixed(1)}/{dailyRequirements.fats.toFixed(0)} g</span>
                    </div>
                </div>
            </div>
            <div className='pl-3'>
                <p className="text-6xl font-bold italic">{dailyRequirements.calories.toFixed(0)}</p>
                <p className="text-m mt-1">Total Target Calories</p>
            </div>
        </div>
    );
};

export default Progress;
