import styles from './styles.module.scss';
export function BarCentral() {
    return(
        <div className={styles.barCentralContainer}>
            <div className={styles.barCentralCircle}></div>
            <div className={styles.barCentralText}>SEMINÁRIO INTERNACIONAL SOBRE CINEMA DOCUMENTAL</div>
        </div>
    )
}