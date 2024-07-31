import {CircleCheck} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { format } from 'date-fns'
import {ptBR} from 'date-fns/locale'

interface Activities {
    date: string
    activities: {
        id: string,
        title: string,
        occurs_at: string
    }[]
}

export function Atividades(){

    const   tripId   = useParams()
    const [activities, setActivities] = useState<Activities[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId.tripid}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])


    console.log(activities)
    return(
    <div className="space-y-8">
        {activities.map((index) => (
            <div key={index.date} className=" space-y-2.5">
            <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">Dia {format(index.date, 'd')}</span>
                <span className=" text-xs text-zinc-500">{format(index.date, 'EEEE', {locale:ptBR})}</span>
            </div>
           
           {index.activities.length > 0 ? (
                <div>
                    {index.activities.map((atv) => (
                        <div key={atv.id} className="space-y-2.5 ">
                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                <CircleCheck className="size-5 text-lime-300"/>
                                <span className="text-zinc-100">{atv.title}</span>
                                <span className="text-zinc-400 text-sm ml-auto">{format(atv.occurs_at, 'HH:mm' )}h</span>
                            </div>
                        </div>
                    ))}
                </div>
           ) : (
            <p className='text-zinc-500 text-sm'>Nenhuma atividade cadastrada nessa data.</p>
           )}     
            
        </div>
        ))}

        <div className=" space-y-2.5">
            <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
                <span className=" text-xs text-zinc-500">Domingo</span>
            </div>

            <div className="space-y-2.5 ">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300"/>
                    <span className="text-zinc-100">Academia em grupo</span>
                    <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
            </div>
            <div className="space-y-2.5 ">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300"/>
                    <span className="text-zinc-100">Academia em grupo</span>
                    <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
            </div>
        </div>
    </div>
    )
}