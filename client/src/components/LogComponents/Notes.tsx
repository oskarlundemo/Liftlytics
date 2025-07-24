
import '../../styles/Workout/NewWorkout.css'

type NoteProps = {
    notes: string
    setNotes: (notes: string) => void
}


export const NotesComponent = ({notes, setNotes} : NoteProps) => {

    return (
        <section className="notes-container">

            <h2>Notes</h2>

            <textarea
                className="notes-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />

        </section>
    )
}