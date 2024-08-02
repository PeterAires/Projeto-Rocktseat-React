import { Calendar, MapPin, Repeat2, X } from "lucide-react"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { Button } from "../../Componentes/button";
import { format } from "date-fns";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface AlterarDestinoEDataProps {
    fecharAlterarLocalEData:() => void
}

export function AlterarDestinoEData ({fecharAlterarLocalEData}:AlterarDestinoEDataProps) {

    const [dayPicker,setDayPicker] = useState(false)
    const [destination,setDestination] = useState(String)
    const [inicioETerminoDoEvendo,setInicioETerminoDoEvendo] = useState<DateRange | undefined>()
  
    const dataExibida = inicioETerminoDoEvendo && inicioETerminoDoEvendo.from && inicioETerminoDoEvendo.to 
  ? format(inicioETerminoDoEvendo.from, "d' de 'LLL" ).concat(' até ').concat(format(inicioETerminoDoEvendo.to, "d' de 'LLL" ))
  : null

    function abrirDayPicker () {
        setDayPicker(true)
    }
    function fecharDataPicker() {
        setDayPicker(false)
    }
    
    const    tripId   = useParams()

    async function createTrip(){
        console.log(destination)
        console.log(inicioETerminoDoEvendo)       
  
        if (!destination) {
          return
        }
        if (!inicioETerminoDoEvendo?.from || !inicioETerminoDoEvendo?.to){
          return
        }
  
        await api.put(`/trips/${tripId.tripid}`, {
          destination,
          starts_at: inicioETerminoDoEvendo.from,
          ends_at: inicioETerminoDoEvendo.to,
        })
        fecharAlterarLocalEData
        window.document.location.reload()
    }

    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
        <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Alterarar local/data</h2> 
                <button onClick={fecharAlterarLocalEData} type='button' >
                  <X className='size-5 text-zinc-400'/>
                </button>
            </div>
                <p className='text-sm text-zinc-400'>
                    Todos convidados podem visualizar o local e data.
                </p>
            </div>
                
            <div className="px-4 h-16 rounded-xl bg-zinc-800 shadow-shape flex items-center justify-between">
              
                <div className="flex items-center gap-2 flex-1">
                  
                    <MapPin className="size-5 text-zinc-400"/>
                    <input onChange={(e) => setDestination(e.target.value)}
                    type="text" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" placeholder="onde?" />
                </div>
              
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                       <Button variant="secundary" onClick={abrirDayPicker}>
                            <Calendar className="size-5 text-zinc-400"/>
                            <span>{dataExibida || 'Quando?'}</span>
                       </Button>
                        {dayPicker && (
                            <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
                            <div className=' rounded-xl py-5 px-4 shadow-shape bg-zinc-900 space-y-5'>
                                <div className='space-y-2'>
                                  <div className='flex items-center justify-between'>
                                    <h2 className='text-lg font-semibold'>Selecione a Data</h2> 
                                    <button type='button' onClick={fecharDataPicker}>
                                      <X className='size-5 text-zinc-400'/>
                                    </button>
                                    
                                  </div>
                                </div>
                                
                                <DayPicker mode='range' selected={inicioETerminoDoEvendo} onSelect={setInicioETerminoDoEvendo}/>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="w-px h-6 bg-zinc-700" id="separador"></div>

                    <Button onClick={createTrip} variant="secundary">
                        Atualizar 
                        <Repeat2 className='size-4'/>
                    </Button>
                </div>
            </div>
        </div>
    </div>
    )
}