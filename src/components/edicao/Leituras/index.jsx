import { useContext } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";

import styles from './styles.module.scss';

export function Leituras() {
    const edicao = useContext(EdicoesContext);
    const sessoes = edicao && edicao?.acf?.sessao_repetidor;
    return (
        <>
            { sessoes && sessoes.map(sessao => {
                return (sessao.debates && sessao.debates.map(debate => {
                    return(
                        <div className={styles.debateItem}>{debate.debate_titulo}</div>
                    )
                }))
            })}
        </>
    )
}