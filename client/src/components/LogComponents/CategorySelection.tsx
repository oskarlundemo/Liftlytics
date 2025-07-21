import {CategoryCard} from "./CategoryCard.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import '../../styles/LogPage/CategorySelection.css'

export const CategorySelection = ({}) => {

    const {setAddExerciseMenu} = useLog();

    return (
        <section className="category-selection-wrapper">
            <header className="category-selection-header">

                <div className="category-selection-header__title">

                    <p
                        onClick={() => setAddExerciseMenu(false)}
                        className="category-selection-header__btn error-text">
                        Cancel
                    </p>

                    <h1>Select exercise</h1>

                </div>

            </header>


            <article className="category-selection-body">

                <CategoryCard
                    title={'Arms'}
                />

            </article>

        </section>
    )

}