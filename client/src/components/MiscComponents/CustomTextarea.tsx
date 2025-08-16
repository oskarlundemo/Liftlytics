
import '../../styles/Workout/NewWorkout.css'
import {useEffect, useState} from "react";

type NoteProps = {
    notes: string
    setNotes: (notes: string) => void
    maxInput?: number
}


export const CustomTextarea = ({notes, setNotes, maxInput} : NoteProps) => {

    const [chars, setChars] = useState<number>(0)

    useEffect(() => {
        setChars(notes.length)
    }, [notes])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            notes.length >= maxInput &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }



    return (
        <section className="notes-container">

            <h2 className={'font-bold my-3 text-xl'}>Notes</h2>

            <textarea
                className="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />

            {maxInput && (
                <h4
                    style={{ color: chars >= maxInput ? 'var(--color-error)' : 'var(--color-text-muted)', transition: 'var(--transition-fast)' }}
                    className={`flex justify-end ${chars >= maxInput ? 'text-xl' : 'text-base'}`}
                >
                    {chars} / {maxInput}
                </h4>
            )}
        </section>
    )
}