// example/src/math-functions/mainExport.ts

interface MainExport  {
    ( )
    : {
    addSum: (a: number, b: number) => number,
    getPercentage: (a: number, b: number) => number,
    multiplyBy: (a: number, b: number) => number


    } }


const mainExport: MainExport = () => {
    return {
        addSum: (a: number, b: number) => a + b,
        getPercentage: (a: number, b: number) => a * b,
        multiplyBy: (a: number, b: number) => a * b
    }
}

export default mainExport