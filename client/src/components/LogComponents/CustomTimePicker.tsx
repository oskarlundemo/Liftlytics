
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Workout/NewWorkout.css'

type CustomTimePickerProps = {
    title: string,
    date: Date,
    setDate: (date: Date) => void,
    time: Date,
    setTime: (time: Date) => void,
}

export const CustomTimePicker = ({title, setTime, time, setDate, date}:CustomTimePickerProps) => {

    return (
        <div className="custom-timer">
            <h2>{title}</h2>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            <TimePicker
                onChange={setTime}
                value={time}
                disableClock={true}
                clearIcon={null}
                clockIcon={null}
            />
        </div>
    );
};