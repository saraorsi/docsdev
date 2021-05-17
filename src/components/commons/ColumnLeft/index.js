import styles from './styles.module.scss';



export function ColumnLeft({ children, title }) {
    return (
        <section className={styles.leftContainer}>
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