import { Cineastas } from "../../components/indice/Cineastas";
import { useContext, useEffect, useState } from "react";
import { IndiceLayout } from "../../layouts/IndiceLayout";

import { api } from "../../services/api";
import { DataContext } from "../../contexts/dataContext";


export default function Indice({edicoes, realizadores, leituras}) {

  const { setEdicoes, setRealizadores,  } = useContext(DataContext)


  useEffect(() => { setEdicoes(edicoes) },
    [edicoes])

    useEffect(() => { setRealizadores(realizadores) },
    [realizadores])





  return <Cineastas />
       
        

}


Indice.Layout = IndiceLayout;


export async function getStaticProps({ locale }) {

  const realizadoreData = await api.get(`realizadores`)

  const edicoesData = await api.get('edicoes')





  return {
    props: {
      edicoes: edicoesData.data,
      realizadores: realizadoreData.data

    },
    revalidate: 10
  }
}
