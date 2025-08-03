

type ExerciseModuleFooterProps = {
    addSet: () => void;
}


export const ExerciseModuleFooter = ({addSet}: ExerciseModuleFooterProps) => {

    return (
        <div className="exercise-module-footer">

            <h3 className={'text-base'} onClick={() => addSet()}>Add set</h3>

            <div className="exercise-module-footer-icons">


            </div>

        </div>
    )
}