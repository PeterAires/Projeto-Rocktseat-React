import { Link2, Unlink, UserRoundPlus, X } from "lucide-react";
import { Button } from "../../Componentes/button";
import { Link, useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

interface CadastrarNovoConvidadoProps {
    FecharGerenciarConvidadoModa: () => void
}

export function CadastrarNovoConvidado({FecharGerenciarConvidadoModa}: CadastrarNovoConvidadoProps){
    
    const [email,setEmail] = useState(String)

    const    tripId   = useParams()


    async function  AdicionarConvidado (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (email.length === 0) {
            alert('Email não informado.')
            return
        }
        await api.post(`/trips/${tripId.tripid}/invites`, {
            email,
        })
        window.document.location.reload()
    }

    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
                            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                                <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-lg font-semibold'>Adicionar Convidados</h2> 
                                    <button onClick={FecharGerenciarConvidadoModa} type='button' >
                                    <X className='size-5 text-zinc-400'/>
                                    </button>
                                </div>
                                    <p className='text-sm text-zinc-400'>
                                        Todos convidados podem visualizar os participantes.
                                    </p>
                                </div>
                                    
                        
                                <form onSubmit={AdicionarConvidado} className='space-y-3'>
                                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                        <UserRoundPlus className='text-zinc-400 size-5'/>
                                        <input
                                        onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="email:"
                                            className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
                                    </div>
                        
                                    <Button type="submit" variant="primary" size="full">
                                        Adicionar Convidado
                                    </Button>
                                </form>
                            </div>
                        </div>
    )
}