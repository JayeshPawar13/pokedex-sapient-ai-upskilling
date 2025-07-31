
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { baseURL, SEARCH_SLICED } from '../../constants/apiUrls';
import { getCamleCaseString } from '../../constants/pokemon.types';
import PokemonContext from '../../context/pokemonContext/pokemon.context';
import { getAllParallelCall, getPokemonGenders, getPokemonTypes, removeDuplicateBy } from '../../services/common.service';
import "./filter.scss";
import AppMultiSelectDropDown from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';


export interface AppFilterProps {
  isFilterEnable: (enable: boolean) => void;
}

const AppFilter: React.FC<AppFilterProps> = (props) => {

    const context = useContext(PokemonContext);
    const state = context?.state ?? {};
    const getPokemonData = context?.getPokemonData;
    const dispatch = context?.dispatch;
    const setAppLoading = context?.setAppLoading;
    const getPokemonDetailsListByUrl = context?.getPokemonDetailsListByUrl;
    const { allPokemonsList = [], pokemonsTypes = [], pokemonGenderList = [] } = state as any;

    const [isOpenTypeFilter, setIsOpenTypeFilter] = useState<boolean>(false);
    const [isOpenGendreFilter, setIsOpenGenderFilter] = useState<boolean>(false);

    let data$ = of<any[]>([]);

    const onOpenTypeHandler = (): void => {
        setIsOpenTypeFilter(true);
    }
    const onCloseTypeHandler = (): void => {
        setIsOpenTypeFilter(false);
    }

    const onOpenGenderHandler = (): void => {
        setIsOpenGenderFilter(true);
    }
    const onCloseGenderHandler = (): void => {
        setIsOpenGenderFilter(false);
    }

    const onCleanTypeHandler = (event?: React.SyntheticEvent) => {
        if (event) {
            props.isFilterEnable(false);
        }
    }


    const onSearchChangeHandler = (value: string, event: React.SyntheticEvent) => {
        event.preventDefault();
        value = value.trim();
        if (setAppLoading) setAppLoading(true);
        if (value.length) {
            props.isFilterEnable(true);
            data$ = of(allPokemonsList).pipe(
                debounceTime(4000),
                distinctUntilChanged(),
                map((pokmons: any[]) => {
                    return pokmons.filter((item: any) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
                })
            );
        } else {
            filterPokemonData([]);
            if (getPokemonData) getPokemonData(true);
            props.isFilterEnable(false);
        }

        data$.subscribe((pokemanList: any[]) => {
            if (pokemanList.length > SEARCH_SLICED) {
                pokemanList = pokemanList.slice(0, SEARCH_SLICED)
            }
            if (getPokemonDetailsListByUrl) getPokemonDetailsListByUrl(pokemanList).then((res: any) => { filterPokemonData(res) });
        });
        if (setAppLoading) setAppLoading(false);
    }

    const onTypeChangeHandler = (value: any[], event: React.SyntheticEvent) => {
        event.preventDefault();
        if (value.length) {
            props.isFilterEnable(true);
            getAllParallelCall(value).then((pokemonList: any[]) => {
                pokemonList = pokemonList.map((res: any) => res.pokemon);
                pokemonList = pokemonList.flat().map((res: any) => res.pokemon);
                pokemonList = removeDuplicateBy(pokemonList, 'name');
                if (pokemonList.length > SEARCH_SLICED) {
                    pokemonList = pokemonList.slice(-SEARCH_SLICED)
                }
                if (getPokemonDetailsListByUrl) getPokemonDetailsListByUrl(pokemonList).then((res: any) => { filterPokemonData(res) });
            }).catch((err: any) => Error(err));
        } else {
            filterPokemonData([]);
            if (getPokemonData) getPokemonData(true);
            props.isFilterEnable(false);
        }
    }

    const onGenderChangeHandler = (value: any[], event: React.SyntheticEvent) => {
        event.preventDefault();
        if (value.length) {
            props.isFilterEnable(true);
            getAllParallelCall(value).then((pokemonList: any[]) => {
                pokemonList = pokemonList.map((res: any) => res.pokemon_species_details).flat();
                pokemonList = pokemonList.map((res: any) => baseURL + "/pokemon" + res.pokemon_species.url.split("pokemon-species")[1]);
                pokemonList = [...new Set(pokemonList)]
                if (pokemonList.length > SEARCH_SLICED) {
                    pokemonList = [...pokemonList.slice(0, SEARCH_SLICED), ...pokemonList.slice(-SEARCH_SLICED)]
                }
                pokemonList = pokemonList.map((res: any) => ({ url: res }));
                if (getPokemonDetailsListByUrl) getPokemonDetailsListByUrl(pokemonList).then((res: any) => { filterPokemonData(res) });
            }).catch((err: any) => Error(err));
        } else {
            filterPokemonData([]);
            if (getPokemonData) getPokemonData(true);
            props.isFilterEnable(false);
        }
    }

    const filterPokemonData = (data: any[]) => {
        if (dispatch) dispatch({
            type: "ACTIONS.SET_FILTERED_POKEMON_LIST",
            payload: data
        });
    }

    const setPokemonTypes = (data: any[]) => {
        if (data.length) {
            data = data.map((item: any) => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
            if (dispatch) dispatch({
                type: "ACTIONS.SET_POKEMON_TYPE",
                payload: data
            });
        } else {
            if (dispatch) dispatch({
                type: "ACTIONS.SET_POKEMON_TYPE",
                payload: []
            });
        }
    }


    const setPokemonGendersList = (genderList: any[]) => {
        genderList = genderList.map((item: any) => ({ label: getCamleCaseString(item.name), value: item.url, url: item.url }));
        if (genderList.length) {
            if (dispatch) dispatch({
                type: "ACTIONS.SET_POKEMON_GENDER_LIST",
                payload: genderList
            });
        } else {
            if (dispatch) dispatch({
                type: "ACTIONS.SET_POKEMON_GENDER_LIST",
                payload: []
            });
        }
    }

    const getAllPokemonType = async () => {
        getPokemonTypes().then(res => {
            setPokemonTypes(res.results);
        }).catch(err => {
            return new Error(err)
        });
    }

    const getPokemonGendersList = async () => {
        getPokemonGenders().then(res => {
            setPokemonGendersList(res.results);
        }).catch(err => {
            return new Error(err)
        });
    }

    useEffect(() => {
        getAllPokemonType();
        getPokemonGendersList();

    }, []);

    return (
        <>
            <div className="filter-container">
                <div className="filter-wrap">
                    <Row className="filter-row-wrap show-grid" style={{ width: '100%' }}>
                        <Col lg={16} xl={16} xs={24} sm={24}>
                            <div>
                                <SearchFilter placeholder="Name or Number" inputClass="pokemon-search-filter" label="Search By" onChangeHandler={(value,event) => onSearchChangeHandler(value, event)} />
                            </div>
                        </Col>
                        <Col lg={4} xl={4} xs={24} sm={24}>
                            <div>
                                <AppMultiSelectDropDown placeholder="Select Types" isOpen={isOpenTypeFilter} data={pokemonsTypes} label="Type" onChangeHandler={(value,event) => onTypeChangeHandler(value, event)} onOpenHandler={onOpenTypeHandler} onCloseHandler={onCloseTypeHandler} onCleanHandler={onCleanTypeHandler} />
                            </div>
                        </Col>
                        <Col lg={4} xl={4} xs={24} sm={24}>
                            <div>
                                <AppMultiSelectDropDown placeholder="Select Gender" isOpen={isOpenGendreFilter} data={pokemonGenderList} label="Gender" onChangeHandler={(value,event) => onGenderChangeHandler(value, event)} onOpenHandler={onOpenGenderHandler} onCloseHandler={onCloseGenderHandler} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    )
};


export default AppFilter;