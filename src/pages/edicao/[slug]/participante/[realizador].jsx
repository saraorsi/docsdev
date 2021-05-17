import React, { useContext, useEffect } from "react";
import { Realizador } from "../../../../components/edicao/Realizador";
import { EdicaoLayout } from "../../../../layouts/EdicaoLayout";
import { api } from "../../../../services/api";
import { DataContext } from "../../../../contexts/dataContext";


export default function Participante({ edicao, realizador}) {

  const { setEdicao, setRealizador } = useContext(DataContext)
  
  useEffect(() => {
    setEdicao(edicao)
  }, [edicao])
  useEffect(() => {
    setRealizador(realizador)
  }, [realizador])


  return <Realizador />
}

Participante.Layout = EdicaoLayout;


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {


  const edicaoData = await api.get(`edicao/${params.slug}`)


  const realizadorData = await api.get(`realizador/${params.realizador}`)



  return {
    props: {
      edicao: edicaoData.data,
      realizador: realizadorData.data
    },
    revalidate: 10
  }




}