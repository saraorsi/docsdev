
import { Menu } from "../../../components/edicao/Menu";
import { useRouter } from 'next/router'
import { BarCentral } from "../../../components/commons/BarCentral";

export default function Separador({edicao}) {
    const router = useRouter();
    console.log(router)
    return(
        <main>
        <div>{edicao[0].title.rendered}</div>
        <Menu />
        <BarCentral />
        <div>{router.query.separador}</div>
        </main>
    )
}

export async function getServerSideProps({params}) {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/cpt_edicoes?slug=${params.slug}`);
    const data = await response.json();
    const edicao = await data;
    return {
      props: {
        edicao,
      }
    }
  }
  

