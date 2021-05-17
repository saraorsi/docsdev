import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BarCentral } from "../components/commons/BarCentral";
import { Menu } from "../components/indice/Menu";
import { DataContext } from "../contexts/dataContext";
import styles from './styles.module.scss';

export function IndiceLayout({children}) {

    const router =  useRouter();


    const { t } = useTranslation();
    const [activeColumn, setActiveColumn] = useState(false);
    const [activeCircleLeft, setActiveCircleLeft] = useState(true);
    const [activeCircleRight, setActiveCircleRight] = useState(false);
    function toggleSection(){
        setActiveColumn(!activeColumn);
        setActiveCircleLeft(!activeCircleLeft);
        setActiveCircleRight(!activeCircleRight);
    }



    useEffect( () => {
        setActiveColumn(true);
        setActiveCircleLeft(false);
        setActiveCircleRight(true);
        setKeyword('');
    }, [router.query.separador])
    

    const {keyword, setKeyword} = useContext(DataContext);



    const onInputChange = (e) => {
      e.preventDefault;
      setKeyword(e.target.value.toLowerCase());
    }


  
    
    return (
        <>
            <section className={styles.leftContainer}>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                    índice
                    <div className={`${styles.sectionTitleCircle} ${activeCircleLeft ? styles.active : false}`}></div>
                </div>
                <div className={styles.sectionContent}>
                    <Menu 
                        changeSection={() => setActiveColumn(true)}
                    />
                </div>
            </section>

            <BarCentral />

            <section className={`${styles.rightContainer} ${ activeColumn ? styles.activeColumn : false}`}>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                    <input id="input" className={styles.input} value={keyword} placeholder="Procurar por..." onChange={onInputChange}/>
                    <div className={`${styles.sectionTitleCircle} ${activeCircleRight ? styles.active : false}`}></div>
                </div>
                <div className={styles.sectionContent}>
                    {children}
                </div>
            </section>
        </>
    )
}