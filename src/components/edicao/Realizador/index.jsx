import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/dataContext";



import styles from './styles.module.scss';

export function Realizador() {
    const {edicao, realizador} = useContext(DataContext);

    console.log(realizador)
    const router = useRouter();

    const realizadorFilmes = [];

    edicao.sessoes && edicao.sessoes.map(sessao =>
        sessao.filmes && sessao.filmes.map(filme =>
            filme.realizadores && filme.realizadores.map(realizador => {
                if (realizador.post_name === router.query.realizador) {
                    realizadorFilmes.push(filme)
                }
            })
        ));


        realizadorFilmes.sort((a, b) => (a.filme_titulo > b.filme_titulo ? 1 : -1));
    return (

        
        <div className={styles.realizadorContainer}>
            <div className={styles.realizadorTitle} dangerouslySetInnerHTML={{ __html: realizador?.nome }}></div>
            <div className={styles.realizadorText}  dangerouslySetInnerHTML={{ __html: realizador?.biografia }}></div>
            {realizadorFilmes && <div className={styles.realizadorFilms}> 
                {realizadorFilmes.map(filme => {
                    return (
                        <Link href={`/edicao/${router.query.slug}/programa`} key={filme.filme_titulo}>
                            <a  className={styles.realizadorFilm}>
                            <span>{filme.filme_titulo}</span>
                            {filme.filme_ano && filme.filme_duracao ?
                                            <>, {filme.filme_ano}, {filme.filme_duracao} min</>
                                            : filme.filme_ano ?
                                            <>, {filme.filme_ano}</>
                                                : filme.filme_duracao ?
                                                <>, {filme.filme_duracao} min </>
                                                    : null
                                        }
                            </a>
                        </Link>
                    )
                })} 
            </div>}
        </div>

    )
}