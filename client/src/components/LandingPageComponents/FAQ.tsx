import {DropDownMenu} from "../MiscComponents/DropDownMenu.tsx";
import {DropDownCard} from "../MiscComponents/DropDownCard.tsx";


export const FAQ = ({}) => {


    return (
        <section className={'faq-container my-10 flex flex-col w-full gap-5'}>

            <h2 className={'text-2xl '}>Behind the project</h2>
            <DropDownMenu>

                <DropDownCard
                    title={'Why did you build this?'}
                    singleElement={
                        <p>Testing</p>
                    }
                />

                <DropDownCard
                    title={'What technologies did you use?'}
                    singleElement={
                        <p>Testing</p>
                    }
                />

                <DropDownCard
                    title={'What was the biggest challenge and how did you solve it?'}
                    singleElement={
                        <p>Testing</p>
                    }
                />

                <DropDownCard
                    title={'Be honest, how much AI did you use?'}
                    singleElement={
                        <p>Testing</p>
                    }
                />

                <DropDownCard
                    title={'Last question, can we hire you?!'}
                    singleElement={
                        <p>Sure ;-) oskar@lundemo.com</p>
                    }
                />

            </DropDownMenu>

        </section>
    )



}