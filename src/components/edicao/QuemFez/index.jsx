import { useContext } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";
import styles from './styles.module.scss';

export function QuemFez() {
    const edicao = useContext(EdicoesContext);
    const quemFez = edicao?.acf?.quem_fez;

    return(
        <div>
        {
            quemFez && quemFez.map( item => (
                <div className={styles.quemFezItem}>
                    <div className={styles.quemFezFuncao}>{item.funcao}</div>
                    <div className={styles.quemFezEquipa}>{item.equipa}</div>
                </div>
            ))
        }
        </div>
    )
}