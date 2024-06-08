export default function RandomCode() {
    function getRandomInt(min : any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomVarname(){
        let varlen = Math.floor(Math.random() * 2) + 1
        let varname = ''
        for(let i = 0; i<varlen; i++){
            varname += String.fromCharCode(getRandomInt(97, 122))
        }
        return varname
    }
    const nestedLoop = Math.random() < 0.5;
    let variables = [randomVarname(), randomVarname(), randomVarname(), randomVarname()]
    let snippet = `#include <iostream>
using namespace std;
int main() {
    int ${variables[0]} = ${getRandomInt(100, 2000)}, ${variables[1]} = 0, ${variables[2]};
    while (${variables[0]} != 0) {
        ${variables[2]} = ${variables[0]} % 10;
        ${variables[1]} = ${variables[1]} + ${variables[2]};
        ${variables[0]} = ${variables[0]} / 10;
    }
    cout << "${variables[1]}: " << ${variables[1]} << endl;`;

    if (nestedLoop) {
        snippet += `
    for (int i = 0; i < ${getRandomInt(5, 10)}; ++i) {
        for (int j = 0; j < i; ++j) {
            cout << "* ";
        }
        cout << endl;
    }`;
    } else {
        let num = getRandomInt(100, 2000)
        snippet += `
    if (${variables[1]} > ${num}) {
        cout << "${variables[1]} is greater than ${num}" << endl;
    } else {
        cout << "${variables[1]} is smaller than ${num}" << endl;
    }`;
    }

    snippet += `
    return 0;
}`;

    return snippet;
}
