

type WeeklyVolumeProps = {
    boxIndex: number
}


export const WeeklyVolumeWidget = ({boxIndex}:WeeklyVolumeProps ) => {


    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'weekly-volume widget'}>

            <h3 className={'widget-title'}>Weekly volume</h3>




        </div>
    )
}