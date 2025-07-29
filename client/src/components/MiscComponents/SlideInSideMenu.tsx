
import '../../styles/MiscStyles/SlideInSideMenu.css'
import { motion, AnimatePresence } from 'framer-motion'

type SlideInBottomMenuProps = {
    children: React.ReactNode
    showMenu: boolean
    fromLeft?: boolean
}


export const SlideInSideMenu = ({children, showMenu, fromLeft}: SlideInBottomMenuProps) => {

    return (
        <AnimatePresence>
            {showMenu && (
                <motion.div
                    initial={{ x: fromLeft ? '-100%' : '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: fromLeft ? '-100%' : '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="slide-in-side-menu"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}