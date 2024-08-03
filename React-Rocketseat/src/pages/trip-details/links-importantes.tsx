import { Calendar, Link2, Plus, Tag, Unlink, X } from "lucide-react";
import { Button } from "../../Componentes/button";
import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CriarAtividadeModal } from "./criar-atividade-modal";
import { CriarLinkModal } from "./criar-links-inportantes";

interface Links {
    id: string,
    title: string,
    url: string,
}

export function LinksImportantes(){
    const [modalLinks,setModalLinks] = useState(false)

    function abrirModalCadastrarLinks () {
        setModalLinks(true)
    }

    function fecharModalCadastrarLinks () {
        setModalLinks(false)
    }

    const   tripId   = useParams()
    const [links, setLinks] = useState<Links[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId.tripid}/links`).then(response => setLinks(response.data.links))
    }, [tripId])
    

    return(
        <div className="space-y-6">
                        <h2 className="font-semibold text-xl">Links importantes</h2>
                        
                        {links.map((link) => (
                            <div className="space-y-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-1.5">
                                        <span className="block font-medium text-zinc-100">{link.title}</span>
                                        <a href={link.url}
                                        target="_blank"
                                        className="block text-xs text-zinc-400 truncate hover:text-zinc-200">{link.url}</a>
                                    </div>
                                    <Link2 className="text-zinc-400 size-5 shrink-0"/>
                                </div> 
                            </div>
                        ))}

                        <Button onClick={abrirModalCadastrarLinks} variant="secundary" size="full">
                            <Plus className='size-5'/>  
                            Cadastrar novo Link
                        </Button>

                        {modalLinks&&(
                            <CriarLinkModal
                            fecharModalCadastrarLinks={fecharModalCadastrarLinks}
                            />
                        )}
                    </div>
    )
}