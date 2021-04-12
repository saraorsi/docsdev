import { BarCentral } from "../../components/commons/BarCentral";
import { Menu } from "../../components/indice/Menu";
import { Cineastas } from "../../components/indice/Cineastas";
import { EdicoesContext } from "../../contexts/EdicoesContext";
import useSWR from "swr";

import styles from './Indice.module.scss';
import { useState } from "react";


export default function Indice() {

  const [keyword, setKeyword] = useState('');
  const onInputChange = (e) => {
    e.preventDefault;
    setKeyword(e.target.value.toLowerCase());
  }

  const fetcher =
    (...args) => fetch(...args).then((res) => res.json())
  const { API_URL } = process.env;
  const url = `${API_URL}/cpt_edicoes?per_page=50`
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return (
    <main>
      <div className="leftContainer">
        <div className="sectionTitle"></div>
        <div className="sectionContent">
          <Menu />
        </div>
      </div>
      <BarCentral />
      <div className="rightContainer">
        <div className="sectionTitle"></div>
        <div className="sectionContent">
          <div>Loading...</div>
        </div>
      </div>
    </main>)
  const edicoes = data;


  return (
    <EdicoesContext.Provider value={edicoes}>
      <main>
        <section className="leftContainer">
          <div className="sectionTitle">
            <div>indice</div>
            <div className="sectionTitleCircle"></div>
                </div>
          <div className="sectionContent">
            <Menu />
          </div>
        </section>
        <BarCentral />
        <section className="rightContainer">
          <div className="sectionTitle">
            <input className={styles.input} placeholder="Procurar por..."   onChange={onInputChange}/>
            <div className="sectionTitleCircle"></div>
          </div>
          <div className="sectionContent">
            <Cineastas keyword={keyword}/>
          </div>
        </section>
      </main>
    </ EdicoesContext.Provider>
  )
}


