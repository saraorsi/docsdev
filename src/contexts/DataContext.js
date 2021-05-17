import { createContext, useState } from 'react';

export const DataContext = createContext({});


export default function DataContextProvider({ children }) {

    const [edicoes, setEdicoes] = useState([]);
    const [realizadores, setRealizadores] = useState([]);
    const [edicao, setEdicao] = useState([]);
    const [realizador, setRealizador] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [leituras, setLeituras] = useState('');
    const [leiturasEdicao, setLeiturasEdicao] = useState('');



    return (

        <DataContext.Provider value={{ edicoes, setEdicoes, realizadores, setRealizadores, edicao, setEdicao, realizador, setRealizador, keyword, setKeyword, leituras, setLeituras, leiturasEdicao, setLeiturasEdicao }}>
            {children}
        </DataContext.Provider>
    )
}
