import { useContext, useState } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";
import styles from './styles.module.scss';


export function Debates() {
    const edicoes = useContext(EdicoesContext);
    const debates = [];
    edicoes.map(edicao =>
        edicao.acf.sessao_repetidor && edicao.acf.sessao_repetidor.map(sessao =>
            sessao.debates && sessao.debates.map(debate => 
                debates.push(debate)
            )))

            console.log(debates)
            debates.sort((a, b) => (a.debate_titulo > b.debate_titulo ? 1 : -1))
    return(
        <div>
        {debates.map( debate => {
            const [accordion, setAccordion] = useState(false);

            function toggleAccordion() {
                setAccordion(!accordion)
            }
            return(
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
        })}
        </div>
    )
}