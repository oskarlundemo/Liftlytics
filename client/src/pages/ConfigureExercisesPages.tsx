import {ExercisesHeader} from "../components/ExercisesComponents/ExercisesHeader.tsx";
import {ExercisesBody} from "../components/ExercisesComponents/ExercisesBody.tsx";
import '../styles/ExercisesStyles/Exerice.css'
import {useDeleteExercise, useExercises} from "../hooks/exerciseHook.ts";
import {useExerciseContext} from "../contexts/ExerciseContext.tsx";
import {useEffect} from "react";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";
import {ExerciseForm} from "../components/ExercisesComponents/ExerciseForm.tsx";
import {PopUp} from "../components/MiscComponents/PopUp.tsx";

export const ConfigureExercisesPages = ({}) => {


    const {setCustomExercises, showMenu, setAllMuscleGroups, selectedExercise, setShowMenu, showPopUp, setShowPopUp} = useExerciseContext();
    const {data: exerciseData, isLoading, isError, error} = useExercises();

    const {
        mutate: deleteExercise,
    } = useDeleteExercise(setCustomExercises);

    useEffect(() => {
        if (exerciseData) {
            setCustomExercises(exerciseData.customExercises);
            setAllMuscleGroups(exerciseData.allMuscleGroup);
        }
    }, [exerciseData, isLoading]);

    const handleDelete = () => {
        if (selectedExercise?.id) {
            deleteExercise(selectedExercise.id);
        }
    };

    return (
        <>

        <div className={'flex overflow-y-auto h-full gap-4 flex-col'}>

            {isLoading ? (
                <LoadingPage title={'Fetcing your custom exercises...'}/>
            ) : (
                (isError ? (
                    <ErrorPage
                        title={'An error occurred while fetching your custom exercises.'}
                        errorMessage={error.message}
                    />
                ) : (
                    <>
                        <ExercisesHeader/>
                        <main className={'w-full h-full flex flex-col configure-main'}>
                            <ExercisesBody/>
                        </main>


                        <SlideInBottomMenu height={'50%'} showMenu={showMenu}>
                            <ExerciseForm/>
                        </SlideInBottomMenu>

                        <PopUp showPop={showPopUp} setShowPop={() => setShowPopUp(false)}>

                            <div className={'text-wrapper mb-5'}>
                                <h1 className={'text-3xl font-bold text-center'} style={{color: 'var(--color-warning)'}}>Warning!</h1>
                                <h2 className={'text-base p-4 text-center'}>Deleting this exercise will remove all the associated data. This action is not reversible</h2>
                            </div>

                            <div className="button-wrapper justify-center">
                                <button type={'button'} className={'button button-intellij button-confirm'} onClick={()=> {handleDelete(); setShowPopUp(false)}}>Yes, delete</button>
                                <button type={'button'} className={'button-intellij button-warning'} onClick={() => {setShowPopUp(false); setShowMenu(true)}}  >No, cancel</button>
                            </div>

                        </PopUp>
                    </>
                ))
            )}
        </div>
            <Overlay showOverlay={showMenu || showPopUp} setShowOverlay={() => setShowMenu(false)}/>
        </>
    )

}