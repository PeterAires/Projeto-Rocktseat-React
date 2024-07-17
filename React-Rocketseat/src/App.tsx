import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2} from 'lucide-react'
import { useState } from 'react'

export function App() {
  const [janelaDeConvidadoAberta,setJanelaDeConvidadoAberta] = useState(false)
  const [janelaDeConvidadoModalAberta,setJanelaConvidadoModalAberta] = useState(false)

  function abrirJanelaDeConvidados(){
    setJanelaDeConvidadoAberta(true)
  }

  function fecharJanelaDeConvidados(){
    setJanelaDeConvidadoAberta(false)
  }

  function AbrirModalConvidados(){
    setJanelaConvidadoModalAberta(true)
  }

  return (
  <div className="h-screen flex items-center justify-center">
    <div className="max-w-3xl w-full px-6 text-center space-y-10">
      <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem!</p>

      <div className='space-y-4'>

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
            <button onClick={fecharJanelaDeConvidados} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>Alterar local/data
            <Settings2 className='size-5'/></button>
          ) : (
            <button onClick={abrirJanelaDeConvidados} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
          Continuar<ArrowRight className='size-5 '/>
          </button>
          )}
      </div>

      {janelaDeConvidadoAberta ? (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <button type="button" onClick={AbrirModalConvidados} className='flex items-center gap-2 flex-1 text-left'>
           <UserRoundPlus className='size-5 text-zinc-400'/>
           <span className='text-zinc-400 text-lg flex-1'>Quem estara na viagem?</span>
        </button>
        
          <div className='w-px h-6 bg-zinc-800' />

          

          <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
          Continuar Viagem<ArrowRight className='size-5 '/>
          </button>
      </div>
      ) 
       : null}</div>

      <p className="text-sm text-zinc-500">
        Ao planejar sua  viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politicas de privacidade.</a>
      </p>
    </div>
  </div>
  )
}


