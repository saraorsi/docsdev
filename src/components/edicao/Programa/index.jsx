import { useContext, useState } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";
import Moment from 'react-moment';
import moment from 'moment';

import styles from './styles.module.scss';

export function Programa() {

    moment.locale('pt-pt');
    const edicao = useContext(EdicoesContext);
    const sessoes = edicao && edicao?.acf?.sessao_repetidor;
    let diaActual, diaNovo;
    return (
        <>
            {sessoes && sessoes.map(({ dia, turno, filmes, debates }, i) => {

                if (diaActual != dia) {
                    diaNovo = true; diaActual = dia;
                } else {
                    diaNovo = false;
                }

                return (
                    <div key={i}>
                        {diaNovo &&
                            <Moment className={styles.sessionDay} format="D MMMM, dddd">{dia}</Moment>
                        }
                        <div className={styles.sessionContainer}>
                        <div className={styles.sessionInfo}>Sessão #{i+1}, <span>{turno}</span></div>
                        {filmes && filmes.map(filme => {
                             const [accordion, setAccordion] = useState(false);

                             function toggleAccordion() {
                                 setAccordion(!accordion)
                             }
                            return (
                                <div key={filme.filme_titulo} className={styles.filmContainer}>
                                    <div className="accordionButton" onClick={toggleAccordion}>
                                        <div className={styles.filmTitle}>{filme.filme_titulo}</div>
                                        {filme.filme_ano && filme.filme_duracao ?
                                            <div className={styles.filmInfo}>{filme.filme_ano}, {filme.filme_duracao} min</div>
                                            : filme.filme_ano ?
                                                <div className={styles.filmInfo}>{filme.filme_ano}</div>
                                                : filme.filme_duracao ?
                                                    <div className={styles.filmInfo}>{filme.filme_duracao} min</div>
                                                    : null
                                        }
                                        {filme.realizadores && filme.realizadores.map(realizador => <div className={styles.filmDirector}>{realizador.post_title}</div>)}
                                    </div>
                                    <div className={`accordionContent ${accordion == true ? 'open' : 'close'}`}>
                                        <div className={styles.filmText} dangerouslySetInnerHTML={{ __html: filme.filme_sinopse }}></div>
                                    </div>
                                </div>
                            )
                        })}

                        {debates && <div className={styles.debates}>
                            {debates.map( (debate, i) => 
                            
                            <div key={i} className={styles.debate}>{debate.debate_titulo}</div>
                            )}
                        </div>}
                        </div>
                    </div>
                )
            })}
        </>
    )
}