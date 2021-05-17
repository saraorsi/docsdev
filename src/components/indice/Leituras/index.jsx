import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";

import styles from './styles.module.scss';

export function Leituras() {
    const {leituras, keyword} = useContext(DataContext);

 


    const filterLeituras = leituras && leituras.filter(leitura =>
    leitura.titulo.toLowerCase().includes(keyword))

    console.log(filterLeituras)

    return (
        <>
        {filterLeituras && filterLeituras.map(leitura => {
            return(
                <div className={styles.leiturasItem} key={leitura.id}>
                    <a href={leitura.pdf} target="_blank">
                        {leitura.titulo}
                    </a>
                </div>
            )
        })}
        </>
    )
}

