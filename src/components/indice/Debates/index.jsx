import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/dataContext";
import styles from './styles.module.scss';


export function Debates() {
    const {edicoes, keyword} = useContext(DataContext);
    const debates = [];
    edicoes.map(edicao =>
        edicao.sessoes && edicao.sessoes.map(sessao =>
            sessao.debates && sessao.debates.map(debate =>
                debates.push(debate)
            )))


    debates.sort((a, b) => (a.debate_titulo > b.debate_titulo ? 1 : -1))

    const filterDebates = debates.filter((debate) =>
    debate.debate_titulo.toLowerCase().includes(keyword) || debate.debate_subtitulo.toLowerCase().includes(keyword));

    const [active, setActive] = useState();

    function eventHandler(e, index) {
        e.preventDefault();
        if(index === active){
            setActive()
        } else {
            setActive(index)
        }
    }

 

    return (
        <div>
            {filterDebates.map((debate, index) => {
                if( debate.debate_sinopse )
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
                if( !debate.debate_sinopse )
                return (
                    <div className={styles.debateItem}  key={index}>
                           <div className={styles.debateTitle} dangerouslySetInnerHTML={{ __html: debate.debate_titulo }}></div>
                            {debate.debate_subtitulo &&
                                <div className={styles.debateSubtitle} dangerouslySetInnerHTML={{ __html: debate.debate_subtitulo }}></div>
                            }
                    </div>
                )
            })}
        </div>
    )
}