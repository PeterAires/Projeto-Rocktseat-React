import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../Componentes/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

interface CriarAtividadeModalProps{
    FecharCriarAtividadeModal: () => void
}

export function CriarAtividadeModal({FecharCriarAtividadeModal}: CriarAtividadeModalProps){

    const    tripId   = useParams()


    async function criarAtividade (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const dados = new FormData(event.currentTarget)

        const title = dados.get('title')?.toString()
        const occurs_at = dados.get('occurs_at')?.toString()
        if (title?.length === 0) {
            alert('Titulo da tarefa não informado.')
            return
        }
        if (occurs_at?.length === 0) {
            alert('Data da tarefa não informada')
            return
        }

        await api.post(`/trips/${tripId.tripid}/activities`, {
            occurs_at,
            title,
        }).catch(() => {alert('Data invalida, selecione apenas dias condizentes com a data informada') 
            return})
        window.document.location.reload()
    }

    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
                    <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-lg font-semibold'>Cadastrar Atividade</h2> 
                            <button type='button' onClick={FecharCriarAtividadeModal}>
                            <X className='size-5 text-zinc-400'/>
                            </button>
                        </div>
                            <p className='text-sm text-zinc-400'>
                                Todos convidados podem visualizar as atividades.
                            </p>
                            <p className="text-sm text-zinc-200">
                            Selecione apenas dias condizentes com a data informada.
                            </p>
                        </div>
                            
                
                        <form onSubmit={criarAtividade} className='space-y-3'>
                            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                <Tag className='text-zinc-400 size-5'/>
                                <input
                                    name='title'
                                    placeholder="Qual a atividade?"
                                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
                            </div>
                
                            <div className="flex items-center gap-2">
                                <div className='h-14 flex-1 x-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                    <Calendar className='text-zinc-400 size-5'/>
                                    <input
                                        type='datetime-local'
                                        name='occurs_at'
                                        placeholder="Data e horário da atividade"
                                        className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1 "/>
                                </div>
                            </div>
                            <Button type="submit" variant="primary" size="full">
                                Salvar Atividade
                            </Button>
                        </form>
                    </div>
                </div>
    )
}