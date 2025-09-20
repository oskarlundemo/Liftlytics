
import {Progressbar} from "../../MiscComponents/Progressbar.tsx";

type VolumeCardProps = {
    sets: number | null;
    muscleGroup: string | null;
    totalSets: number | null;
};

export const VolumeCard = ({ sets, totalSets, muscleGroup }: VolumeCardProps) => {

    // @ts-ignore
    const percentage = Math.round((sets / totalSets) * 100);

    return (
        <div className="volume-card">
            <Progressbar label={muscleGroup || 'Biceps'} value={percentage} />
        </div>
    );
};
