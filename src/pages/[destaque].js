
import Link from 'next/link'
import { BarCentral } from '../components/commons/BarCentral';
import Moment from 'react-moment';

import styles from './Home.module.scss';

export default function Home({ edicoes, destaque }) {
  console.log(destaque)

  edicoes.sort((a, b) => (a.acf.ano > b.acf.ano ? -1 : 1))
  return (
    <main>
      <section className="leftContainer">
        <div className="sectionTitle">
          <div>edições</div>
          <div className="sectionTitleCircle"></div>
        </div>
        <div className="sectionContent">
          {edicoes && edicoes.map(edicao => {
            return (
              <div className={styles.menuItem} key={edicao.id}>
                <Link href={`/edicao/${edicao.slug}`}>
                  <a>
                    <div>{edicao.acf.ano}</div>
                    <div className={styles.edicaoTitle} dangerouslySetInnerHTML={{ __html: edicao.title.rendered }}></div>
                  </a>
                </Link>
              </div>
            )
          })
          }
        </div>
      </section>
      <BarCentral />
      <section className="rightContainer">
        <div className="sectionTitle">
          <div>destaques</div>
          <div className="sectionTitleCircle black"></div>
        </div>
        <div className="sectionContent">
          <div className={styles.destaqueContent}>
            <Moment className={styles.destaqueDate} format="DD/MM/YYYY">
              {destaque[0].date}
            </Moment>
            <div className={styles.destaqueTitle} dangerouslySetInnerHTML={{ __html: destaque[0].title.rendered }}></div>
            <div className={styles.destaqueText} dangerouslySetInnerHTML={{ __html: destaque[0].title.conteudo }}></div>
            {destaque[0].featured_media_src_url &&
              <div className={styles.destaqueImage}>
                <img src={destaque[0].featured_media_src_url} alt={destaque[0].title.rendered} />
              </div>
            }
          </div>
        </div>
      </section>
    </main>
  )
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const response = await fetch(`${API_URL}/cpt_destaques?per_page=20`);
  const data = await response.json();
  const destaques = await data;
  const paths = destaques.map(destaque => ({ params: { destaque: destaque.slug } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { API_URL } = process.env;
  const edicoesApi = await fetch(`${API_URL}/cpt_edicoes?per_page=20`);
  const dataEdicoes = await edicoesApi.json();
  const edicoes = await dataEdicoes;
  const destaquesApi = await fetch(`${API_URL}/cpt_destaques?slug=${params.destaque}`);
  const dataDestaques = await destaquesApi.json();
  const destaque = await dataDestaques;
  return {
    props: {
      edicoes,
      destaque
    },
    revalidate: 10
  }
}


