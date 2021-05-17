import { useContext } from "react"
import { DataContext } from "../../../contexts/dataContext";
import styles from './styles.module.scss'

export function Introducao() {
    const {edicao} = useContext(DataContext);
    return(
        <div className={styles.introducaoContainer}>
            <div className={styles.introducaoSinopse} dangerouslySetInnerHTML={{ __html: edicao?.sinopse }}></div>
        </div>
    )
}