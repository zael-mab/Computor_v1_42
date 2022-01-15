const checkSyntax = (regex1, regex2, arr) => {

    const matches = arr.match(regex1);
    // console.log (matches);
    if (matches != null) {
        matches.forEach(element => {
            // console.log(`element => ${element}`);
            const check = element.match(regex2);

            if (check === null) {
                console.log(`syntax Error [${element}] | ${arr}\nI can't solve that`);
                process.exit(1);
            }
        });
    }
};

//////////////////////////////
const setData = (str) => {
    let j = 0;
    let parentheses = 0;
    const regex = /\*\s{0,}\/|\/\s{0,}\*|\/\s{0,}\/|\*\s{0,}\*/;

    if (str.arr.match(/[0-9]X/ig) || str.arr.match(regex) || str.arr.match(/[\+\-][\/\*]/g) || str.arr.match(/[\/]X/ig)) {
        console.log('Syntax Error');
        process.exit(1);
    }


    for (let i = 0; i <= str.arr.length; i++) {

        // ///////////////
        parentheses = str.arr[i] === '(' ? parentheses + 1 : parentheses;
        parentheses = str.arr[i] === ')' ? parentheses - 1 : parentheses;

        // ///////////////
        if ((str.arr[i] === 'X' || str.arr[i] === 'x') && str.arr[i + 1] === '^') {
            if (str.arr[i + 2] === '0') {
                str.arr = str.arr.replace(/X\^0/gi, 1);
            }
            //
            if (str.arr[i + 2] === '1') {
                str.arr = str.arr.replace(/X\^1/gi, 'X');
            }
        }

        // ///////////////
        // if (str.arr[i] === '('){
        //     p = i;
        // }
        // if (str.arr[i] === ')'){
        //     const holder = str.arr.slice(p, i + 1).trim();
        //     str.par.push(holder);
        //     p = 0;
        //     console.log (`holder\t${holder}`);
        // }

        // ////////////////
        if ((str.arr[i] === '+' || str.arr[i] === '-' || i === str.arr.length) &&
            (str.arr[i - 1] !== '/' && str.arr[i - 1] !== '*')) {
            let tmp;

            if (i == 0)
                continue;
            tmp = str.arr.slice(j, i).trim();
            let d = degree(tmp);
            // str.par.push(tmp);
            if (d == 0) {
                str.x0.push(tmp);
            } else if (d == 1) {
                str.x1.push(tmp);
            } else if (d == 2) {
                str.x2.push(tmp);
            }
            str.degree = d > str.degree ? d : str.degree;
            // console.log(tmp,'|', i, j, `D = ${d}`);
            j = i;
        }

    }
    if (parentheses > 0) {
        console.log(`Error missing parenthese: ')' .`);
        process.exit(1);
    } else if (parentheses < 0) {
        console.log(`Error missing parenthese: '(' .`);
        process.exit(1);
    }
    return str;
}


const degree = (str) => {
    for (let i = 0; i < str.length; i++) {
        if ((str[i] === `X` || str[i] === 'x') && str[i + 1] === '^') {
            return parseInt(str[i + 2]);
        }
        if ((str[i] === 'X' || str[i] === 'x') && str[i + 1] !== '^') {
            return 1;
        }
    }
    return 0;
}


const calculate = (x, y, sign) => {
    if (!x | !y) {
        console.log('E');
        process.exit(1);
    }
    if ((x === 0 || y === 0) && sign === '/') {
        console.log('Error devision by 0');
        process.exit(1);
    }
    switch (sign) {
        case '+':
            return x + y;
        case '/':
            return x / y;
        case '-':
            return x - y;
        case '*':
            return x * y;
    }
};


module.exports = { checkSyntax, setData, calculate };