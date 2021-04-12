import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { EdicoesContext } from "../../../contexts/EdicoesContext";

import styles from './styles.module.scss';

export function Menu() {
    const router = useRouter()

    const edicao = useContext(EdicoesContext);

    const participantes = edicao && edicao?.acf?.participantes;
    participantes ? participantes.sort((a, b) => (a.post_title > b.post_title ? 1 : -1)) : ''

    const separador = router.query.separador;
    const [selected, setSelected] = useState(separador)
    function toggle(menu) {
      setSelected(menu)
    }

    const menus = [
        {
            link: `/edicao/${router.query.slug}/introducao`,
            titulo: 'Introdução',
            slug: 'introducao'
        },
        {
            link: `/edicao/${router.query.slug}/programa`,
            titulo: 'Programa',
            slug: 'programa'
        },
        {
            link: `/edicao/${router.query.slug}/debates`,
            titulo: 'Debates',
            slug: 'debates'
        },
        {
            link: `/edicao/${router.query.slug}/leituras`,
            titulo: 'Leituras',
            slug: 'leituras'
        },
        {
            link: `/edicao/${router.query.slug}/quem-fez`,
            titulo: 'Quem Fez',
            slug: 'quem-fez'
        },
    ]

    return (
        <>
            {menus.map(menu => (

                <Link key={menu.titulo} href={menu.link}>
                    <a className={`${styles.menuItem} ${ selected === undefined && menu.slug == 'programa' ? styles.active : selected == menu.slug ? styles.active : null}`} onClick={() => toggle(menu.slug)}>
                        {menu.titulo}
                    </a>
                </Link>


            ))}
            {participantes && <div className={styles.participantesMenu}>
                <div className={styles.participantesMenuTitulo}>Com a presença de:</div>
                {participantes && participantes.map(participante => (
                    <Link key={participante.ID} href={`/edicao/${router.query.slug}/${participante.post_name}`}>
                        <a className={`${styles.participanteItem} ${selected == participante.post_name ? styles.active : null}}`} onClick={() => toggle(participante.post_name)}>{participante.post_title}</a>
                    </Link>
                ))
                }
            </div>}
        </>
    )
}