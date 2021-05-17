
import { useRouter } from 'next/router'

import { Cineastas } from "../../components/indice/Cineastas";
import { Filmes } from "../../components/indice/Filmes";
import { Debates } from "../../components/indice/Debates";
import { Leituras } from "../../components/indice/Leituras";

import { IndiceLayout } from "../../layouts/IndiceLayout";
import { api } from '../../services/api';
import { DataContext } from '../../contexts/dataContext';
import { useContext, useEffect } from 'react';



export default function Separador({ edicoes, realizadores, leituras }) {
  const router = useRouter();

  const { setEdicoes, setRealizadores, setLeituras } = useContext(DataContext)


  useEffect(() => { setEdicoes(edicoes) },
    [edicoes])

  useEffect(() => { setRealizadores(realizadores) },
    [realizadores])

  useEffect(() => { setLeituras(leituras) },
    [leituras])


  return (

    <>
      {router.query.separador == 'filmes' ? <Filmes />
        : router.query.separador == 'debates' ? <Debates />
          : router.query.separador == 'leituras' ? <Leituras />
            : <Cineastas />}
    </>

  )
}

Separador.Layout = IndiceLayout;

export async function getStaticPaths() {

  return {
    paths: [],
    fallback: 'blocking'
  }
}


export async function getStaticProps({ locale }) {

  const realizadoreData = await api.get(`realizadores`)

  const edicoesData = await api.get('edicoes')

  const leiturasData = await api.get(`leituras`)
  const leituras = leiturasData.data.sort((a, b) => (a.ano > b.ano ? -1 : 1));



  return {
    props: {
      edicoes: edicoesData.data,
      realizadores: realizadoreData.data,
      leituras
    },
    revalidate: 10
  }
}


