import { useEffect, useState } from "react"
import { ListPokemon, PokemonDetail, Overview } from "../../constains/type"
import axios from "axios"
import Page from "../../components/ui/Page"

const Home = () => {
    const [pokemonOverviewList, setPokemonOverviewList] = useState<ListPokemon | null>(null)
    const [url, setUrl] = useState<string | undefined>('https://pokeapi.co/api/v2/pokemon')
    const [pokemonList, setPokemonList] = useState<(PokemonDetail | undefined)[]>([])
    useEffect(() => {
        const getOverviewList = async () => {
            axios.get(url ? url : "")
                .then(response => {
                    console.log('Axios get response: ', response.data)
                    setPokemonOverviewList(response?.data ? response.data : null)
                    const pokemons: (PokemonDetail | undefined)[] = []
                    response?.data?.results.forEach((item: Overview) => {
                        axios.get(item.url)
                            .then(response => {
                                console.log('Axios get response: ', response.data)
                                pokemons.push(response.data)
                            }).catch(error => console.log("Axios get error: ", error))
                            .finally(() => {
                                if (pokemons.length === response.data.results.length) {
                                    setPokemonList(pokemons)
                                }
                            })
                    })
                }).catch(error => console.log("Axios get error: ", error))
                .finally(() => {
                })
        }
        getOverviewList()
    }, [url])
    return (
        <div className="home-container">
            <h4 className='text-center'>Pokemon</h4>
            <div className="home-content p-5">
                <div className="grid grid-cols-4 gap-12">
                    {pokemonList.map((item: PokemonDetail | undefined, index: number) => {
                        return (
                            <div key={index} className="col-span-1 cursor-pointer flex flex-col items-center hover:scale-110 hover:shadow-lg hover:shadow-white transition-all">
                                <img src={item?.sprites?.front_default} alt={item?.name} className="w-60 h-60 bg-zinc-700" />
                                <h6 className="text-center py-3 bg-zinc-600 w-60">{item?.name.toUpperCase()}</h6>
                            </div>
                        )
                    })
                    }
                </div>
                <Page
                    dark
                    total={pokemonOverviewList?.count}
                    pagesize={20}
                    onChange={(pg) => { setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${(pg - 1) * 20}&limit=20`) }}
                />
            </div>
        </div>
    )
}

export default Home