export default function generateRandomCodeSnippet() {
    // List of C++ keywords and data types
    const keywords = ['int', 'double', 'float', 'char', 'void', 'if', 'else', 'for', 'while', 'return', 'class', 'struct'];
    const operators = ['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!', '++', '--'];
    const punctuation = [';', '{', '}', '(', ')', '[', ']'];
    const identifiers = ['variable', 'value', 'index', 'i', 'j', 'k', 'sum', 'result'];

    // Randomly select elements to construct the code snippet
    const snippetLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14 lines
    let codeSnippet = '';

    for (let i = 0; i < snippetLength; i++) {
        const randKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const randIdentifier = identifiers[Math.floor(Math.random() * identifiers.length)];
        const randOperator = operators[Math.floor(Math.random() * operators.length)];
        const randPunctuation = punctuation[Math.floor(Math.random() * punctuation.length)];

        let line = '';

        // Randomly choose whether to declare a variable or use an if statement
        const declareVariable = Math.random() < 0.5;

        if (declareVariable) {
            const randDataType = keywords.filter(keyword => !['if', 'else', 'for', 'while', 'return'].includes(keyword))[Math.floor(Math.random() * (keywords.length - 5))];
            line = `${randDataType} ${randIdentifier} = ${Math.floor(Math.random() * 100)};`;
        } else {
            const condition = Math.random() < 0.5 ? `${randIdentifier} ${randOperator} ${Math.floor(Math.random() * 100)}` : `true`;
            line = `if (${condition}) { ${randIdentifier}++; } else { ${randIdentifier}--; }`;
        }

        codeSnippet += line + '\n';
    }

    return codeSnippet;
}

// Example usage

