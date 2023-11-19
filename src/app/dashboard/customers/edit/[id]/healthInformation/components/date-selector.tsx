import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export const DateSelector = ({ onDateChange }: any) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        onDateChange(selectedDate.toISOString().split('T')[0]);
    }, [selectedDate, onDateChange]);

    const adjustWeek = (offset: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + offset);
        setSelectedDate(newDate);
    };

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - 3 + i); // Centraliza a data selecionada
        return d;
    });

    const handleSpecificDateChange = (event: any) => {
        const [year, month, day] = event.target.value.split('-');
        const newDate = new Date(year, month - 1, day);
        setSelectedDate(newDate);
    };

    const formatDate = (date: Date, options: any) => {
        return date.toLocaleDateString('pt-BR', options);
    };

  return (
    <div className="w-full flex flex-col items-center space-y-2 py-4">
        <div className="flex flex-col items-center">
            <input 
                type="date" 
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleSpecificDateChange}
                className="form-input px-4 py-2 border rounded-md"
            />
            {/* <span className="mt-1 text-sm">{formatDate(selectedDate, { weekday: 'long' })}</span> */}
        </div>
        <div className="flex items-center justify-between w-full px-2">
            <button 
                onClick={() => adjustWeek(-1)}
                className="px-2 py-1 text-white bg-gray-700 rounded-full"
            >
                <ArrowLeftIcon />
            </button>
            {weekDays.map((day, index) => (
                <button
                    key={index}
                    className={`px-2 py-1 rounded-md text-sm ${day.toDateString() === selectedDate.toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
                    onClick={() => setSelectedDate(day)}
                >
                    {formatDate(day, { weekday: 'short', day: 'numeric' })}
                </button>
            ))}
            <button 
                onClick={() => adjustWeek(1)}
                className="px-2 py-1 text-white bg-gray-700 rounded-full text-center"
            >
                <ArrowRightIcon />
            </button>
        </div>
    </div>
  );
}
