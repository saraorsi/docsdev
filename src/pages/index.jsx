
import Link from 'next/link'
import { BarCentral } from '../components/commons/BarCentral';


export default function Home({ edicoes, destaques }) {

  edicoes.sort((a, b) => (a.acf.ano > b.acf.ano ? -1 : 1))
  return (
    <main>
      <div>Edicoes</div>
      <div>
        {edicoes && edicoes.map(edicao => {
          return (
            <div key={edicao.id}>
              <Link href={`/edicao/${edicao.slug}`}>
                <a dangerouslySetInnerHTML={{ __html: edicao.title.rendered }}></a>
              </Link>
            </div>
          )
        })
        }
      </div>
      <BarCentral />
      <div>Destaques</div>
      <div>
        {destaques && destaques.map(destaque => {
          return(
            <div key={destaque.id}>
            <Link href={`#`}>
              <a dangerouslySetInnerHTML={{ __html: destaque.title.rendered }}></a>
            </Link>
          </div>
          )
        })}
      </div>
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


