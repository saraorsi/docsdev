import { BarCentral } from "../../../components/commons/BarCentral";
import { Menu } from "../../../components/edicao/Menu";
import { Programa } from "../../../components/edicao/Programa";


export default function Edicao({edicao}) {
    return(
        <main>
        <div>{edicao[0].title.rendered}</div>
        <Menu />
        <BarCentral />
        <Programa />
        </main>
    )
}


export async function getStaticPaths() {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/cpt_edicoes?per_page=20`);
    const data = await response.json();
    const edicoes = await data;
    const paths = edicoes.map(edicao => ({ params: { slug: edicao.slug } }))
    return {
      paths,
      fallback: 'blocking'
    }
  }



export async function getStaticProps({params}) {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/cpt_edicoes?slug=${params.slug}`);
    const data = await response.json();
    const edicao = await data;
    return {
      props: {
        edicao,
      },
      revalidate: 10
    }
  }
  