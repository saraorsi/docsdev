import Link from "next/link"
import { useRouter } from "next/router";
import styles from './styles.module.scss';

export function BarLeft() {
    const router = useRouter();

    return (
        <div className={styles.barLeftContainer}>
            <div className={styles.languages}>
                <ul>
                    {router.locales.map((locale) => (
                        <li key={locale}>
                            
                            <Link href={router.asPath} locale={locale}>
                                {locale == 'pt-PT' ? 'pt' : locale}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.searchButton}>
                <Link href={'/indice'}>
                    <a><img src="/img/lupa.svg" alt="procurar" /></a>
                </Link>
            </div>
            <div className={styles.homeButton}>
                <Link href={'/'}>
                    <a><img src="/img/logo-dk.svg" alt="doc's kingdom logo" /></a>
                </Link>
            </div>
        </div>
    )
}