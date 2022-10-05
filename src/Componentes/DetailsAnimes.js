import { useState, useEffect } from "react";

const DetallesAnimes = (params) => {


const ID = params.params.id 


const[data,setData]=useState([''])
const[loading,setLoading] = useState(true)

useEffect(()=>{
    Search()
},[])


const Search = async () => {
        setLoading(true)
        let url = `https://api.jikan.moe/v4/anime/${ID}`
        const res = await fetch(url);
        const respuesta = await res.json()
        console.log(respuesta.data);
        setData(respuesta.data)
        setLoading(false)
}

return(
    <>
    <main className="Main-cont">
      {
        loading ?
        <h3>Cargando...</h3>
        :(
            <section className="seccion">
            <picture className="seccion-img">
                <img alt={data.title} className='img-path' src={data.images.jpg.image_url}/>
            </picture>
            <div className="cont-detail">
            <article className="texts-titls">
            <h1 className="titls-h1">{data.title}</h1>
            <p className="titls-p">{data.synopsis}</p>
            </article>
            <article className="details-caracteristica">
            {data.genres.map((genero,idx)=>{
                return(
                    <>
                    <p>{genero.name}</p>
                    </>
                )
            })}
            {data.studios.map((studio)=>{
                return(
                    <>
                    <p key={studio.name}>{studio.name}</p>
                    </>
                )
            })}
            {data.themes.map((theme)=>{
                return(
                    <>
                    <p key={theme.name}>{theme.name}</p>
                    </>
                )
            })}
            </article>
            <div className="more-detail">
            <div className="details-episodie">
            <h4>Episodios: {data.episodes || data.rank}</h4>
            <h4>Duracion :{data.duration}</h4>
            <h4>{data.status}</h4>
            </div>
            <div>
            <h2>Otros Titulos:</h2>
            <h2>{data.title_english}</h2>
            <h3>{data.title_japanese}</h3>
            </div>
            </div>
            </div>
        </section>
        )
      }
    </main>
    </>
)

}

export default DetallesAnimes;