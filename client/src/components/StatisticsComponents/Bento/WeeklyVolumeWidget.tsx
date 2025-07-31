import { VolumeCard } from "./VolumeCard.tsx";
import { useStatsContext } from "../../../contexts/StatsContext.tsx";

type WeeklyVolumeProps = {
    boxIndex: number;
};

export const WeeklyVolumeWidget = ({ boxIndex }: WeeklyVolumeProps) => {
    const { weeklyVolumeData } = useStatsContext();
    const muscleGroupVolume = weeklyVolumeData?.muscleGroupVolume ?? [];
    const numberOfSets = weeklyVolumeData?.numberOfSets ?? 0;

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'weekly-volume widget'}
        >
            <h3 className={'widget-title'}>Weekly volume</h3>

            <div className={'weekly-volume-wrapper'}>
                {muscleGroupVolume.length > 0 ? (
                    muscleGroupVolume.map((item, index) => (
                        <VolumeCard
                            key={index}
                            sets={item.sets}
                            totalSets={numberOfSets}
                            muscleGroup={item.muscleGroup}
                        />
                    ))
                ) : (
                    <h4>Not enough data yet</h4>
                )}
            </div>

            <h4>Sets per muscle / week</h4>
        </div>
    );
};
