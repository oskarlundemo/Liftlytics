


type TechIconProps = {
    svg?: React.SVGProps<SVGSVGElement>,
    name: string,
}


export const TechIcon = ({name, svg}:TechIconProps) => {


    return (
        <div className={'tech-icon'}>
            {svg}
            <h4>{name}</h4>
        </div>
    )

}