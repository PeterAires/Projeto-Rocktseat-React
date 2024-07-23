import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteConvidadosModal } from './invite-convidados-modal'
import { JanelaConfirmarViagem } from './janela-confirmar-viagem'
import { DestinoEData, DestinoEDataPasso } from './passos/destino-e-data-passo'
import { InviteConvidadosPasso } from './passos/invite-convidados-passo'

export function CreateTripPage() {
    const navigate = useNavigate()

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

    function createTrip(event: FormEvent<HTMLFormElement>){
      event.preventDefault()
      navigate('/trips/123')
    }
  
    return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem!</p>
  
      <div className='space-y-4'>
  
        <DestinoEDataPasso 
        abrirJanelaDeConvidados={abrirJanelaDeConvidados} 
        fecharJanelaDeConvidados={fecharJanelaDeConvidados} 
        janelaDeConvidadoAberta={janelaDeConvidadoAberta}/>
  
        {janelaDeConvidadoAberta && (
          <InviteConvidadosPasso 
          AbrirJanelaDeConfirmarViagem={AbrirJanelaDeConfirmarViagem}
          AbrirModalConvidados={AbrirModalConvidados}
          emailsParaEnviar={emailsParaEnviar}/>
        )}
        </div>
  
        <p className="text-sm text-zinc-500">
          Ao planejar sua  viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politicas de privacidade.</a>
        </p>
      </div>
  
      {janelaDeConvidadoModalAberta && (
        <InviteConvidadosModal 
        AdicionarEmail={AdicionarEmail} 
        FecharModalConvidados={FecharModalConvidados} 
        RemoverEmailsDoInvite={RemoverEmailsDoInvite} 
        emailsParaEnviar={emailsParaEnviar}/>
      )}
  
  
      {janelaDeConfirmarViagemAberta &&(
        <JanelaConfirmarViagem 
        FecharJanelaDeConfirmarViagem={FecharJanelaDeConfirmarViagem} 
        createTrip={createTrip}/>
      )}
    </div>
    )
}