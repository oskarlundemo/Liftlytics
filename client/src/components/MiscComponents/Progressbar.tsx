
import '../../styles/MiscStyles/Progressbar.css'

type ProgressBarProps = {
    value: number;
    label?: string;
};


export const Progressbar = ({value, label}:ProgressBarProps) => {


    return (
        <div className="progress-wrapper">
            <div className="progress-label">
                <span className={'text-base '} style={{color: 'var(--color-text-muted)'}}>{label}</span>
            </div>
            <div className="progress-bar-bg">
                <span className={'text-base font-bold '} style={{color: 'var(--color-text)'}}>{value}%</span>
                <div className="progress-bar-fill" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}