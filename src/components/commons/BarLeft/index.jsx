import Link from "next/link"
import styles from './styles.module.scss';

export function BarLeft() {
    return (
        <div className={styles.barLeftContainer}>
            <div className={styles.searchButton}>
                <Link href={'/indice'}>
                    <a><img src="/img/lupa.svg" alt="procurar" /></a>
                </Link>
            </div>
            <div className={styles.homeButton}>
                <Link href={'/'}>
                    <a>Doc's Kingdom</a>
                </Link>
            </div>
        </div>
    )
}