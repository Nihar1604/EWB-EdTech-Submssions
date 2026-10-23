
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function getPositiveNumber(question) {
    while (true) {
        const input = (await ask(question)).trim();
        const value = Number(input);

        if (input !== "" && Number.isFinite(value) && value > 0) {
            return value;
        }

        console.log("Please enter a number greater than zero.");
    }
}

// Standard function with default parameters
function rectangleArea(length = 5, width = 4) {
    return length * width;
}

// Arrow function with default parameters
const arrowRectangleArea = (length = 5, width = 4) => {
    return length * width;
};

async function main() {
    console.log("\n===== RECTANGLE AREA CALCULATOR =====");

    console.log("\nStandard function:");
    const length1 = await getPositiveNumber("Enter length: ");
    const width1 = await getPositiveNumber("Enter width: ");

    console.log(`Standard Function Area: ${rectangleArea(length1, width1)}`);

    console.log("\nArrow function:");
    const length2 = await getPositiveNumber("Enter another length: ");
    const width2 = await getPositiveNumber("Enter another width: ");

    console.log(`Arrow Function Area: ${arrowRectangleArea(length2, width2)}`);

    console.log("\n===== SCOPE DEMONSTRATION =====");

    {
        let blockVar = "Accessible inside the block";
        console.log(blockVar);
    }

    try {
        console.log(blockVar);
    } catch (error) {
        console.log(`Scope Test Error: ${error.name}: blockVar is not defined`);
    }

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
