



import {useState} from 'react'
import {SearchBar} from '../MiscComponents/SearchBar.tsx'





export const Categories = ({}) => {


    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(e.currentTarget.value)
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



        </section>
    )
}