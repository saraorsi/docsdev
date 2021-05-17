import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BarCentral } from "../components/commons/BarCentral";
import { Menu } from "../components/edicao/Menu";
import { DataContext } from "../contexts/dataContext";
import styles from './styles.module.scss';

export function EdicaoLayout({children}) {
    const router =  useRouter();

    const [activeColumn, setActiveColumn] = useState(true);
    const [activeCircleLeft, setActiveCircleLeft] = useState(false);
    const [activeCircleRight, setActiveCircleRight] = useState(true);

    function toggleSection(){
        setActiveColumn(!activeColumn);
        setActiveCircleLeft(!activeCircleLeft);
        setActiveCircleRight(!activeCircleRight);
    }
    useEffect( () => {
        setActiveColumn(true);
        setActiveCircleLeft(false);
        setActiveCircleRight(true);
    }, [router.query.separador])


  

    const {edicao} = useContext(DataContext);

    return (
        <>
            <section className={styles.leftContainer }>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                <div>{edicao && edicao?.ano} <sup className={styles.edicaoData}>{edicao && edicao?.datas}</sup></div>
                    <div className={`${styles.sectionTitleCircle} ${activeCircleLeft ? styles.active : false}`}></div>
                </div>   
                <div className={styles.sectionContent}>
                    <Menu />
                </div>
            </section>

            <BarCentral />

            <section className={`${styles.rightContainer} ${ activeColumn ? styles.activeColumn : false}`}>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                    <div dangerouslySetInnerHTML={{ __html:edicao && edicao?.titulo }}></div>
                    <div className={`${styles.sectionTitleCircle} ${activeCircleRight ? styles.active : false}`}></div>
                </div>
                <div className={styles.sectionContent}>
                    {children}
                </div>
            </section>
        </>
    )
}