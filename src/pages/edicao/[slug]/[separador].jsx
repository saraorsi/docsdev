import React from "react";
import { Menu } from "../../../components/edicao/Menu";
import { useRouter } from 'next/router'
import { BarCentral } from "../../../components/commons/BarCentral";
import { Programa } from "../../../components/edicao/Programa"
import useSWR from 'swr';
import { Introducao } from "../../../components/edicao/Introducao";
import { EdicoesContext } from "../../../contexts/EdicoesContext";
import { Debates } from "../../../components/edicao/Debates";
import { Realizador } from "../../../components/edicao/Realizador";
import { QuemFez } from "../../../components/edicao/QuemFez";
import styles from './Edicao.module.scss';
import { Leituras } from "../../../components/edicao/Leituras";

export default function Separador() {
    const router = useRouter();
    const fetcher =
        (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_edicoes?slug=${router.query.slug}`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return (
        <main>
            <div className="leftContainer">
                <div className="sectionTitle">
                    <div className="sectionTitleCircle"></div>
                </div>
                <div className="sectionContent">
                    <Menu />
                </div>
            </div>
            <BarCentral />
            <div className="rightContainer">
                <div className="sectionTitle">
                    <div className="sectionTitleCircle"></div>
                </div>
                <div className="sectionContent">
                    <div>Loading...</div>
                </div>
            </div>
        </main>)
    const edicao = data[0];


    return (
        <EdicoesContext.Provider value={edicao} >
            <main>
                <div className="leftContainer">
                    <div className="sectionTitle">
                        {edicao.acf.ano} <span className={styles.edicaoData}>{edicao.acf.datas}</span>
                        <div className="sectionTitleCircle"></div>
                    </div>
                    <div className="sectionContent">
                        <Menu />
                    </div>

                </div>
                <BarCentral />
                <div className="rightContainer">
                    <div className="sectionTitle">
                        <div dangerouslySetInnerHTML={{ __html: edicao?.title?.rendered }}></div>
                        <div className="sectionTitleCircle"></div>
                    </div>
                    <div className="sectionContent">
                        {router.query.separador == 'programa' ? <Programa />
                            : router.query.separador == 'introducao' ? <Introducao />
                                : router.query.separador == 'debates' ? <Debates />
                                : router.query.separador == 'leituras' ? <Leituras />
                                    : router.query.separador == 'quem-fez' ? <QuemFez />
                                        : <Realizador />}
                    </div>
                </div>
            </main>
        </ EdicoesContext.Provider>
    )
}



