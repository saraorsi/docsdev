import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from './styles.module.scss';


export function Menu() {
    const router = useRouter();


    const separador = router.query.separador;
    const [selected, setSelected] = useState(separador)
    function toggle(menu) {
      setSelected(menu)
    }

    const menus = [
        {
            link: `/indice/cineastas`,
            titulo: 'Cineastas',
            slug: 'cineastas'
          },
          {
              link: `/indice/filmes`,
            titulo: 'Filmes',
            slug: 'filmes'
          },
          {
              link: `/indice/debates`,
              titulo: 'Debates',
              slug: 'debates'
          },
          {
              link: `/indice/leituras`,
              titulo: 'Leituras',
              slug: 'leituras'
          },
    ]

    return (
        <>
            {menus.map(menu => (
                <div key={menu.titulo}>
                    <Link href={menu.link}>
                        <a className={`${styles.menuItem} ${ selected === undefined && menu.slug == 'cineastas' ? styles.active : selected == menu.slug ? styles.active : null}`} onClick={() => toggle(menu.slug)}>{menu.titulo}</a>
                    </Link>
                </div>

            ))}
        </>
    )
}