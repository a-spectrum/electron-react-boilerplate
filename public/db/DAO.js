// import PouchDB from "pouchdb";
// import pouchFind from 'pouchdb-find';
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const {ipcMain} = require('electron');


let isDev;

const getIsDev = () => {
    !isDev && (isDev = require('electron-is-dev'));
    return isDev;
}

const path = require('path');

const dbLocation = getIsDev()
    ? path.join(__dirname, '../db/pouchDatabase')
    : path.join(process.resourcesPath, 'db/pouchDatabase');

const db = new PouchDB(dbLocation);

ipcMain.handle('init-database', (events, args) => {
    // const path = require('path');
    //
    // const dbLocation = getIsDev()
    //     ? path.join(__dirname, '../db/pouchDatabase')
    //     : path.join(process.resourcesPath, 'db/pouchDatabase');
    //
    // db = new PouchDB(dbLocation);
});

const put = () => {
    // pouch.put({
    //     _id: 'Khans of Tarkir',
    //     setCode: 'KTK',
    //     setName: 'Khans of Tarkir',
    //     setType: 'expansion',
    //     releaseDate: '2014-09-26',
    //     icon: null,
    // }, (err, result) => {
    //     if (!err) {
    //         console.log('Successfully posted a todo!');
    //     }
    //     else {
    //         console.log(err);
    //     }
    // });
}

const bulkDocks = (docs) => {
    let testSet = [{
        _id: 'Khans of Tarkir',
        setCode: 'KTK',
        setName: 'Khans of Tarkir',
        setType: 'expansion',
        releaseDate: '2014-09-26',
        icon: null,
    },
        {
            _id: 'Legends',
            setCode: 'LEG',
            setName: 'Legends',
            setType: 'expansion',
            releaseDate: '1994-06-01',
            icon: null,
        },
        {
            _id: 'Ravnica Allegiance',
            setCode: 'RNA',
            setName: 'Ravnica Allegiance',
            setType: 'expansion',
            releaseDate: '2019-01-25',
            icon: null,
        },
        {
            _id: 'Kaldheim',
            setCode: 'KHM',
            setName: 'Kaldheim',
            setType: 'expansion',
            releaseDate: '2021-02-05',
            icon: null,
        }];

    db.bulkDocs(testSet).then(function (result) {
        // console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
}

ipcMain.handle('load-sets', (events, args) => {
    return new Promise((resolve) => {
        resolve(db.bulkDocs(args.sets).then((result) => {
            // console.log(result);
        }).catch(function (err) {
            console.log(err);
        }))
    });
});

ipcMain.handle('return-all-sets', (events, args) => {
    return new Promise((resolve, reject) => {
        db.find({
            selector: {db_type:
                    {
                        $eq: 'set'
                    }
            },
        }).then(function (result) {
            resolve(result.docs);
        }).catch(function (err) {
            console.log(err);
        });

    });
});

ipcMain.handle('update-set', (events, args) => {
    return new Promise((resolve, reject) => {
        db.put(args.setObject).then(function (result) {
            // console.log(result);
            resolve(result);
        }).catch(function (err) {
            console.log(err);
        });

    });
});

ipcMain.handle('search-for-sets', (events, args) => {
    const regex = new RegExp('[a-zA-Z]*' + args.searchFor + '[a-zA-Z]*', 'i');
    return new Promise((resolve, reject) => {
        db.find({
            selector: {setName:
                    {
                        $regex: regex
                    }
            },
        }).then(function (result) {
            resolve(result.docs);
        }).catch(function (err) {
            console.log(err);
        });

    });
});

ipcMain.handle('show-info', (events, args) => {
    return new Promise((resolve, reject) => {
        db.info((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
});



//
// pouch.get('Kaldheim').then((doc) => {
//     console.log(doc);
// }).catch(function (err) {
//     console.log(err);
// });
//
// pouch.info().then(function (info) {
//     console.log(info);
//     setDbInfo(info.db_name);
// })



// pouch.allDocs({
//     startkey: keyDB,
//     endkey: keyDB + "\ufff0",
//     include_docs: true,
//     attachments: true
// }).then(function (result) {
//     console.log(result);
// }).catch(function (err) {
//     console.log(err);
// });
