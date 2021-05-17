import { useContext } from "react";
import Link from "next/link";

import styles from './styles.module.scss';
import { DataContext } from "../../../contexts/dataContext";


export function Menu() {
    const {edicoes} = useContext(DataContext);


    return (

  
        edicoes?.map(edicao => {
            return (
                <Link href={`/edicao/${edicao.slug}`} key={edicao?.id}>
                    <a className={styles.menuItem}>
                        <div>{edicao.ano}</div>
                        <div className={styles.edicaoTitle} dangerouslySetInnerHTML={{ __html: edicao.titulo }}></div>
                    </a>
                </Link>
            )
        })

    )


}