import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../Componentes/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from 'date-fns'
import { AlterarDestinoEData } from "./alterar-destino-e-data";


interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean 
}

export function DestinoEDataHeader(){

    const [abrirAlterarLocalEData,setAbrirAlterarLocalEData] = useState(false)    
    const   tripId   = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()

    useEffect(() => {
        api.get(`/trips/${tripId.tripid}`).then(response => setTrip(response.data.trip))
    }, [tripId])

    const dataExibida = trip
        ? format(trip.starts_at, "d' de 'LLL" ).concat(' até ').concat(format(trip.ends_at, "d' de 'LLL" ))
        : null

    function atualizarAlterarLocalEData(){
        setAbrirAlterarLocalEData(true)
    }
    function fecharAlterarLocalEData(){
        setAbrirAlterarLocalEData(false)
    }

    return(
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">{trip?.destination}</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400"/>
                        <span className="text-zinc-100">{dataExibida}</span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800" id="separador"></div>

                    <Button onClick={atualizarAlterarLocalEData} variant="secundary">
                        Alterar local/data
                        <Settings2 className='size-5'/>
                    </Button>
                    {abrirAlterarLocalEData&& (
                        <AlterarDestinoEData fecharAlterarLocalEData={fecharAlterarLocalEData}/>
                    )}
                </div>
            </div>
    )
}