
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function getInteger(question, min, max) {
    while (true) {
        const input = (await ask(question)).trim();
        const value = Number(input);

        if (
            input !== "" &&
            Number.isSafeInteger(value) &&
            value >= min &&
            value <= max
        ) return value;

        console.log(`Enter a whole number between ${min} and ${max}.`);
    }
}

async function main() {
    console.log("\n===== LOOP CONTROL DEMONSTRATION =====");

    const tableNumber = await getInteger(
        "Enter a number for its multiplication table: ", 1, 1000000
    );

    const tableLimit = await getInteger(
        "How many multiples should be displayed? ", 1, 100
    );

    console.log(`\n-- Multiplication Table of ${tableNumber} --`);

    for (let i = 1; i <= tableLimit; i++) {
        console.log(`${tableNumber} x ${i} = ${tableNumber * i}`);
    }

    const startNumber = await getInteger(
        "\nEnter a starting number for divisibility search: ", 0, 1000000
    );

    console.log("\n-- First number greater than 10 divisible by 6 --");

    let number = Math.max(startNumber, 11);

    while (true) {
        if (number % 6 === 0) {
            console.log(`Found: ${number}`);
            break;
        }
        number++;
    }

    const endNumber = await getInteger(
        "\nEnter the ending number for the do-while loop (1-100): ", 1, 100
    );

    console.log("\n-- Odd numbers using do-while and continue --");

    let count = 0;

    do {
        count++;

        if (count % 2 === 0) {
            continue;
        }

        console.log(count);
    } while (count < endNumber);

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
