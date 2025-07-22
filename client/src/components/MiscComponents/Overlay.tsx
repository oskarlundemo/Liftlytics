

import '../../styles/MiscStyles/Overlay.css'

type OverlayProps = {
    showOverlay: boolean,
    setShowOverlay: () => void; // ✅ This is a callback now
}


export const Overlay = ({showOverlay, setShowOverlay}: OverlayProps) => {

    return (
        <div
            onClick={setShowOverlay}
            className={`overlay ${showOverlay ? 'show' : ''}`}></div>
    )
}