import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { BarCentral } from "../components/commons/BarCentral";
import styles from './styles.module.scss';
import { Menu } from "../components/home/Menu";


export function HomeLayout({children}) {



    const { t } = useTranslation();
    const [activeColumn, setActiveColumn] = useState(false);
    const [activeCircleLeft, setActiveCircleLeft] = useState(true);
    const [activeCircleRight, setActiveCircleRight] = useState(false);
    function toggleSection(){
        setActiveColumn(!activeColumn);
        setActiveCircleLeft(!activeCircleLeft);
        setActiveCircleRight(!activeCircleRight);
    }



    return (
        <>
            <section className={styles.leftContainer}>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                    {t("common:edicoes")}
                    <div className={`${styles.sectionTitleCircle} ${activeCircleLeft ? styles.active : false}`}></div>
                </div>
                <div className={styles.sectionContent}>
                    <Menu />
                </div>
            </section>

            <BarCentral />

            <section className={`${styles.rightContainer} ${activeColumn ? styles.activeColumn : false}`}>
                <div className={styles.sectionTitle} onClick={toggleSection}>
                    {t("common:destaques")}
                    <div className={`${styles.sectionTitleCircle} ${activeCircleRight ? styles.active : false}`}></div>
                </div>
                <div className={styles.sectionContent}>
                    {children}
                </div>
            </section>
    </>
    )
}

  