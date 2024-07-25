import { MapPin, Calendar, ArrowRight, Settings2,} from 'lucide-react'
import { Button } from '../../../Componentes/button'

interface DestinoEDataProps {
    janelaDeConvidadoAberta: boolean
    fecharJanelaDeConvidados: () => void
    abrirJanelaDeConvidados: () => void
}

export function DestinoEDataPasso({
    janelaDeConvidadoAberta,
    fecharJanelaDeConvidados,
    abrirJanelaDeConvidados
}: DestinoEDataProps){
    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>
             <input disabled={janelaDeConvidadoAberta} type="text" placeholder="Para onde voçê vai" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
          </div>
          <div className='flex items-center gap-2'>
           <Calendar className='size-5 text-zinc-400'/>
           <input disabled={janelaDeConvidadoAberta} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
           </div>
  
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