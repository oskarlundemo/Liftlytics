
import {Progressbar} from "../../MiscComponents/Progressbar.tsx";

type VolumeCardProps = {
    sets: number;
    muscleGroup: string;
    totalSets: number;
};

export const VolumeCard = ({ sets, totalSets, muscleGroup }: VolumeCardProps) => {
    const percentage = Math.round((sets / totalSets) * 100);


    return (
        <div className="volume-card">
            <Progressbar label={muscleGroup || 'Biceps'} value={percentage} />
        </div>
    );
};
