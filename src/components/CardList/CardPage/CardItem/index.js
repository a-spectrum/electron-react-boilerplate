import React from 'react';
import './styles.css';

const CardItem = ({
                      ownedNormal,
                      ownedFoil,
                      number,
                      rarity,
                      name,
                  }) => {

    const renderRarity = (rarity) => {
        if (rarity !== undefined) return rarity.substr(0, 1).toUpperCase();
    }

    const renderName = (name) => {
        // if(name.length > 48) return name.substr(0,48).trim() + '...';

        return name.replace('//', '/').trim();
    }

    return <section className={'card--container'}>
        <input
            type={"checkbox"}
            className={"setCheckbox"}
        />
        <input
            type={"radio"}
            className={"setCheckbox"}
        />
        <p className={"cardNumber"}>{number}</p>
        <p className={"cardRarity"}>{renderRarity(rarity)}</p>
        <p className={"cardName"}>{name !== undefined && renderName(name)}</p>
    </section>


}

export default CardItem;


