import Link from 'next/link'
import { useContext, useEffect} from "react";
import styles from './styles.module.scss';

import { DataContext } from '../../../contexts/dataContext';


export function Cineastas() {
    const {edicoes, realizadores, keyword, setKeyword} = useContext(DataContext);




    realizadores.sort((a, b) => (a.nome > b.nome ? 1 : -1))
    const filterRealizadores = realizadores.filter((realizador) =>
    realizador.nome.toLowerCase().includes(keyword));

    return (
        <>
            {filterRealizadores.map(realizador => {

                const edicoesRealizador = [];

                edicoes.map(edicao =>
                    edicao?.sessoes && edicao?.sessoes.map(sessao =>
                        sessao.filmes && sessao.filmes.map(filme => filme.realizadores && filme.realizadores.map(realizadorFilme => {
                            if (realizadorFilme.ID == realizador.id) {
                                edicoesRealizador.push(edicao);
                            }
                        }
                        ))))
                if (realizador?.biografia != '') {
                    const uniqueEdicoesRealizador = edicoesRealizador.filter((v, i, a) => a.indexOf(v) === i);
                    return (
                        <div key={realizador.id} className={styles.cineastaItem}>
                   
                                <div className={styles.cineastaName} dangerouslySetInnerHTML={{ __html: realizador?.nome }}></div>


                                {uniqueEdicoesRealizador && <div className={styles.cineastaEdicoes}>
                                    {uniqueEdicoesRealizador.map(edicao => (
                                        <div>
                                            <Link href={`/edicao/${edicao?.slug}`}>
                                                <a>
                                                    <span dangerouslySetInnerHTML={{ __html: edicao?.titulo}}></span>
                                                    <span>, {edicao?.ano}</span>
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

