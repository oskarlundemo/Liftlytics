

type DropDownMenuProps = {
    children: React.ReactNode;
}


export const DropDownMenu = ({children}:DropDownMenuProps) => {

    return (
        <section className="drop-down-menu-wrapper">
            {children}
        </section>
    )
}