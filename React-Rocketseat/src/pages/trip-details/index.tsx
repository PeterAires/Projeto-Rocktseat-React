import { Plus } from "lucide-react";
import { useState } from "react";
import { CriarAtividadeModal } from "./criar-atividade-modal";
import { LinksImportantes } from "./links-importantes";
import { Convidados } from "./convidados";
import { Atividades } from "./atividades";
import { DestinoEDataHeader } from "./destino-e-data-header";
import { Button } from "../../Componentes/button";

export function TripDetailsPage() {
    const[criarAtividadeModalAberta,setCriarAtividadeModalAberta] = useState(false)
    

    function AbrirCriarAtividadeModal() {
        setCriarAtividadeModalAberta(true)
    }
    function FecharCriarAtividadeModal() {
        setCriarAtividadeModalAberta(false)
    }


    return (
        <div className="max-w-6xl px-24 py-10 mx-auto space-y-8">
            <DestinoEDataHeader/>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <Button onClick={AbrirCriarAtividadeModal} className='primary'>
                            <Plus className='size-5 '/>
                            Cadastrar atividade
                        </Button>
                        {criarAtividadeModalAberta &&(
                         <CriarAtividadeModal FecharCriarAtividadeModal={FecharCriarAtividadeModal}/>
                         )} 
                    </div>
                    <Atividades/>
                </div>

                <div className="w-80 space-y-6">
                    <LinksImportantes/>
                    <div className="w=full h-px bg-zinc-800"></div>
                    <Convidados/>
                </div>
            </main>    
        </div>
    )
}