import React, {useEffect, useState} from 'react';
import './styles.css';
import SetItem from "./SetItem";
import {searchForSetByName} from "../../resources/MTG_API";
import {useSelector} from "react-redux";

const SetList = () => {
    const {searchKey} = useSelector(state => state.searchBar);
    const [dbInfo, setDbInfo] = useState([]);

    useEffect(() => {
        searchKey.length > 0 &&
        searchForSetByName(searchKey).then(sets => setDbInfo(sets));
    }, [searchKey])

    dbInfo.sort((a,b) => (a.setName > b.setName) ? 1 : ((b.setName > a.setName) ? -1 : 0));

    return <article className={'setList'}>
        {dbInfo.length === 0 ?
            <p>No set found. :(</p>
            :
            dbInfo.map((set, key) => {
                return <SetItem
                    key={key}
                    setIcon={set.icon}
                    setCode={set.setCode}
                    setName={set.setName}
                />
            })
        }
    </article>
}

export default SetList;
