

import '../../styles/MiscStyles/Overlay.css'

type OverlayProps = {
    showOverlay: boolean,
    setShowOverlay: () => void;
    configureExercise: boolean
}


export const Overlay = ({showOverlay, configureExercise = false, setShowOverlay}: OverlayProps) => {

    return (
        <div
            onClick={setShowOverlay}
            className={`overlay ${showOverlay || configureExercise ? 'show' : ''}`}></div>
    )
}