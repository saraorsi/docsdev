import { BarCentral } from '../BarCentral';
import styles from './styles.module.scss';



export function ColumnRight({ children, title }) {
    return (
        <section className={styles.rightContainer}>
            <div className={styles.sectionTitle}>
                {title}
                <div className={styles.sectionTitleCircle}></div>
            </div>
            <div className={styles.sectionContent}>
            {children}
            </div>
        </section>
    )
}