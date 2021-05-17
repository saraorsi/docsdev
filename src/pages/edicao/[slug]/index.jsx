import { useContext, useEffect } from "react";
import { Programa } from "../../../components/edicao/Programa";
import { DataContext } from "../../../contexts/dataContext";
import { EdicaoLayout } from "../../../layouts/EdicaoLayout";
import { api } from "../../../services/api";




export default function Edicao({ edicao }) {

  const { setEdicao } = useContext(DataContext)

  useEffect(() => {
    setEdicao(edicao)
  }, [edicao])

  return <Programa />
  
}

Edicao.Layout = EdicaoLayout;

export async function getStaticPaths() {

  const edicoesData = await api.get('edicoes')
  const edicoes = edicoesData.data;
  const paths = edicoes.map(edicao => ({ params: { slug: edicao.slug } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {


  const edicaoData = await api.get(`edicao/${params.slug}`)
  const edicao = edicaoData.data


  return {
    props: {
      edicao
    },
    revalidate: 10
  }
}
