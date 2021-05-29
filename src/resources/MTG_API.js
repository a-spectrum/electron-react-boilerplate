import {generateObjectCard, generateObjectSet} from "./DAO_objects";

const requestToScryfall = async (url) => {
    return new Promise((resolve) => {
        resolve(fetch(url).then(data => data.json()))
    });
}

export const requestAllCardsBySetCode = async (setCode) => {
    let url = 'https://api.scryfall.com/cards/search?order=set&q=e%3A' + setCode.toLowerCase() + '&unique=prints';
    return new Promise((resolve) => {
        resolve(fetch(url).then(data => data.json()))
    });
}
const getSetIcon = async (url) => {
    return new Promise((resolve) => {
        resolve(fetch(url).then(data => data.text()))
    });
}

export const requestAllSets = async () => {
    let url = 'https://api.scryfall.com/sets';
    return new Promise((resolve) => {
        resolve(fetch(url).then(data => data.json()))
    });
}

export const loadSetsInDb = async () => {
    const setData = await requestAllSets();
    let sets = [];
    const setsInDb = await window.api.getAllSets();
    const exisingSets = [];
    setsInDb.forEach(set => exisingSets.push(set.setCode));
    for (const set of setData.data) {
        if(!exisingSets.includes(set.code)) {
            let tempSet = await generateObjectSet(
                set.code,
                set.name,
                set.set_type,
                set.released_at,
                getSetIcon(set.icon_svg_uri),
            );
            sets.push(tempSet);
        }
    }
    await window.api.loadSets({sets: sets});
}

export const loadCardsInDb = async (setName, setCode) => {
    const cardData = await requestAllCardsBySetCode(setCode);
    let cardDataArray = [];
    cardData.data.forEach(card => {
        cardDataArray.push(generateObjectCard(
            card.name,
            card.rarity,
            card.collector_number,
            card.set,
            card.set_name,
            card.cmc,
            card.mana_cost,
            card.color_identity,
            card.type_line,
            card.oracle_text,
            card.flavor_text,
        ));
    });

    let tempCardData = cardData;
    while (tempCardData.has_more) {
        const nextDataGroup = await requestToScryfall(tempCardData.next_page);
        tempCardData = nextDataGroup;
        nextDataGroup.data.forEach(card => {
            cardDataArray.push(generateObjectCard(
                card.name,
                card.rarity,
                card.collector_number,
                card.set,
                card.set_name,
                card.cmc,
                card.mana_cost,
                card.color_identity,
                card.type_line,
                card.oracle_text,
                card.flavor_text,
            ));
        });
    }

    const foundSets = await window.api.searchForSet({searchFor: setName});
    const setObject = foundSets.filter(set => set.setCode === setCode)[0];

    setObject.cards = cardDataArray;
    setObject.totalCards = cardData.total_cards;

    const updatedSet = await window.api.updateSet({setObject: setObject});
    // console.log(updatedSet);
}

// addCardBySet(set: string) {
//     let cardList: Card[] = [];
//     let cards: Card[] = [];
//     let cardsLeft: boolean = true;
//     let i: number = 1;
//
//     // console.log(this.findCardsBySet("THB", 1));
//
//     while (true) {
//         this.findCardsBySet(set, i).subscribe(
//             response => {
//                 console.log(response.cards)
//                 this.cardBySetStore(response.cards);
//
//                 cards = response.cards;
//                 cardList = cardList.concat(cards);
//                 cards = [];
//             }
//         );
//         i++
//         if (i > 6) {
//             break;
//         }
//     }
//     // return cardList;
// }

export const searchForSetByName = async (setName) => {
    const foundSets = await window.api.searchForSet({searchFor: setName});
    return foundSets;
}


export const showDatabaseInfo = async () => {
    const databaseInfo = await window.api.showInfo();
    console.log(databaseInfo);
}
