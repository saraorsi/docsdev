import { BarCentral } from "../../../components/commons/BarCentral";
import { Menu } from "../../../components/edicao/Menu";
import { Programa } from "../../../components/edicao/Programa";
import { EdicoesContext } from "../../../contexts/EdicoesContext";

import styles from './Edicao.module.scss';


export default function Edicao({ edicao }) {
  return (
    <EdicoesContext.Provider value={edicao[0]} >
      <main>
        <div className="leftContainer">
          <div className="sectionTitle">
            <div>{edicao[0].acf.ano} <span className={styles.edicaoData}>{edicao[0].acf.datas}</span></div>
            <div className="sectionTitleCircle"></div>
          </div>
          <div className="sectionContent">
          <Menu/>
          </div>
        </div>
        <BarCentral />
        <div className="rightContainer">
          <div className="sectionTitle">
          <div dangerouslySetInnerHTML={{ __html: edicao[0]?.title?.rendered }}></div>
          <div className="sectionTitleCircle"></div>
          </div>
          <div className="sectionContent">
          <Programa />
          </div>
        </div>
      </main>
    </ EdicoesContext.Provider>
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



export async function getStaticProps({ params }) {
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
