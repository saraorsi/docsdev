import { Centralbar } from '../components/Centralbar'

export default function Home({ edicoes }) {
  return (
   <main>
      <div>Edicoes</div>
      <div>
        {edicoes.map( edicao => <div dangerouslySetInnerHTML={{ __html: edicao.title.rendered }}></div>)
        }
      </div>
      <Centralbar />
      <div>Destaques</div>
   </main>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env;
  console.log(API_URL)
  const response = await fetch(`${API_URL}/cpt_edicoes?per_page=20`);
  const data = await response.json();
  const edicoes = await data;
  return {
    props: {
      edicoes,

    },
    revalidate: 1
  }
}


