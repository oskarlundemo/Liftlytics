import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {useState} from "react";
import {PopUp} from "../components/MiscComponents/PopUp.tsx";
import {AccountHeader} from "../components/AccountComponents/AccountHeader.tsx";
import {AccountCard} from "../components/AccountComponents/AccountCard.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useDeleteUser} from "../hooks/useAuthorzation.ts";
import {useNavigate} from "react-router-dom";


export const Account = ({}) => {

    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const {mutate: deleteUser} = useDeleteUser();
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteUser(undefined, {
            onSuccess: () => {
                logout();
                navigate('/login');
            },
        });
    };

    return (
        <div className={`account-wrapper h-full gap-10 flex flex-col`}>

            <AccountHeader/>

            <main style={{maxWidth: 'var(--max-context-width', margin:'0 auto'}} className={'account-main w-full h-full flex flex-col gap-10 flex-grow'}>

                <AccountCard
                    title={'Log out'}
                    onClick={() => logout()}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    }
                />

                <AccountCard
                    title={'Delete account'}
                    onClick={() => setShowPopUp(true)}
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                    }
                />

            </main>


            <PopUp showPop={showPopUp} setShowPop={() => setShowPopUp(false)}>

                <div className={'text-wrapper mb-5'}>
                    <h1 className={'text-3xl font-bold text-center'} style={{color: 'var(--color-warning)'}}>Warning!</h1>
                    <h2 className={'text-base p-4 text-center'}>Deleting your account will remove the profile and the associated data. This action is not reversible!</h2>
                </div>

                <div className="button-wrapper justify-center">
                    <button type={'button'} className={'button button-intellij button-confirm'} onClick={()=> {handleDelete(); setShowPopUp(false)}}>Yes, delete</button>
                    <button type={'button'} className={'button-intellij button-warning'} onClick={() => {setShowPopUp(false); setShowPopUp(false)}}>No, cancel</button>
                </div>

            </PopUp>

            <Overlay showOverlay={showPopUp} setShowOverlay={() => {setShowPopUp(false)}} />
        </div>
    )

}