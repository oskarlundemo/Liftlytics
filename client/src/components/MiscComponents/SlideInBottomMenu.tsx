import '../../styles/MiscStyles/SlideInBottomMenu.css'

type SlideInBottomMenuProps = {
    children: React.ReactNode
    showMenu: boolean
    height?: string
}

import { motion, AnimatePresence } from 'framer-motion'

export const SlideInBottomMenu = ({children, showMenu, height = ''}: SlideInBottomMenuProps) => {
    return (
        <AnimatePresence>
            {showMenu && (
                <motion.div
                    style={{
                        height: height ? height : '90vh'
                    }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="slide-in-bottom-menu"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}