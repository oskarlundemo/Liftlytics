
import '../../styles/MiscStyles/SlideInSideMenu.css'

type SlideInBottomMenuProps = {
    children: React.ReactNode
    showMenu: boolean
}


export const SlideInSideMenu = ({children, showMenu}: SlideInBottomMenuProps) => {

    return (
        <div className={`slide-in-side-menu ${showMenu ? 'show' : ''}`}>
            {children}
        </div>
    )
}