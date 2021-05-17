import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";

import styles from './styles.module.scss';

export function Leituras() {
    const {leiturasEdicao} = useContext(DataContext);

    return (
        <>
            {leiturasEdicao && leiturasEdicao.map(leitura => {
            return(
                <div className={styles.leiturasItem} key={leitura.id}>
                    <a href={`${leitura.pdf}#page=${leitura.pagina}`} target="_blank">
                        <div className={styles.leiturasTitle}>{leitura.titulo}</div>
                        <div className={styles.leiturasSubtitle}>{leitura.autores}</div>
                    </a>
                </div>
            )
        })}
        </>
    )
}