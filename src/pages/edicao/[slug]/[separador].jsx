import { Centralbar } from "../../../components/Centralbar";
import { EdicaoMenu } from "../../../components/EdicaoMenu";
import { useRouter } from 'next/router'

export default function Separador() {
    const router = useRouter();
    console.log(router)
    return(
        <main>
        <div>Separador</div>
        <EdicaoMenu />
        <Centralbar />
        <div>{router.query.separador}</div>
        </main>
    )
}



