import { useContext } from "react";
import { EdicoesContext } from "../../../EdicoesContext";

export function Debates() {
    const edicao = useContext(EdicoesContext);
    const sessoes = edicao && edicao?.acf?.sessao_repetidor;
    return (
        <>
            { sessoes && sessoes.map(sessao => {
                return (sessao.debates && sessao.debates.map(debate => {
                    return(
                        <div>{debate.debate_titulo}</div>
                    )
                }))
            })}
        </>
    )
}