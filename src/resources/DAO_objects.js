export const generateObjectSet = async (setCode, setName, setType, releaseData, icon) => {
    const setIcon = await icon;
    // console.log(setIcon);
    return {
        setCode,
        setName,
        setType,
        releaseData,
        totalCards: 0,
        icon: setIcon.toString(),
        db_type: 'set',
        cards: [],
    };
}

export const generateObjectCard = (cardName, rarity, number, setCode, setName, manaCost, manaColours, colourIdentity, type, oracleText, flavourText) => {
    return {
        ownedNormal: false,
        ownedFoil: false,
        cardName: cardName,
        rarity: rarity,
        number: number,
        setCode: setCode,
        setName: setName,
        manaCost: manaCost,
        manaColours: manaColours,
        colourIdentity: colourIdentity,
        type: type,
        oracleText: oracleText,
        flavourText: flavourText,
        db_type: 'card',
    };
}
