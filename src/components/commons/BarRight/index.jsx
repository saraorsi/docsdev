import styles from './styles.module.scss';
import useTranslation from "next-translate/useTranslation";

export function BarRight() {
    const {t} = useTranslation();
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
            {t("common:ica")}
            </div>
        </div>
    )
}