import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt'
import styles from '../Home.module.scss';
import { HomeLayout } from '../../layouts/HomeLayout';
import { api } from '../../services/api';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../contexts/dataContext';

export default function Destaques({ edicoes, destaque }) {

  const { setEdicoes } = useContext(DataContext)

  useEffect(
    () => { setEdicoes(edicoes) },
    [edicoes]
  )

  return (
      <>
          <div className={styles.destaqueContent}>
          <div className={styles.destaqueDate}>
            {format(parseISO(destaque.data), 'd MMMM Y', { locale: pt })}
          </div>
          <div className={styles.destaqueTitle} dangerouslySetInnerHTML={{ __html: destaque.titulo }}></div>
          {destaque.thumbnail &&
            <div className={styles.destaqueImage}>
              <img src={destaque.thumbnail} alt={destaque.titulo} />
            </div>
          }
          <div className={styles.destaqueText} dangerouslySetInnerHTML={{ __html: destaque.conteudo}}></div>
        </div>
      
      </>

  )
}

Destaques.Layout = HomeLayout;

export async function getStaticPaths() {

  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params, locale }) {

  const edicoesData = await api.get('edicoes', {
    params: {
      lang: locale == 'pt' ? '' : ''
    }
  })
  const edicoes = await edicoesData.data.sort((a, b) => (a.ano > b.ano ? -1 : 1));

  const destaqueData = await api.get(`destaque/${params.destaque}`, {
    params: {
      lang: locale == 'pt' ? '' : ''
    }
  })
  const destaque = await destaqueData.data;

  return {
    props: {
      edicoes,
      destaque
    },
    revalidate: 10
  }
}


