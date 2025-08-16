
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
            <h2 className={'text-xl font-bold'}>{title}</h2>
            <DatePicker enableTabLoop={false} selected={date} onChange={(date) => setDate(date)} />

            <TimePicker
                onChange={(newTime) => {
                    if (newTime instanceof Date) {
                        setTime(newTime);
                    } else if (typeof newTime === 'string') {
                        const [hours, minutes] = newTime.split(':').map(Number);
                        const updatedTime = new Date(date);
                        updatedTime.setHours(hours, minutes, 0, 0);
                        setTime(updatedTime);
                    }
                }}
                value={time}
                disableClock={true}
                clearIcon={null}
                clockIcon={null}
                format="HH:mm"
            />
        </div>
    );
};