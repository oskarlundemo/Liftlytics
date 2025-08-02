import '../../styles/MiscStyles/PopUp.css'


type PopUpProps = {
    children: React.ReactNode;
    showPop: boolean;
    setShowPop: (show: boolean) => void;
}



export const PopUp = ({children, showPop, setShowPop}:PopUpProps) => {

    return (
        <section className={`pop-up ${showPop ? 'show-pop' : ''}`}>

            <div className="pop-up-header flex justify-end">
                <svg onClick={() => setShowPop(false)} className={'error-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>

            {children}
        </section>
    )

}