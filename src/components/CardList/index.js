import React, {useEffect, useRef, useState, Fragment} from 'react';
import './styles.css';
import CardPage from "./CardPage";
import {setShowViewAction} from "../../redux/application/actions";
import {useDispatch, useSelector} from "react-redux";
import {loadCardsInDb, searchForSetByName} from "../../resources/MTG_API";
import {downloadSetAsPdf} from "../../resources/pdf_print_set";
import ReactToPrint, {useReactToPrint} from "react-to-print";

const CardList = ({innerRef}) => {
    const dispatch = useDispatch();
    const {selectedSetCode, selectedSetName} = useSelector(state => state.setList);
    const [dbInfo, setDbInfo] = useState();
    const [cardsInfo, setCardsInfo] = useState([]);
    const [cardPageGroup, setCardPageGroup] = useState([]);
    const [dbUpdate, setDbUpdate] = useState();

    useEffect(() => {
        loadCardsInDb(selectedSetName, selectedSetCode).then(() => {
            setDbUpdate(true);
        });
    }, [selectedSetCode, selectedSetName])

    useEffect(() => {
        searchForSetByName(selectedSetName).then(sets => setDbInfo(sets.filter(set => set.setName === selectedSetName)[0]))
    }, [selectedSetName, dbUpdate])

    useEffect(() => {
        dbInfo !== undefined && setCardsInfo(dbInfo.cards);
    }, [dbInfo])

    useEffect(() => {
        if (cardsInfo.length > 0) {
            let dbInfoCopy = cardsInfo.slice();
            let groupArray = [];
            while (dbInfoCopy.length > 0) {
                let tempArray = dbInfoCopy.splice(0, 300);
                tempArray.length < 300 && (tempArray = tempArray
                    .concat([...Array(300 - tempArray.length)]
                        .map(() => undefined)));
                groupArray.push(tempArray);
            }
            setCardPageGroup(groupArray);
        }
    }, [cardsInfo])


    return <Fragment>
        <div>
            <p >lalalala</p>
        </div>
        <article ref={innerRef} className={'cardList'}>
            {/*{cardPageGroup.length > 0 ? downloadSetAsPdf(dbInfo.icon, cardPageGroup) : <button className={'downloadPdfButton'}/>}*/}
            <button onClick={() => {
                dispatch(setShowViewAction('SETLIST'));
            }
            }>Return to sets
            </button>
            {
                cardPageGroup.length > 0 &&
                cardPageGroup.map((cardPage, key) => {
                    return <CardPage key={key} cardPageGroup={cardPage}/>
                })
            }
        </article>
    </Fragment>
}

export default CardList;
