
import Link from 'next/link'
import { BarCentral } from '../components/commons/BarCentral';
import Moment from 'react-moment';

import styles from './Home.module.scss';

export default function Home({ edicoes, destaques }) {

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
          {destaques && destaques.map(destaque => {
            return (
                <Link key={destaque.id} href={`/${destaque?.slug}`}>
                  <a className={styles.destaqueItem}>
                    <Moment className={styles.destaqueDate} format="DD/MM/YYYY">
                      {destaque.date}
                    </Moment>
                    <div className={styles.destaqueTitle} dangerouslySetInnerHTML={{ __html: destaque.title.rendered }}></div>
                    { destaque?.featured_media_src_url &&
                      <div className={styles.destaqueImage}>
                          <img src={destaque?.featured_media_src_url} alt={destaque.title.rendered} />
                      </div>
                  }
                  </a>
                </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  const edicoesApi = await fetch(`${API_URL}/cpt_edicoes?per_page=20`);
  const dataEdicoes = await edicoesApi.json();
  const edicoes = await dataEdicoes;
  const destaquesApi = await fetch(`${API_URL}/cpt_destaques?per_page=20`);
  const dataDestaques = await destaquesApi.json();
  const destaques = await dataDestaques;
  return {
    props: {
      edicoes,
      destaques
    },
    revalidate: 10
  }
}


