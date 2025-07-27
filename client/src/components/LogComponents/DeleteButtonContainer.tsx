import {useDeleteLog} from "../../hooks/logHook.ts";
import toast from "react-hot-toast";
import {useLog} from "../../contexts/LogContext.tsx";
import '../../styles/MiscStyles/DeleteButtonContainer.css'

export const DeleteButtonContainer = ({}) => {

    const { mutate: deleteLog, isPending, isError } = useDeleteLog();
    const {setShowDeleteMenu, deleteLogId} = useLog();

    const handleDelete = () => {
        if (!deleteLogId) return;

        const toastId = toast.loading('Deleting...');

        deleteLog(deleteLogId, {
            onSuccess: () => {
                toast.success('Workout deleted successfully!', { id: toastId });
                setShowDeleteMenu(false);
            },
            onError: () => {
                toast.error('Error while deleting log', { id: toastId });
            },
        });
    };


    const handleCancel = () => {
        setShowDeleteMenu(false)
    }


    return (
        <div className="delete-button-container">

            <h3>Are you sure you want to delete this workout? This action can't be undone </h3>

            <div className="button-wrapper">
                <button className={'button button-intellij button-confirm'} onClick={()=> handleDelete()}>Yes, delete</button>
                <button className={'button-intellij button-warning'} onClick={() => handleCancel()}  >No, cancel</button>
            </div>

        </div>
    )
}