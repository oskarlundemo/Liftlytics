import {LogCard} from "./LogCard.tsx";
import { format } from 'date-fns';


type LogModuleProps = {
    logs: any
    date: Date
}

export const LogModule = ({logs, date}:LogModuleProps) => {

    return (
        <article className={'log-module flex flex-col'}>

            <h2 style={{color: 'var(--color-text-muted)'}} className={'text-2xl text-right my-5'}>{format(date, 'MMMM yyyy')}</h2>

            {logs.length > 0 ? (
                <div className="flex flex-col log-card-wrapper">
                    {logs.map((log, index) => (
                        <LogCard
                            key={log.id || index}
                            id={log.id}
                            startTime={log.startDate}
                            workoutName={log.name}
                            exercises={log.exercises || []}
                        />
                    ))}
                </div>
            ) : (
                <p>No logs could be found for this month</p>
            )}

        </article>
    )
}