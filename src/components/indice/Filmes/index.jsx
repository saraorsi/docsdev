import Link from "next/link";
import { useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/dataContext";

import styles from './styles.module.scss';


export function Filmes() {
    const{ edicoes, keyword} = useContext(DataContext);

    console.log(edicoes)

    return(
        <>
        {edicoes && edicoes.map(edicao => {
            const filmesEdicao = [];
            edicao.sessoes && edicao.sessoes.map( sessao => 
                sessao.filmes && sessao.filmes.map( filme => 
                    filmesEdicao.push(filme)
            ))
            filmesEdicao.sort((a, b) => (a.filme_titulo > b.filme_titulo ? 1 : -1))
        
            const filterFilmesEdicao = filmesEdicao.filter(filme =>
                filme.filme_titulo.toLowerCase().includes(keyword));
            
            return(
                <div>
                <div class={styles.edicao} dangerouslySetInnerHTML={{ __html: edicao.titulo }}></div>
                {filterFilmesEdicao.map( filme => {
               
                    return(
                        <div className={styles.filmItem}>
                             <Link href={`/edicao/${edicao.slug}`}>
                            <a>
                            <div className={styles.filmTitle}>{filme.filme_titulo}</div>
                            {filme.realizadores && <div className={styles.filmDirector}>{filme.realizadores.map(realizador => <div>{realizador.post_title}</div>)}</div>}
                            </a>
                            </Link>
                        </div>
                    )
                })}
                </div>
            )
            }
        )}
        </>
    )
}