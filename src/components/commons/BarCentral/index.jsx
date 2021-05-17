import styles from './styles.module.scss';
import useTranslation from "next-translate/useTranslation";

export function BarCentral() {
    const {t} = useTranslation();
    return(
        <div className={styles.barCentralContainer}>
            <div className={styles.barCentralCircle}></div>
            <div className={styles.barCentralText}>{t('common:seminario')}</div>
        </div>
    )
}