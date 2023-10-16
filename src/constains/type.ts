export type Overview = {
    name: string,
    url: string,
}

export type ListPokemon = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Overview[],
}

type Ability = {
    ability: Overview,
    is_hidden: boolean,
    slot: number,
}

type FormOverview = {
    name: string,
    url: string,
}

type GameIndice = {
    game_index: number,
    version: Overview,
}

type VersionGroup = {
    level_learned_at: number,
    move_learn_method: Overview,
    version_group: Overview,
}

type Move = {
    move: Overview,
    version_group_detail: VersionGroup[],
}

type Sprites = {
    back_default: string
    back_female: string | null
    back_shiny: string
    back_shiny_female: string | null
    front_default: string
    front_female: string | null
    front_shiny: string
    front_shiny_female: string | null
    other: object,
    version: object
}

type Stat = {
    base_stat: number,
    effort: number,
    stat: Overview,
}

type Type = {
    slot: number,
    type: Overview,
}

export type PokemonDetail = {
    abitities: Ability[],
    base_experience: number,
    form: FormOverview[],
    game_indices: GameIndice[],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Move[],
    name: string,
    order: number,
    past_types: [],
    species: Overview,
    sprites: Sprites,
    stats: Stat[],
    types: Type[],
    weight: number,
}



