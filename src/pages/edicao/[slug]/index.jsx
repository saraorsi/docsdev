import { Centralbar } from "../../../components/Centralbar";
import { EdicaoMenu } from "../../../components/EdicaoMenu";

export default function Edicao({edicao}) {
    console.log(edicao[0])
    return(
        <main>
        <div>{edicao[0].title.rendered}</div>
        <EdicaoMenu />
        <Centralbar />
        <div></div>
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
  