
import useSWR from 'swr';
import Link from 'next/link'
import { useContext, useState } from "react";
import { EdicoesContext } from '../../../contexts/EdicoesContext';
import styles from './styles.module.scss';


export function Cineastas({keyword}) {
    const edicoes = useContext(EdicoesContext);
    const fetcher =
        (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_realizadores?per_page=100`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return (<div>
        <div>Loading...</div>
    </div>)
    const realizadores = data;
    realizadores.sort((a, b) => (a.title.rendered > b.title.rendered ? 1 : -1))

    const filterRealizadores = realizadores.filter((realizador) =>
    realizador.title.rendered.toLowerCase().includes(keyword));


    console.log(keyword);

    return (
        <>
            {filterRealizadores.map(realizador => {

                const edicoesRealizador = [];

                edicoes.map(edicao =>
                    edicao.acf.sessao_repetidor && edicao.acf.sessao_repetidor.map(sessao =>
                        sessao.filmes && sessao.filmes.map(filme => filme.realizadores && filme.realizadores.map(realizadorFilme => {
                            if (realizadorFilme.ID == realizador.id) {
                                edicoesRealizador.push(edicao);
                            }
                        }
                        ))))
                if (realizador?.acf?.biografia != '') {
                    const uniqueEdicoesRealizador = edicoesRealizador.filter((v, i, a) => a.indexOf(v) === i);
                    return (
                        <div key={realizador.id} className={styles.cineastaItem}>
                   
                                <div className={styles.cineastaName} dangerouslySetInnerHTML={{ __html: realizador?.title?.rendered }}></div>


                                {uniqueEdicoesRealizador && <div className={styles.cineastaEdicoes}>
                                    {uniqueEdicoesRealizador.map(edicao => (
                                        <div>
                                            <Link href={`/edicao/${edicao.slug}`}>
                                                <a>
                                                    <span dangerouslySetInnerHTML={{ __html: edicao?.title?.rendered }}></span>
                                                    <span>, {edicao?.acf?.ano}</span>
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>}
              
                        </div>
                    )
                }
            })}
        </>
    )
}

