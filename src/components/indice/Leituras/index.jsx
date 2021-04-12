import useSWR from 'swr';

export function Leituras() {
    const fetcher =
        (...args) => fetch(...args).then((res) => res.json())
    const { API_URL } = process.env;
    const url = `${API_URL}/cpt_leituras?per_page=100`
    const { data, error } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return (<div>
        <div>Loading...</div>
    </div>)
    const leituras = data;
    leituras.sort((a, b) => (a.title.rendered > b.title.rendered ? 1 : -1))

    return (
        <>
       
        {leituras.map( leitura => <div>{leitura.title.rendered}</div>)}
             
        </>
    )
}

