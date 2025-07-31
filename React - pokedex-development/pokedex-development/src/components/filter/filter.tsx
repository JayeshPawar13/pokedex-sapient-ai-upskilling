import React, { useContext, useEffect, useState } from 'react';
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

export interface AppFilterProps {
    isFilterEnable: (enable: boolean) => void;
}

const AppFilter: React.FC<AppFilterProps> = ({ isFilterEnable }) => {
    const context = useContext(PokemonContext);
    const state = context?.state ?? {};
    const { allPokemonsList = [], pokemonsTypes = [], pokemonGenderList = [] } = state as Record<string, unknown>;
    const { getPokemonData, dispatch, setAppLoading, getPokemonDetailsListByUrl } = context || {};

    const [isOpenTypeFilter, setIsOpenTypeFilter] = useState(false);
    const [isOpenGenderFilter, setIsOpenGenderFilter] = useState(false);

    let data$ = of<any[]>([]);

    const handleSearchChange = (value: string, event: any) => {
        event.preventDefault();
        const trimmedValue = value.trim();
        setAppLoading?.(true);

        if (trimmedValue.length) {
            isFilterEnable(true);
            data$ = of(allPokemonsList as any[]).pipe(
                debounceTime(4000),
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
                map((pokemons) =>
                    pokemons.filter((item: any) =>
                        item.name.toLowerCase().includes(trimmedValue.toLowerCase())
                    )
                )
            );

        } else {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
        }

        data$.subscribe((pokemonList: any[]) => {
            if (pokemonList.length > SEARCH_SLICED) {
                pokemonList = pokemonList.slice(0, SEARCH_SLICED);
            }
            getPokemonDetailsListByUrl?.(pokemonList).then(filterPokemonData);
        });

        setAppLoading?.(false);
    };

    const handleTypeChange = (value: any[], event: any) => {
        event.preventDefault();
        if (!value.length) {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
            return;
        }

        isFilterEnable(true);
        getAllParallelCall(value)
            .then((pokemonList: any[]) => {
                const uniqueList = removeDuplicateBy(
                    pokemonList.flatMap((res: any) => res.pokemon).map((res: any) => res.pokemon),
                    'name'
                );

                const slicedList =
                    uniqueList.length > SEARCH_SLICED
                        ? uniqueList.slice(-SEARCH_SLICED)
                        : uniqueList;

                getPokemonDetailsListByUrl?.(slicedList).then(filterPokemonData);
            })
            
    };

    const handleGenderChange = (value: any[], event: any) => {
        event.preventDefault();
        if (!value.length) {
            filterPokemonData([]);
            getPokemonData?.(true);
            isFilterEnable(false);
            return;
        }

        isFilterEnable(true);
        getAllParallelCall(value)
            .then((pokemonList: any[]) => {
                let urls = pokemonList
                    .flatMap((res: any) => res.pokemon_species_details)
                    .map((res: any) => `${baseURL}/pokemon${res.pokemon_species.url.split('pokemon-species')[1]}`);

                urls = Array.from(new Set(urls));

                const slicedUrls =
                    urls.length > SEARCH_SLICED
                        ? [...urls.slice(0, SEARCH_SLICED), ...urls.slice(-SEARCH_SLICED)]
                        : urls;

                const formattedUrls = slicedUrls.map((url) => ({ url }));

                getPokemonDetailsListByUrl?.(formattedUrls).then(filterPokemonData);
            })
           
    };

    const filterPokemonData = (data: any[]) => {
        dispatch?.({ type: 'ACTIONS.SET_FILTERED_POKEMON_LIST', payload: data });
    };

    const setPokemonTypes = (data: any[]) => {
        const payload = data.length
            ? data.map((item: any) => ({
                label: getCamleCaseString(item.name),
                value: item.url,
                url: item.url,
            }))
            : [];

        dispatch?.({ type: 'ACTIONS.SET_POKEMON_TYPE', payload });
    };

    const setPokemonGendersList = (data: any[]) => {
        const payload = data.length
            ? data.map((item: any) => ({
                label: getCamleCaseString(item.name),
                value: item.url,
                url: item.url,
            }))
            : [];

        dispatch?.({ type: 'ACTIONS.SET_POKEMON_GENDER_LIST', payload });
    };

    useEffect(() => {
        getPokemonTypes()
            .then((res) => setPokemonTypes(res.results))
            

        getPokemonGenders()
            .then((res) => setPokemonGendersList(res.results))
            
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
                            data={pokemonsTypes as DropdownOption[] | undefined}
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
                            data={pokemonGenderList as DropdownOption[] | undefined}
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
