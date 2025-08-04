import '../../styles/ExercisesStyles/Exerice.css'

type CustomExerciseProps = {
    name: string
    item: object
    setSelectedItem: (item: any) => void;
    setShowMenu: (showCreateMenu: boolean) => void;
}


export const CustomConfigureCard = ({name, item, setShowMenu, setSelectedItem}:CustomExerciseProps) => {

    return (
        <div onClick={() => {setSelectedItem(item); setShowMenu(true)}} className="custom-exercise-card m-4">
            <h2 className={'text-2xl font-bold'}>{name}</h2>
        </div>
    )
}