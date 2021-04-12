import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { EdicoesContext } from "../../../contexts/EdicoesContext";

import styles from './styles.module.scss';

export function Realizador() {
    const edicao = useContext(EdicoesContext);
    const router = useRouter();
    const sessoes = edicao.acf.sessao_repetidor;
    const realizadoresFilmes = [];

    sessoes.map(sessao =>
        sessao.filmes && sessao.filmes.map(filme =>
            filme.realizadores && filme.realizadores.map(realizador => {
                if (realizador.post_name === router.query.separador) {
                    realizadoresFilmes.push(filme)
                }
            })
        ));


    const fetcher =
        (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_realizadores?slug=${router.query.separador}`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>Loading...</div>
    const realizador = data[0];

    return (
        <div className={styles.realizadorContainer}>
            <div className={styles.realizadorTitle} dangerouslySetInnerHTML={{ __html: realizador?.title?.rendered }}></div>
            <div className={styles.realizadorText}  dangerouslySetInnerHTML={{ __html: realizador?.acf?.biografia }}></div>
            {realizadoresFilmes && <div className={styles.realizadorFilms}> 
                {realizadoresFilmes.map(filme => {
                    return (
                        <div className={styles.realizadorFilm} key={filme.filme_titulo}>
                            <span>{filme.filme_titulo}</span>
                            {filme.filme_ano && filme.filme_duracao ?
                                            <>, {filme.filme_ano}, {filme.filme_duracao} min</>
                                            : filme.filme_ano ?
                                            <>, {filme.filme_ano}</>
                                                : filme.filme_duracao ?
                                                <>, {filme.filme_duracao} min </>
                                                    : null
                                        }
                        </div>
                    )
                })} 
            </div>}
        </div>
    )
}