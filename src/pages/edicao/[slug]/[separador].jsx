import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { Programa } from "../../../components/edicao/Programa"
import { Introducao } from "../../../components/edicao/Introducao";
import { Debates } from "../../../components/edicao/Debates";
import { Realizador } from "../../../components/edicao/Realizador";
import { QuemFez } from "../../../components/edicao/QuemFez";
import { Leituras } from "../../../components/edicao/Leituras";
import { EdicaoLayout } from "../../../layouts/EdicaoLayout";

import { api } from "../../../services/api";

import { DataContext } from "../../../contexts/dataContext";

export default function Separador({ edicao, realizador, leituras}) {


  const router = useRouter();

  const { setEdicao, setRealizador, setLeiturasEdicao } = useContext(DataContext)

  useEffect(() => {
    setEdicao(edicao)
  }, [edicao])


  useEffect(() => {
    setRealizador(realizador)
  }, [realizador])


  useEffect(() => {
    setLeiturasEdicao( leituras)
  }, [ leituras])


  return (
    <>
      {
        router.query.separador == 'programa' ? <Programa />
          : router.query.separador == 'introducao' ? <Introducao />
            : router.query.separador == 'debates' ? <Debates />
              : router.query.separador == 'leituras' ? <Leituras />
                : router.query.separador == 'quem-fez' ? <QuemFez /> : ''
        

      }

    </>
  )
}

Separador.Layout = EdicaoLayout;


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {


  const edicaoData = await api.get(`edicao/${params.slug}`)
  const leiturasData = await api.get(`leituras-edicoes?ano=${edicaoData.data.ano}`)


  return {
    props: {
      edicao: edicaoData.data,
      leituras: leiturasData.data
    },
    revalidate: 10
  }




}