import React, {Fragment, useEffect, useRef, useState} from 'react';
import './App.css';
import SetSearch from "./components/SetSearch";
import SearchBar from "./components/SearchBar";
import {useSelector} from "react-redux";
import SetList from "./components/SetList";
import CardList from "./components/CardList";
import {loadSetsInDb, testImage} from "./resources/MTG_API";
import PdfPrinter from "./components/PdfPrinter";
import ReactToPrint, {useReactToPrint} from "react-to-print";

const App = () => {
    const {showView} = useSelector(state => state.application);

    useEffect(() => {
        loadSetsInDb().then();
    }, [])

    const componentToPrint = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentToPrint.current,
    });
    return <Fragment>
        <SearchBar/>
        {showView === 'SETLIST' && <SetList />}
        {showView === 'CARDLIST' &&
        <button onClick={handlePrint}>Print this out!</button>}
        {showView === 'CARDLIST' && <CardList innerRef={componentToPrint} />}
    </Fragment>
}

export default App;
