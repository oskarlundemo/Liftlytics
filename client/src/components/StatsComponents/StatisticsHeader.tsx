



type StatisticsHeaderProps = {
    title: string;
}


export const StatisticsHeader = ({ title }: StatisticsHeaderProps) => {




    return (
        <header className="statistics-header">
            <h1 className="statistics-title">{title}</h1>
        </header>
    )
}