

type AccountCardProps = {
    title: string,
    onClick: () => void,
    svg?: any
}


export const AccountCard = ({title, svg, onClick}:AccountCardProps) => {

    return (
        <article onClick={onClick} style={{background: 'var(--color-surface)', borderRadius: 'var(--border-radius)'}}  className="module-row p-4 w-full gap-1 items-center flex flex-row">
            {svg && (
                svg
            )}
            <h2 className={'text-2xl font-bold'}>{title}</h2>
        </article>
    )

}