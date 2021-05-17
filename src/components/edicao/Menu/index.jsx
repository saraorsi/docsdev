import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/dataContext";



import styles from './styles.module.scss';

export function Menu() {
    const router = useRouter()

    const {edicao} = useContext(DataContext);

    const participantes = edicao?.participantes;

    participantes ? participantes.sort((a, b) => (a.post_title > b.post_title ? 1 : -1)) : ''

    console.log(router.query.participante)


    let separador;

    router.query.participante === undefined ? separador = router.query.separador : separador = router.query.participante;
     
    const [selectedSeparador, setSelectedSeparador] = useState(separador);


    useEffect( () => {
        setSelectedSeparador(separador)
    }, [router.query.separador])

    function toggle(menu) {
        setSelectedSeparador(menu)
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
                <Link 
                    key={menu.titulo} 
                    href={menu.link} 
                    >
                    <a 
                        className={`${styles.menuItem} ${selectedSeparador === undefined && menu.slug == 'programa' ? styles.active : selectedSeparador == menu.slug ? styles.active : null}`} 
                        onClick={() => toggle(menu.slug)}
                    >
                        {menu.titulo}
                    </a>
                </Link>


            ))}
            {participantes && <div className={styles.participantesMenu}>
                <div className={styles.participantesMenuTitulo}>Com a presença de:</div>
                {participantes && participantes.map(participante => (
                    <Link 
                    key={participante.ID} 
                    href={`/edicao/${router.query.slug}/participante/${participante.post_name}`}>
                        <a 
                        className={`${styles.participanteItem}`}
                        >
                            {participante.post_title}
                        </a>
                    </Link>
                ))
                }
            </div>}
        </>
    )
}