export function Programa( {sessoes} ) {

    return(
        <>
        {sessoes.map( sessao => {
            return(
                <div key={sessao.numero}>
                <div>{sessao.dia}</div>
                {sessao.filmes && sessao.filmes.map(filme =>{
                    return(
                        <div key={filme.filme_titulo}>
                        <div>{filme.filme_titulo}</div>
                        <div dangerouslySetInnerHTML={{ __html: filme.filme_sinopse }}></div>
                        </div>
                    )
                })}
                </div>
            )
        })}
        </>
    )
}