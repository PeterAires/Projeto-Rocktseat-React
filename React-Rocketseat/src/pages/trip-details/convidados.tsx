import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../Componentes/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { CadastrarNovoConvidado } from "./cadastrar-novo-convidado";

interface Participantes {
    id: string
    name: string
    email: string
    is_confirmed: boolean 
}

export function Convidados(){

    const   tripId   = useParams()
    const [users, setUsers] = useState<Participantes[]>([])
    const[GerenciarConvidadoAberto,setGerenciarConvidadoAberto] = useState(false)

    useEffect(() => {
        api.get(`/trips/${tripId.tripid}/participants`).then(response => setUsers(response.data.participants))
    }, [tripId])

    function AbrirGerenciarConvidadoModal() {
        setGerenciarConvidadoAberto(true)
    }
    function FecharGerenciarConvidadoModa() {
        setGerenciarConvidadoAberto(false)
    }


    return(
        <div className="space-y-6">
                        <h2 className="font-semibold text-xl">Convidados</h2>
                        <div className="space-y-5">
                            
                            {users?.map((participantes:any, index:any) => (
                            <div key={participantes.id} className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">{participantes.name ?? `Convidado ${index}`}</span>
                                    <span className="block text-sm text-    zinc-400 truncate">{participantes.email}</span>
                                </div>
                                {participantes.is_confirmed === true 
                                ? <CheckCircle2 className="text-green-400 size-5 shrink-0"/> 
                                : <CircleDashed className="text-zinc-400 size-5 shrink-0"/>}
                            </div>))}
                        </div>
                        <Button onClick={AbrirGerenciarConvidadoModal} variant="secundary" size="full">
                            <UserCog className='size-5' />  
                            Gerenciar Convidados
                        </Button>
                        {GerenciarConvidadoAberto && (
                            <CadastrarNovoConvidado FecharGerenciarConvidadoModa={FecharGerenciarConvidadoModa}/>
                        )}
                    </div>
    )
}