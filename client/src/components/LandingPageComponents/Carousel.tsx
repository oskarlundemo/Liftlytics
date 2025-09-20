


import '../../styles/MiscStyles/Carousel.css'
import React from "react";


type Props = {
    children: ReactNode;
};

export const Carousel = ({children}:Props) => {

    return (
        <div className={'carousel-wrapper'}>
            <div className={'carousel-inner'}>
                {children}
            </div>
        </div>
    )

}