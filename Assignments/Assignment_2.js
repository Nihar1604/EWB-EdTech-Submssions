
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log("\n===== BILL AND TIP CALCULATOR =====");

    let bill;
    let tipPercentage;

    while (true) {
        const input = (await ask("Enter bill amount: ")).trim();
        bill = Number(input);

        if (input !== "" && Number.isFinite(bill) && bill >= 0) break;
        console.log("Enter a valid non-negative bill amount.");
    }

    while (true) {
        const input = (await ask("Enter tip percentage: ")).trim();
        tipPercentage = Number(input);

        if (
            input !== "" &&
            Number.isFinite(tipPercentage) &&
            tipPercentage >= 0
        ) break;

        console.log("Enter a valid non-negative tip percentage.");
    }

    const tip = bill * tipPercentage / 100;
    let total = bill;
    total += tip;

    console.log("\n===== BILL SUMMARY =====");
    console.log(`Subtotal: $${bill.toFixed(2)}`);
    console.log(`Tip Percentage: ${tipPercentage}%`);
    console.log(`Calculated Tip: $${tip.toFixed(2)}`);
    console.log(`Total Amount to Pay: $${total.toFixed(2)}`);

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
