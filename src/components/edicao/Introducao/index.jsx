import { useContext } from "react"
import { EdicoesContext } from "../../../EdicoesContext"

export function Introducao() {
    const edicao = useContext(EdicoesContext);
    return(
        <div dangerouslySetInnerHTML={{ __html: edicao.acf.sinopse }}></div>
    )
}