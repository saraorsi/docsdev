import { useContext, useState } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";

import styles from './styles.module.scss';

export function Debates() {
    const edicao = useContext(EdicoesContext);
    const sessoes = edicao && edicao?.acf?.sessao_repetidor;
    return (
        <>
            { sessoes && sessoes.map(sessao => {
                return (sessao.debates && sessao.debates.map(debate => {
                    const [accordion, setAccordion] = useState(false);

                    function toggleAccordion() {
                        setAccordion(!accordion)
                    }
                    return (
                        <div className={styles.debateItem}>
                            <div className="accordionButton" onClick={toggleAccordion}>
                                <div className={styles.debateTitle} dangerouslySetInnerHTML={{ __html: debate.debate_titulo }}></div>
                                {debate.debate_subtitulo &&
                                    <div className={styles.debateSubtitle} dangerouslySetInnerHTML={{ __html: debate.debate_subtitulo }}></div>
                                }
                            </div>
                            {debate.debate_sinopse &&
                                <div className={`accordionContent ${accordion == true ? 'open' : 'close'}`}>
                                    <div className={styles.debateText}  dangerouslySetInnerHTML={{ __html: debate.debate_sinopse }}></div>
                                </div>
                            }
                        </div>
                    )
                }))
            })}
        </>
    )
}