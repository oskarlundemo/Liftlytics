import '../../styles/MiscStyles/SlideInBottomMenu.css'

type SlideInBottomMenuProps = {
    children: React.ReactNode
    showMenu: boolean
}

import { motion, AnimatePresence } from 'framer-motion'

export const SlideInBottomMenu = ({children, showMenu}: SlideInBottomMenuProps) => {
    return (
        <AnimatePresence>
            {showMenu && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="slide-in-bottom-menu">
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}