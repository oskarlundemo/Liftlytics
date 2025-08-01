import {ExercisesHeader} from "../components/ExercisesComponents/ExercisesHeader.tsx";
import {ExercisesBody} from "../components/ExercisesComponents/ExercisesBody.tsx";
import '../styles/ExercisesStyles/Exerice.css'
import {useExercises} from "../hooks/exerciseHook.ts";
import {useExerciseContext} from "../contexts/ExerciseContext.tsx";
import {useEffect} from "react";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";

export const ConfigureExercisesPages = ({}) => {


    const {setCustomExercises, showMenu, setShowMenu} = useExerciseContext();
    const {data, isLoading, isError, error} = useExercises();

    useEffect(() => {

        if (data) {
            setCustomExercises(data.customExercises);
        }

    }, [data, isLoading]);


    return (

        <div className={'w-full h-full flex gap-4 flex-col overflow-y-auto'}>

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
                            <h2>Testing</h2>
                        </SlideInBottomMenu>

                        <Overlay showOverlay={showMenu} setShowOverlay={() => setShowMenu(false)} />
                    </>
                ))
            )}
        </div>

    )

}