import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User} from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {

  const [janelaDeConvidadoAberta,setJanelaDeConvidadoAberta] = useState(false)
  const [janelaDeConvidadoModalAberta,setJanelaConvidadoModalAberta] = useState(false)
  const [janelaDeConfirmarViagemAberta,setJanelaDeConfirmarViagemAberta] = useState(false)

  const [emailsParaEnviar,setEmailsParaEnviar] = useState([])

  function abrirJanelaDeConvidados(){
    setJanelaDeConvidadoAberta(true)
  }

  function fecharJanelaDeConvidados(){
    setJanelaDeConvidadoAberta(false)
  }

  function AbrirModalConvidados(){
    setJanelaConvidadoModalAberta(true)
  }
  function FecharModalConvidados(){
    setJanelaConvidadoModalAberta(false)
  }

  function AbrirJanelaDeConfirmarViagem(){
    setJanelaDeConfirmarViagemAberta(true)
  }
  function FecharJanelaDeConfirmarViagem(){
    setJanelaDeConfirmarViagemAberta(false)
  }

  function AdicionarEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const dados = new FormData(event.currentTarget)
    const email = dados.get('email')?.toString()

    if (!email) {
        return
      }

    if (emailsParaEnviar.includes(email)) { //se ja tiver o email que on cara clikou no array ele retorna
      return
    }

    setEmailsParaEnviar([
      ...emailsParaEnviar,
      email
    ])

    event.currentTarget.reset()
  }

  function RemoverEmailsDoInvite(emailToRemove:string){
    const novalistadeEmail = emailsParaEnviar.filter(email => email !== emailToRemove)

    setEmailsParaEnviar(novalistadeEmail)
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
            {emailsParaEnviar.length > 0 ? (
              <span className='text-zinc-100 text-lg flex-1'>{`${emailsParaEnviar.length} pessoa(s) convidada(s)`}</span>
            ) : (
              <span className='text-zinc-400 text-lg flex-1'>Quem estara na viagem?</span>
          )}
        </button>
        
          <div className='w-px h-6 bg-zinc-800' />

          

          <button onClick={AbrirJanelaDeConfirmarViagem} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
          Confirmar Viagem<ArrowRight className='size-5 '/>
          </button>
      </div>
      ) 
       : null}</div>

      <p className="text-sm text-zinc-500">
        Ao planejar sua  viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politicas de privacidade.</a>
      </p>
    </div>

    {janelaDeConvidadoModalAberta && (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
        <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
          <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Selecionar Convidados</h2> 
            <button type='button' onClick={FecharModalConvidados}>
              <X className='size-5 text-zinc-400'/>
            </button>
          </div>
            <p className='text-sm text-zinc-400'>
              Os convidados irão receber emails para a confirmação da participação da viagem
            </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {emailsParaEnviar.map((email) => (
                <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                <span className='text-zinc-300'>{email}</span>
                <button type='button' onClick={() => RemoverEmailsDoInvite(email)}>
                  <X className='size-4 text-zinc-400'/>
                </button>
              </div>
              ))}
            </div>

            <div className='w-full h-px bg-zinc-800'/>

            <form onSubmit={AdicionarEmail} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <div className='px-2 flex items-center flex-1 gap-2'>
              <AtSign className='text-zinc-400 size-5'/>

              <input
                type="email"
                name='email'
                placeholder="Digite o e-mail do convidado."
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
              </div>
              <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Convidar<Plus className='size-5 '/>
          </button>
            </form>
        </div>
      </div>
    )}


    {janelaDeConfirmarViagemAberta &&(
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2> 
          <button type='button' onClick={FecharJanelaDeConfirmarViagem}>
            <X className='size-5 text-zinc-400'/>
          </button>
        </div>
        <span></span>
          <p className='text-sm text-zinc-400'>
            Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'> Florianopolis, Brasil </span> nas datas de <span className='font-semibold text-zinc-100'>16 a 27 de agosto de 2024</span> preencha abaixo
          </p>
          </div>
          

          <form onSubmit={AdicionarEmail} className='space-y-3'>
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='text-zinc-400 size-5'/>
            <input
<<<<<<< HEAD
              name='name'
=======
              name='email'
>>>>>>> 1fc2949182e155dfb4cc74f3460dd0a47544df51
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>

            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='text-zinc-400 size-5'/>
            <input
<<<<<<< HEAD
              type='email'
              name='email'
=======
              name='name'
>>>>>>> 1fc2949182e155dfb4cc74f3460dd0a47544df51
              placeholder="Seu email"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>

            <button type='submit' className='bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400'>
              Confirmar criação da viagem<Plus className='size-5 '/>
        </button>
          </form>
      </div>
    </div>
    )}

  </div>
  )
}