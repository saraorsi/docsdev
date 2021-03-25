import Link from "next/link";
import { useRouter } from 'next/router';

export function Menu() {
    const router = useRouter()
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
                <div key={menu.titulo}>
                    <Link href={menu.link}>
                        <a>{menu.titulo}</a>
                    </Link>
                </div>

            ))}
        </>
    )
}