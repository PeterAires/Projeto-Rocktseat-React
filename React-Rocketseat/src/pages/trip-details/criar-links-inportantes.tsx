import { Link2, Unlink, X } from "lucide-react";
import { Button } from "../../Componentes/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface CriarLinkModalProps{
    fecharModalCadastrarLinks: () => void
} 

export function CriarLinkModal({
    fecharModalCadastrarLinks,
    }:CriarLinkModalProps){

        const    tripId   = useParams()


    async function  adicionarLink (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const dados = new FormData(event.currentTarget)
    
        const title = dados.get('title')?.toString()
        const url = dados.get('url')?.toString()
    
        if(title?.length === 0){
            alert('Nome não informado.')
            return
        }
        if(url?.length === 0){
            alert('Url não informada.')
            return
        }

        await api.post(`/trips/${tripId.tripid}/links`, {
            title,
            url,
        })
        window.document.location.reload()
    }


    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center '>
                            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                                <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-lg font-semibold'>Adicionar Link</h2> 
                                    <button onClick={fecharModalCadastrarLinks} type='button' >
                                    <X className='size-5 text-zinc-400'/>
                                    </button>
                                </div>
                                    <p className='text-sm text-zinc-400'>
                                        Todos convidados podem visualizar os links.
                                    </p>
                                </div>
                                    
                        
                                <form onSubmit={adicionarLink} className='space-y-3'>
                                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                        <Unlink className='text-zinc-400 size-5'/>
                                        <input
                                            name='title'
                                            placeholder="Nome?"
                                            className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
                                    </div>
                        
                                    <div className="flex items-center gap-2">
                                        <div className='h-14 flex-1 x-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                            <Link2 className='text-zinc-400 size-5'/>
                                            <input
                                                type='url'
                                                name='url'
                                                placeholder="Url"
                                                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1 "/>
                                        </div>
                                    </div>
                                    <Button type="submit" variant="primary" size="full">
                                        Salvar Link
                                    </Button>
                                </form>
                            </div>
                        </div>
    )
}