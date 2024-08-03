import { MapPin, Calendar, ArrowRight, Settings2, X,} from 'lucide-react'
import { Button } from '../../../Componentes/button'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'

interface DestinoEDataProps {
    janelaDeConvidadoAberta: boolean
    fecharJanelaDeConvidados: () => void
    abrirJanelaDeConvidados: () => void
    setDestino: (destino: string) => void
    inicioETerminoDoEvendo: DateRange | undefined
    setInicioETerminoDoEvendo: (data: DateRange | undefined) => void
    destination: () => void
}


export function DestinoEDataPasso({
    janelaDeConvidadoAberta,
    fecharJanelaDeConvidados,
    abrirJanelaDeConvidados,
    setDestino,
    setInicioETerminoDoEvendo,
    inicioETerminoDoEvendo,
    destination,
}: DestinoEDataProps){

  const [dataPickerAberto,setDataPickerAberto] = useState(false)
  

  function AbrirDataPicker(){
    return setDataPickerAberto(true)
  }
  function FecharDataPicker(){
    return setDataPickerAberto(false)
  }

  const dataExibida = inicioETerminoDoEvendo && inicioETerminoDoEvendo.from && inicioETerminoDoEvendo.to 
  ? format(inicioETerminoDoEvendo.from, "d' de 'LLL" ).concat(' até ').concat(format(inicioETerminoDoEvendo.to, "d' de 'LLL" ))
  : null

    return(
      
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>
             <input 
             onChange={(e) => setDestino(e.target.value)}
             disabled={janelaDeConvidadoAberta} 
             type="text" placeholder="Para onde você vai?" 
             className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
          </div>
          <button onClick={AbrirDataPicker} disabled={janelaDeConvidadoAberta} className='flex items-center gap-2 text-left w-[240px]'>
            <Calendar className='size-5 text-zinc-400'/>
            <span className='text-lg text-zinc-400 w-40 flex-1'>
              {dataExibida || 'Quando'}
            </span>
          </button>
  
      {dataPickerAberto && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
          <div className=' rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Selecione a Data</h2> 
                  <button type='button' onClick={FecharDataPicker}>
                    <X className='size-5 text-zinc-400'/>
                  </button>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  Apenas datas após o dia atual.
                </div>
              </div>
              
              <DayPicker mode='range' selected={inicioETerminoDoEvendo} onSelect={setInicioETerminoDoEvendo}/>
          </div>
        </div>
      )}

            <div className='w-px h-6 bg-zinc-800'>
            </div>
  
            {janelaDeConvidadoAberta ? (
              <Button variant='secundary' onClick={fecharJanelaDeConvidados}>
                Alterar local/data
                <Settings2 className='size-5'/>
              </Button>
              
            ) : (
            <Button variant='primary' onClick={abrirJanelaDeConvidados}>
              Continuar
              <ArrowRight className='size-5 '/>
            </Button>
            )}
        </div>
    )
}