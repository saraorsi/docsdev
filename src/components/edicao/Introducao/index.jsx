import { useContext } from "react"
import { EdicoesContext } from "../../../contexts/EdicoesContext"
import styles from './styles.module.scss'

export function Introducao() {
    const edicao = useContext(EdicoesContext);
    return(
        <div className={styles.introducaoContainer}>
            <div className={styles.introducaoSinopse} dangerouslySetInnerHTML={{ __html: edicao.acf.sinopse }}></div>
        </div>
    )
}