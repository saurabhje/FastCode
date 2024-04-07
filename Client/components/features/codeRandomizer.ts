export default function RandomCode() {
    function getRandomInt(min : any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const num = getRandomInt(1000, 9999);
    const sumVarName = String.fromCharCode(getRandomInt(97, 122)) + String.fromCharCode(getRandomInt(97, 122));

    const nestedLoop = Math.random() < 0.5;
    let snippet = `#include <iostream>
using namespace std;
int main() {
    int ${sumVarName} = ${num}, sum = 0, temp;
    while (${sumVarName} != 0) {
        temp = ${sumVarName} % 10;
        sum = sum + temp;
        ${sumVarName} = ${sumVarName} / 10;
    }
    cout << "Sum: " << sum << endl;`;

    if (nestedLoop) {
        snippet += `
    // Nested loop
    for (int i = 0; i < 5; ++i) {
        for (int j = 0; j < i; ++j) {
            cout << "* ";
        }
        cout << endl;
    }`;
    } else {
        snippet += `
    // Conditional statement
    if (sum > 10) {
        cout << "Sum is greater than 10" << endl;
    } else {
        cout << "Sum is not greater than 10" << endl;
    }`;
    }

    snippet += `
    return 0;
}`;

    return snippet;
}
