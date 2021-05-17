import Link from 'next/link'

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR'
import styles from './Home.module.scss';

import { HomeLayout } from '../layouts/HomeLayout'

import { api } from '../services/api';
import { useContext, useEffect } from 'react';
import { DataContext } from '../contexts/dataContext';

export default function Home({ edicoes, destaques }) {

  const { setEdicoes } = useContext(DataContext);
  useEffect(() => { setEdicoes(edicoes) },
    [edicoes])

  return (
    <>
      {destaques && destaques.map(destaque => {
        return (
          destaque.link ? (
            <a key={destaque?.id} className={styles.destaqueItem} href={destaque.link} target="_blank">
              <div className={styles.destaqueDate}>
                {format(parseISO(destaque.data), 'd MMMM Y', { locale: pt })}
              </div>
              <div className={styles.destaqueTitle} dangerouslySetInnerHTML={{ __html: destaque?.titulo }}></div>
              {destaque.thumbnail &&
                <div className={styles.destaqueImage}>
                  <img src={destaque.thumbnail} alt={destaque.titulo} />
                </div>
              }
            </a>

          ) : (
            <Link key={destaque.id} href={`/destaque/${destaque.slug}`}>
              <a className={styles.destaqueItem}>
                <div className={styles.destaqueDate}>
                  {format(parseISO(destaque.data), 'd MMMM Y', { locale: pt })}
                </div>
                <div className={styles.destaqueTitle} dangerouslySetInnerHTML={{ __html: destaque.titulo }}></div>
                {destaque.thumbnail &&
                  <div className={styles.destaqueImage}>
                    <img src={destaque.thumbnail} alt={destaque.titulo} />
                  </div>
                }
              </a>
            </Link>
          )
        )
      })
      }
    </>
  )
}

Home.Layout = HomeLayout;

export async function getStaticProps({ locale }) {


  const edicoesData = await api.get('edicoes', {
    params: {
      lang: locale == 'pt' ? '' : ''
    }
  })
  const edicoes = edicoesData.data.sort((a, b) => (a.ano > b.ano ? -1 : 1));


  const destaquesData = await api.get('destaques', {
    params: {
      lang: locale == 'pt' ? '' : ''
    }
  })
  const destaques = destaquesData.data;


  return {
    props: {
      edicoes,
      destaques
    },
    revalidate: 10
  }
}


