import Link from "next/link"

export function EdicaoMenu() {
    return(
        <div>
            <Link href={`/edicao/floresta-de-signos/nota`}>
            <a>Nota</a>
            </Link>
            <Link href={`/edicao/floresta-de-signos/programa`}>
            <a>Programa</a>
            </Link>
        </div>
    )
}