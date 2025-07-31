import {useEffect, useState} from 'react'
import {SearchBar} from '../MiscComponents/SearchBar.tsx'
import {useStatsContext} from "../../contexts/StatsContext.tsx";
import {DropDownMenu} from "../MiscComponents/DropDownMenu.tsx";
import {DropDownCard} from "../MiscComponents/DropDownCard.tsx";





export const Categories = ({}) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const {categories} = useStatsContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <section className="muscle-group">

            <h2 className="title">Categories</h2>

            <form className={'categories-form'} onSubmit={handleSubmit}>

                <SearchBar
                    query={searchTerm}
                    setQuery={setSearchTerm}
                />

            </form>


            {categories.length > 0 ? (
                categories.map((category, index) => (
                    <DropDownMenu>
                        <DropDownCard
                            title={category.name}
                            key={category.id || index}
                            list={category.exercises}
                        />

                    </DropDownMenu>
                ))
            ) : (
                <p>No categories found.</p>
            )}


        </section>
    )
}