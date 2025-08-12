


import '../../styles/MiscStyles/Carousel.css'


export const Carousel = ({children}) => {


    return (
        <div className={'carousel-wrapper'}>
            <div className={'carousel-inner'}>
                {children}
            </div>
        </div>
    )

}