import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/dataContext";


import styles from './styles.module.scss';

export function Debates() {
    const {edicao} = useContext(DataContext);
    const [active, setActive] = useState(0);



    function eventHandler(e, index) {
        e.preventDefault();
        setActive(index)
    }

    function eventHandler(e, index) {
        e.preventDefault();
        if(index === active){
            setActive()
        } else {
            setActive(index)
        }
    }

    
    return (
        <>
            { edicao?.sessoes && edicao?.sessoes.map((sessao, index) => {
                return (sessao.debates && sessao.debates.map((debate) => {
                    if (debate.debate_sinopse) {
                        return (
                            <div className={styles.debateItem} key={index}>
                                <div className="accordionButton" onClick={(e) => eventHandler(e, index)}>
                                    <div className={styles.debateTitle} dangerouslySetInnerHTML={{ __html: debate.debate_titulo }}></div>
                                    {debate.debate_subtitulo &&
                                        <div className={styles.debateSubtitle} dangerouslySetInnerHTML={{ __html: debate.debate_subtitulo }}></div>
                                    }
                                </div>
                                {debate.debate_sinopse &&
                                    <div className={`accordionContent ${index === active ? 'open' : 'close'}`}>
                                        <div className={styles.debateText} dangerouslySetInnerHTML={{ __html: debate.debate_sinopse }}></div>
                                    </div>
                                }
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles.debateItem}>
                                <div className={styles.debateTitle} dangerouslySetInnerHTML={{ __html: debate.debate_titulo }}></div>
                                {debate.debate_subtitulo &&
                                    <div className={styles.debateSubtitle} dangerouslySetInnerHTML={{ __html: debate.debate_subtitulo }}></div>
                                }
                            </div>
                        )
                    }
                }))
            })}
        </>
    )
}