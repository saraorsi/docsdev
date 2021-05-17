import { useContext } from "react";
import { DataContext } from "../../../contexts/dataContext";

import styles from './styles.module.scss';

export function QuemFez() {
    const {edicao} = useContext(DataContext);


    return(
        <div>
        {
            edicao?.quemFez && edicao.quemFez.map( (item, index) => (
                <div className={styles.quemFezItem} key={index}>
                    <div className={styles.quemFezFuncao}>{item.funcao}</div>
                    <div className={styles.quemFezEquipa}>{item.equipa}</div>
                </div>
            ))
        }
        </div>
    )
}