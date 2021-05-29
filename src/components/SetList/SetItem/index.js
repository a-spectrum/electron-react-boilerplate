import React, {Fragment} from 'react';
import './styles.css';
import LabelContainer from "../../LabelContainer";
import {useDispatch} from "react-redux";
import {setShowViewAction} from "../../../redux/application/actions";
import {setSelectedSetByCodeAction, setSelectedSetByNameAction} from "../../../redux/setList/actions";

const SetItem = ({
                     setIcon,
                     setCode,
                     setName,
                 }) => {
    const dispatch = useDispatch();

    return <LabelContainer children={
        <Fragment>
            {/*<input*/}
            {/*    type={"checkbox"}*/}
            {/*    className={"setCheckbox"}*/}
            {/*/>*/}
            <div className={'iconContainer'} dangerouslySetInnerHTML={{__html: setIcon.replace('<svg', '<svg height=20 ')}}></div>
            <p className={"setCode"}>{setCode}</p>
            <p className={"setName"}>{setName}</p>
            <button
                className={"button"}
                onClick={
                    () => {
                        dispatch(setSelectedSetByCodeAction(setCode));
                        dispatch(setSelectedSetByNameAction(setName));
                        dispatch(setShowViewAction('CARDLIST'));
                    }
                }>->
            </button>
        </Fragment>
    }/>
}

export default SetItem;


