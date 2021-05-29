import React, {useEffect, useState} from 'react';
import './styles.css';
import CardItem from "./CardItem";

const CardPage = ({
                      cardPageGroup,
                  }) => {
    const [rowOne, setRowOne] = useState([]);
    const [rowTwo, setRowTwo] = useState([]);
    const [rowThree, setRowThree] = useState([]);

    useEffect(() => {
        setRowOne(cardPageGroup.slice(0, 100));
        setRowTwo(cardPageGroup.slice(100, 200));
        setRowThree(cardPageGroup.slice(200, 300));
    }, [])

    return <section className={'cardPage'}>
        <section className={'cardRow'} key={'row1'}>
            {
                rowOne.length > 0 &&
                rowOne.map((card, key) => {
                    if (card !== undefined) {
                        return <CardItem
                            key={key + '_' + card.number}
                            number={card.number}
                            rarity={card.rarity}
                            name={card.cardName}
                        />
                    } else {
                        return <CardItem/>
                    }
                })
            }
        </section>
        <section className={'cardRow'} key={'row2'}>
            {
                rowTwo.length > 0 &&
                rowTwo.map((card, key) => {
                    if (card !== undefined) {
                        return <CardItem
                            key={key + '_' + card.number}
                            number={card.number}
                            rarity={card.rarity}
                            name={card.cardName}
                        />
                    } else {
                        return <CardItem/>
                    }
                })
            }
        </section>
        <section className={'cardRow'} key={'row3'}>
            {
                rowThree.length > 0 &&
                rowThree.map((card, key) => {
                    if (card !== undefined) {
                        return <CardItem
                            key={key + '_' + card.number}
                            number={card.number}
                            rarity={card.rarity}
                            name={card.cardName}
                        />
                    } else {
                        return <CardItem/>
                    }
                })
            }
        </section>
    </section>
}

export default CardPage;
