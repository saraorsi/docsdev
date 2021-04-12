import styles from './styles.module.scss';
export function BarRight() {
    return(
        <div className={styles.barRightConainer}>
            <div className={styles.links}>
                <div>
                    <a href="https://www.apordoc.org/" target="_blank">APORDOC</a> • <a href="https://doclisboa.org/" target="_blank">DOCLISBOA</a>
                </div>
                <div>
                    NEWSLETTER
                </div>
            </div>
            <div className={styles.support}>
            O DOC'S KINGDOM é apoiado pelo Instituto do Cinema Português e pelo Governo de Portugal
            </div>
        </div>
    )
}