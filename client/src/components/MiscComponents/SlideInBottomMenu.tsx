import '../../styles/MiscStyles/SlideInBottomMenu.css'

type SlideInBottomMenuProps = {
    children: React.ReactNode
    showMenu: boolean
}


export const SlideInBottomMenu = ({children, showMenu}: SlideInBottomMenuProps) => {

    return (
        <div className={`slide-in-bottom-menu ${showMenu ? 'show' : ''}`}>
            {children}
        </div>
    )
}