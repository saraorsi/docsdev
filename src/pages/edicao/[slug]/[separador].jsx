import React from "react";
import { Menu } from "../../../components/edicao/Menu";
import { useRouter } from 'next/router'
import { BarCentral } from "../../../components/commons/BarCentral";
import { Programa } from "../../../components/edicao/Programa"
import useSWR from 'swr';
import { Introducao } from "../../../components/edicao/Introducao";
import { EdicoesContext } from "../../../EdicoesContext";
import { Debates } from "../../../components/edicao/Debates";

export default function Separador() {
    const router = useRouter();
    const fetcher = 
    (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_edicoes?slug=${router.query.slug}`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return (<main>
        <div>{router.query.slug}</div>
        <Menu />
        <BarCentral />
        <div>Loading...</div>
    </main>)

    let edicao = data[0];

    return (
        <EdicoesContext.Provider value={edicao} >
        <main>
            <div dangerouslySetInnerHTML={{ __html: edicao.title.rendered }}>
            </div>
            <Menu />
            <BarCentral />
            { router.query.separador == 'programa' ? <Programa /> 
            : router.query.separador == 'introducao' ? <Introducao /> 
            : router.query.separador == 'debates' ? <Debates /> 
            : <div>yeahh</div> }
        </main>
        </ EdicoesContext.Provider>
    )
}



