import { Centralbar } from "../../../components/Centralbar";
import { EdicaoMenu } from "../../../components/EdicaoMenu";

export default function Edicao({edicao}) {
    return(
        <main>
        <div>{edicao}</div>
        <EdicaoMenu />
        <Centralbar />
        <div></div>
        </main>
    )
}

