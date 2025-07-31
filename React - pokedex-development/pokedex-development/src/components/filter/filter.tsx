import React, { useContext, useEffect, useState, SyntheticEvent } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { baseURL, SEARCH_SLICED } from '../../constants/apiUrls';
import { getCamleCaseString } from '../../constants/pokemon.types';
import PokemonContext from '../../context/pokemonContext/pokemon.context';
import {
    getAllParallelCall,
    getPokemonGenders,
    getPokemonTypes,
    removeDuplicateBy,
} from '../../services/common.service';
import './filter.scss';
import AppMultiSelectDropDown, { DropdownOption } from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';
import {  PokemonCardData } from '../../components/pokemonCard/pokemonCard';
import { NamedResource } from '../../store/reducers/reducer';

export interface AppFilterProps {
    isFilterEnable: (enable: boolean) => void;
}

const AppFilter: React.FC<AppFilterProps> = ({ isFilterEnable }) => {
    const context = useContext(PokemonContext);
    const state = context?.state ?? {};
    const { allPokemonsList = [], pokemonsTypes = [], pokemonGenderList = [] } = state as {
        allPokemonsList: NamedResource[];
        pokemonsTypes: DropdownOption[];
        pokemonGenderList: DropdownOption[];
    };
    const { getPokemonData, dispatch, setAppLoading, getPokemonDetailsListByUrl } = context || {};

    const [isOpenTypeFilter, setIsOpenTypeFilter] = useState(false);
    const [isOpenGenderFilter, setIsOpenGenderFilter] = useState(false);

    let data$ = of<NamedResource[]>([]);

    const handleSearchChange = (value: string, event?: SyntheticEvent) => {
        event?.preventDefault();
        const trimmedValue = value.trim();
        setAppLoading?.(true);

        if (trimmedValue.length) {
            isFilterEnable(true);
            data$ = of(allPokemonsList).pipe(
                debounceTime(4000),
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
                map((pokemons) =>
                    pokemons.filter((item) =>
                        item.name.toLowerCase().includes(trimmedValue.toLowerCase())
                    )
                )
            );
        } else {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
        }

        data$.subscribe((pokemonList: NamedResource[]) => {
            if (pokemonList.length > SEARCH_SLICED) {
                pokemonList = pokemonList.slice(0, SEARCH_SLICED);
            }
            getPokemonDetailsListByUrl?.(pokemonList).then(filterPokemonData);
        });

        setAppLoading?.(false);
    };

    const handleTypeChange = (value: (string | number)[], event?: React.SyntheticEvent) => {
        event?.preventDefault();
        if (!value.length) {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
            return;
        }

        isFilterEnable(true);
        getAllParallelCall(value as string[])
            .then((pokemonList: { pokemon: { pokemon: NamedResource }[] }[]) => {
                const uniqueList = removeDuplicateBy(
                    pokemonList.flatMap((res) => res.pokemon).map((res) => res.pokemon),
                    'name'
                );

                const slicedList =
                    uniqueList.length > SEARCH_SLICED
                        ? uniqueList.slice(-SEARCH_SLICED)
                        : uniqueList;

                getPokemonDetailsListByUrl?.(slicedList).then(filterPokemonData);
            });
    };

    const handleGenderChange = (value: (string | number)[], event?: SyntheticEvent) => {
        event?.preventDefault();
        if (!value.length) {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
            return;
        }

        isFilterEnable(true);
        getAllParallelCall(value as string[])
            .then((pokemonList: { pokemon_species_details: { pokemon_species: NamedResource }[] }[]) => {
                let urls = pokemonList
                    .flatMap((res) => res.pokemon_species_details)
                    .map((res) => `${baseURL}/pokemon${res.pokemon_species.url.split('pokemon-species')[1]}`);

                urls = Array.from(new Set(urls));

                const slicedUrls =
                    urls.length > SEARCH_SLICED
                        ? [...urls.slice(0, SEARCH_SLICED), ...urls.slice(-SEARCH_SLICED)]
                        : urls;

                const formattedUrls: NamedResource[] = slicedUrls.map((url) => ({ name: '', url }));

                getPokemonDetailsListByUrl?.(formattedUrls).then(filterPokemonData);
            });
    };

    const filterPokemonData = (data: PokemonCardData[]) => {
        dispatch?.({ type: 'ACTIONS.SET_FILTERED_POKEMON_LIST', payload: data });
    };

    const setPokemonTypes = (data: NamedResource[]) => {
        const payload: DropdownOption[] = data.length
            ? data.map((item) => ({
                  label: getCamleCaseString(item.name),
                  value: item.url,
                  url: item.url,
              }))
            : [];

        dispatch?.({ type: 'ACTIONS.SET_POKEMON_TYPE', payload });
    };

    const setPokemonGendersList = (data: NamedResource[]) => {
        const payload: DropdownOption[] = data.length
            ? data.map((item) => ({
                  label: getCamleCaseString(item.name),
                  value: item.url,
                  url: item.url,
              }))
            : [];

        dispatch?.({ type: 'ACTIONS.SET_POKEMON_GENDER_LIST', payload });
    };

    useEffect(() => {
        getPokemonTypes().then((res) => setPokemonTypes(res.results));
        getPokemonGenders().then((res) => setPokemonGendersList(res.results));
    }, []);

    return (
        <div className="filter-container">
            <div className="filter-wrap">
                <Row className="filter-row-wrap show-grid" style={{ width: '100%' }}>
                    <Col lg={16} xl={16} xs={24} sm={24}>
                        <SearchFilter
                            placeholder="Name or Number"
                            inputClass="pokemon-search-filter"
                            label="Search By"
                            onChangeHandler={handleSearchChange}
                        />
                    </Col>
                    <Col lg={4} xl={4} xs={24} sm={24}>
                        <AppMultiSelectDropDown
                            placeholder="Select Types"
                            isOpen={isOpenTypeFilter}
                            data={pokemonsTypes}
                            label="Type"
                            onChangeHandler={handleTypeChange}
                            onOpenHandler={() => setIsOpenTypeFilter(true)}
                            onCloseHandler={() => setIsOpenTypeFilter(false)}
                            onCleanHandler={() => isFilterEnable(false)}
                        />
                    </Col>
                    <Col lg={4} xl={4} xs={24} sm={24}>
                        <AppMultiSelectDropDown
                            placeholder="Select Gender"
                            isOpen={isOpenGenderFilter}
                            data={pokemonGenderList}
                            label="Gender"
                            onChangeHandler={handleGenderChange}
                            onOpenHandler={() => setIsOpenGenderFilter(true)}
                            onCloseHandler={() => setIsOpenGenderFilter(false)}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AppFilter;
