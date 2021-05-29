import {combineEpics} from 'redux-observable';
// import {combineEpics, ofType} from 'redux-observable';
// import {from, interval} from 'rxjs';
// import {map, mapTo, switchMap, takeUntil, throttleTime} from 'rxjs/operators';

// const promise = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const value = Math.random();
//             let color;
//
//             if (value >= 0 && value < 0.33) {
//                 color = RED;
//             }
//
//             if (value >= 0.33 && value < 0.67) {
//                 color = BLUE;
//             }
//
//             if (value >= 0.67 && value <= 1) {
//                 color = GREEN;
//             }
//
//             resolve(color);
//         }, 500);
//     });
// };
//
// const minusEpic = action$ => action$.pipe(
//     ofType(START_MINUS),
//     throttleTime(300),
//     mapTo(minusAction)
// );
//
// const plusEpic = action$ => action$.pipe(
//     ofType(START_PLUS),
//     throttleTime(300),
//     mapTo(plusAction)
// );
//
// const randomEpic = action$ => action$.pipe(
//     ofType(START_RANDOM),
//     switchMap(() => interval(1000)
//         .pipe(
//             takeUntil(action$.pipe(
//                 ofType(STOP_RANDOM)
//             )),
//             map(() => randomChangeAction(Math.random() < 0.5))
//         )
//     )
// );
//
// const resetEpic = action$ => action$.pipe(
//     ofType(RESET),
//     mapTo(stopRandomAction)
// );
//
// const colorEpic = action$ => action$.pipe(
//     ofType(START_COLOR),
//     switchMap(() => from(promise())
//         .pipe(
//             map((value) => colorAction(value))
//         )
//     )
// );

const rootEpic = combineEpics(
);
export default rootEpic;
