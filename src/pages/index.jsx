
import Link from 'next/link'
import { BarCentral } from '../components/commons/BarCentral';


export default function Home({ edicoes }) {
  return (
    <main>
      <div>Edicoes</div>
      <div>
        {edicoes.map(edicao => {
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
    </main>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  const response = await fetch(`${API_URL}/cpt_edicoes?per_page=20`);
  const data = await response.json();
  const edicoes = await data;
  return {
    props: {
      edicoes,
    },
    revalidate: 10
  }
}


