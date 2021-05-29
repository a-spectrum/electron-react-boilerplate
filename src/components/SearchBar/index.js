import React, {useEffect, useState} from 'react';
import './styles.css';
import {useDispatch} from "react-redux";
import {setSearchKeyAction} from "../../redux/searchBar/actions";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        dispatch(setSearchKeyAction((searchKey)));
    }, [searchKey, dispatch])

    return <section
            className={'searchbar--container'}
            >
        <input
            type={'text'}
            className={'searchbar--input'}
            onChange={(event) => {
                setSearchKey(event.target.value);
            }}
        />
    </section>
}

export default SearchBar;
