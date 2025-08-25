import {useMuscleGroupsContext} from "../contexts/MuscleGroupContext.tsx";
import {useCreateMuscleGroup, useDeleteMuscleGroup, useFetchMuscleGroups} from "../hooks/muscleGroupsHooks.ts";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {AddItem} from "../components/ConfigureComponents/AddItem.tsx";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";
import {CreateConfigureForm} from "../components/ConfigureComponents/CreateConfigureForm.tsx";
import {ConfigureUpdateForm} from "../components/ConfigureComponents/ConfigureUpdateForm.tsx";
import {PopUp} from "../components/MiscComponents/PopUp.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useEffect} from "react";
import {ConfigureBody} from "../components/ConfigureComponents/ConfigureBody.tsx";
import {ConfigureHeader} from "../components/ConfigureComponents/ConfigureHeader.tsx";

/**
 * Purpose:
 * This page let's users configure their custom muscle groups, changing names or deleting them altogether
 *
 * Key components:
 * <ConfigureBody> <ConfigureForm> <SlideInBottomMenu>
 *
 * Notes:
 * Using css for styling and state to toggle the overlay, slide-menus and pop-ups
 *
 * @constructor
 */

export const ConfigureMuscleGroup = ({}) => {

    const {user} = useAuth();
    const {setSelectedMuscleGroup, customMuscleGroups, showCreateMenu,
        setShowCreateMenu, selectedMuscleGroup,setCustomMuscleGroups,
        showMenu, setShowMenu, showPopUp, setShowPopUp} = useMuscleGroupsContext();

    const {data: fetchedData, isLoading, isError, error} = useFetchMuscleGroups(user.id);
    const {mutate: createMuscleGroup} = useCreateMuscleGroup(setCustomMuscleGroups);
    const {mutate: deleteCustomMuscleGroup} = useDeleteMuscleGroup(setCustomMuscleGroups);

    const handleDelete = () => {
        deleteCustomMuscleGroup(selectedMuscleGroup.id || 'Oskar')
    }

    useEffect(() => {
        if (fetchedData)
            setCustomMuscleGroups(fetchedData.data);
    }, [fetchedData])



    if (isError) {
        return <ErrorPage title={'There was an error loading the muscle groups'} errorMessage={error.message} details={error.code}/>
    }

    if (isLoading) {
        return <LoadingPage title={'Loading muscle groups...'}/>
    }

    return (
        <div className={'flex overflow-y-auto h-full gap-4 flex-col'}>

            <ConfigureHeader
                title={'Custom muscle groups'}
            />

            <main className={'w-full h-full flex flex-col configure-main'}>

                <ConfigureBody
                    customData={customMuscleGroups}
                    title={'You have not created any custom muscle groups'}
                    setShowMenu={setShowMenu}
                    setSelectedItem={setSelectedMuscleGroup}
                />

                <AddItem
                    title={'Add muscle group'}
                    setShowMenu={setShowCreateMenu}
                />
            </main>

            <SlideInBottomMenu height={'50%'} showMenu={showCreateMenu}>

                <CreateConfigureForm
                    setShowCreateMenu={setShowCreateMenu}
                    handleCreateMuscleGroup={createMuscleGroup}
                />

            </SlideInBottomMenu>

            <SlideInBottomMenu height={'50%'} showMenu={showMenu}>

                <ConfigureUpdateForm
                    selectedItem={selectedMuscleGroup}
                    setShowMenu={setShowMenu}
                    setShowPopUp={setShowPopUp}
                    setCustomData={setCustomMuscleGroups || []}
                />

            </SlideInBottomMenu>

            <PopUp showPop={showPopUp} setShowPop={() => setShowPopUp(false)}>

                <div className={'text-wrapper mb-5'}>
                    <h1 className={'text-3xl font-bold text-center'} style={{color: 'var(--color-warning)'}}>Warning!</h1>
                    <h2 className={'text-base p-4 text-center'}>Deleting this muscle group will remove all the associated data. This action is not reversible</h2>
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