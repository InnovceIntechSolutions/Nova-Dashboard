import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { CalendarProps } from '../constants/types';

const Calendar: React.FC<CalendarProps> = ({ selectedDate, style }) => {
  const [date, setDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  return (
    <div className="card card-body calendar-container" >
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MMM dd, yyyy"
        className="date-picker-input"
        inline
      />
    </div>
  );
};

export default Calendar;
