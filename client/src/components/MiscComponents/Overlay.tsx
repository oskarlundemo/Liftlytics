

import '../../styles/MiscStyles/Overlay.css'

type OverlayProps = {
    showOverlay: boolean,
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Overlay = ({showOverlay, setShowOverlay}: OverlayProps) => {

    return (
        <div
            onClick={() => {
                setShowOverlay(false)
            }}
            className={`overlay ${showOverlay ? 'show' : ''}`}></div>
    )
}