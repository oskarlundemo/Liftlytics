
import '../../styles/MiscStyles/Progressbar.css'

type ProgressBarProps = {
    value: number;
    label?: string;
};


export const Progressbar = ({value, label}:ProgressBarProps) => {


    return (
        <div className="progress-wrapper">
            <div className="progress-label">
                <span>{label}</span>
            </div>
            <div className="progress-bar-bg">
                <span>{value}%</span>
                <div className="progress-bar-fill" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}