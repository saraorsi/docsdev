import React, { useState } from "react";
import styles from './Indice.module.scss';
import { useRouter } from 'next/router'
import { BarCentral } from "../../components/commons/BarCentral";
import useSWR from 'swr';
import { Menu } from "../../components/indice/Menu";
import { Cineastas } from "../../components/indice/Cineastas";

import { Filmes } from "../../components/indice/Filmes";
import { Debates } from "../../components/indice/Debates";
import { Leituras } from "../../components/indice/Leituras";
import { EdicoesContext } from "../../contexts/EdicoesContext";



export default function Separador() {
    const router = useRouter();
    const [keyword, setKeyword] = useState('');
    const onInputChange = (e) => {
      e.preventDefault;
      setKeyword(e.target.value.toLowerCase());
    }
    const fetcher =
        (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_edicoes?per_page=50`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return (
        <main>
            <div className="leftContainer">
                <div className="sectionTitle">

                    
                </div>
                <div className="sectionContent">
                    <Menu />
                </div>
            </div>
            <BarCentral />
            <div className="rightContainer">
                <div className="sectionTitle"></div>
                <div className="sectionContent">
                    <div>Loading...</div>
                </div>
            </div>
        </main>)
    const edicoes = data;


    return (
        <EdicoesContext.Provider value={edicoes} >
            <main>
                <section className="leftContainer">
                    <div className="sectionTitle">
                        <div>indice</div>
                        <div className="sectionTitleCircle"></div>
                    </div>
                    <div className="sectionContent">
                        <Menu />
                    </div>
                </section>
                <BarCentral />
                <div className="rightContainer">
                    <div className="sectionTitle">
                        <input className={styles.input} placeholder="Procurar por..." onChange={onInputChange}/>
                        <div className="sectionTitleCircle"></div>
                    </div>
                    <div className="sectionContent">
                        {router.query.separador == 'filmes' ? <Filmes keyword={keyword}/>
                            : router.query.separador == 'debates' ? <Debates />
                                : router.query.separador == 'leituras' ? <Leituras />
                                    : <Cineastas keyword={keyword} />}
                    </div>
                </div>
            </main>
        </ EdicoesContext.Provider>
    )
}



