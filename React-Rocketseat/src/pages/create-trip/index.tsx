 import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteConvidadosModal } from './invite-convidados-modal'
import { JanelaConfirmarViagem } from './janela-confirmar-viagem'
import { DestinoEDataPasso } from './passos/destino-e-data-passo'
import { InviteConvidadosPasso } from './passos/invite-convidados-passo'
import { DateRange, Day } from 'react-day-picker'
import { api } from '../../lib/axios'
import { ErrorComponent } from '../../Componentes/component-error'
import { getDay } from 'date-fns';

export function CreateTripPage() {
    const navigate = useNavigate()

    const [janelaDeConvidadoAberta,setJanelaDeConvidadoAberta] = useState(false)
    const [janelaDeConvidadoModalAberta,setJanelaConvidadoModalAberta] = useState(false)
    const [janelaDeConfirmarViagemAberta,setJanelaDeConfirmarViagemAberta] = useState(false)
  
    const [emailsParaEnviar,setEmailsParaEnviar] = useState([])

    const [destination,setDestino] = useState()
    const [usuarioNome,setUsuarioNome] = useState()
    const [usuarioEmail,setUsuarioEmail] = useState()
    const [inicioETerminoDoEvendo,setInicioETerminoDoEvendo] = useState<DateRange | undefined>()


  


    function abrirJanelaDeConvidados(){
      if (!inicioETerminoDoEvendo?.from ||!inicioETerminoDoEvendo?.to) {
        const error = window.document.getElementById('error')
        error.innerHTML = 'Selecione a data da viagem.'
        return
      }
      
      if (destination.length >= 4) {
        setJanelaDeConvidadoAberta(true)
        const error = window.document.getElementById('error')
       error.innerHTML = ''
      }
      else {
       const error = window.document.getElementById('error')
       error.innerHTML = 'O destino deve ter no mínimo 4 caracteres'
        return
      }
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
      if (emailsParaEnviar.length === 0){
        const error = window.document.getElementById('error')
       error.innerHTML = 'Nenhum convidado adicionado.'
       return
      }
      else{
        const error = window.document.getElementById('error')
       error.innerHTML = ''
        setJanelaDeConfirmarViagemAberta(true)
      }
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
        const error = window.document.getElementById('errConvidados')
       error.innerHTML = 'Convidado já adicionado.'
        return
      }
      else{
        const error = window.document.getElementById('errConvidados')
       error.innerHTML = ''
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

    async function createTrip(event: FormEvent<HTMLFormElement>){
      event.preventDefault()

      
      if (!inicioETerminoDoEvendo?.from || !inicioETerminoDoEvendo?.to){
        alert('As datas não foram informadas corretamente.')
        return
      }
  
      if(!usuarioNome || !usuarioEmail) {
        alert('Nome e/ou email não informados.')
        
        return
      }
      else {
        
      }

      const resposta = await api.post('/trips', {
        destination,
        starts_at: inicioETerminoDoEvendo.from,
        ends_at: inicioETerminoDoEvendo.to,
        emails_to_invite: emailsParaEnviar,
        owner_name: usuarioNome,
        owner_email: usuarioEmail
      }).catch(() => (alert('Data invalida. Selecione uma data posterior ao dia atual.')))


      const { tripId } = resposta.data
      navigate(`/trips/${tripId}`)
    }
  
    return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua proxima viagem!</p>
        <div id='error'></div>
      <div className='space-y-4'>
  
        <DestinoEDataPasso 
        inicioETerminoDoEvendo={inicioETerminoDoEvendo}
        setInicioETerminoDoEvendo={setInicioETerminoDoEvendo}
        abrirJanelaDeConvidados={abrirJanelaDeConvidados} 
        fecharJanelaDeConvidados={fecharJanelaDeConvidados} 
        janelaDeConvidadoAberta={janelaDeConvidadoAberta}
        setDestino={setDestino}/>
  
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
        createTrip={createTrip}
        setUsuarioEmail={setUsuarioEmail}
        setUsuarioNome={setUsuarioNome}/>
      )}
    </div>
    )
}