import { ArrowRight, UserRoundPlus, } from 'lucide-react'
import { Button } from '../../../Componentes/button'

interface InviteConvidadosPassoProps {
    AbrirModalConvidados: () => void
    emailsParaEnviar: string[]
    AbrirJanelaDeConfirmarViagem: () => void
}

export function InviteConvidadosPasso({
    AbrirModalConvidados,
    emailsParaEnviar,
    AbrirJanelaDeConfirmarViagem
}: InviteConvidadosPassoProps){
    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <button type="button" onClick={AbrirModalConvidados} className='flex items-center gap-2 flex-1 text-left'>
             <UserRoundPlus className='size-5 text-zinc-400'/>
              {emailsParaEnviar.length > 0 ? (
                <span className='text-zinc-100 text-lg flex-1'>{`${emailsParaEnviar.length} pessoa(s) convidada(s)`}</span>
              ) : (
                <span className='text-zinc-400 text-lg flex-1'>Quem estara na viagem?</span>
            )}
          </button>
          
            <div className='w-px h-6 bg-zinc-800' />
            
            <Button variant='primary' onClick={AbrirJanelaDeConfirmarViagem}>
              Confirmar Viagem
              <ArrowRight className='size-5 '/>
            </Button>
        </div>
    )
}