import {ConfigureHeader} from "../components/ConfigureComponents/ConfigureHeader.tsx";
import {ConfigureBody} from "../components/ConfigureComponents/ConfigureBody.tsx";
import '../styles/ExercisesStyles/Exerice.css'
import {useCreateCustomExercise, useDeleteExercise, useExercises} from "../hooks/exerciseHook.ts";
import {useExerciseContext} from "../contexts/ExerciseContext.tsx";
import {useEffect} from "react";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";
import {ConfigureUpdateForm} from "../components/ConfigureComponents/ConfigureUpdateForm.tsx";
import {PopUp} from "../components/MiscComponents/PopUp.tsx";
import {AddItem} from "../components/ConfigureComponents/AddItem.tsx";
import {CreateConfigureForm} from "../components/ConfigureComponents/CreateConfigureForm.tsx";

export const ConfigureExercisesPage = ({}) => {

    const {setCustomExercises, customExercises, setSelectedExercise, showMenu, allMuscleGroups, setAllMuscleGroups, showCreateMenu,
        setShowCreateMenu, selectedExercise, setShowMenu, showPopUp, setShowPopUp} = useExerciseContext();

    const {data: exerciseData, isLoading, isError, error} = useExercises();
    const { mutate: createExercise } = useCreateCustomExercise(setCustomExercises);

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

    if (isLoading) {
        return (
            <LoadingPage title={'Loading your custom exercises...'}/>
        )
    }

    if (isError) {
        return (
            <ErrorPage
                title={'An error occurred while fetching your custom exercises.'}
                errorMessage={error.message}
            />
        )
    }

    return (
        <div className={'flex overflow-y-auto h-full gap-4 flex-col'}>

            <ConfigureHeader
                title={'Custom exercises'}
            />

            <main className={'w-full h-full flex flex-col configure-main'}>
                <ConfigureBody
                    customData={customExercises}
                    title={'You have not created any custom exercises'}
                    setSelectedItem={setSelectedExercise}
                    setShowMenu={setShowMenu}
                />

                <AddItem
                    title={'Add exercise'}
                    setShowMenu={setShowCreateMenu}
                />

            </main>

            <SlideInBottomMenu height={'50%'} showMenu={showCreateMenu}>
                <CreateConfigureForm
                    setShowCreateMenu={setShowCreateMenu}
                    muscleGroups={allMuscleGroups}
                    handleCreateExercise={createExercise}
                />
            </SlideInBottomMenu>

            <SlideInBottomMenu height={'50%'} showMenu={showMenu}>
                <ConfigureUpdateForm
                    selectedItem={selectedExercise}
                    setShowMenu={setShowMenu}
                    muscleGroups={allMuscleGroups}
                    setShowPopUp={setShowPopUp}
                    setCustomData={setCustomExercises}
                />
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

            <Overlay showOverlay={showMenu || showPopUp || showCreateMenu} setShowOverlay={() => {
                setShowMenu(false);
                setShowCreateMenu(false);
            }}/>

        </div>
    )
}