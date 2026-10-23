
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log("\n===== STUDENT GRADE CALCULATOR =====");

    let score;

    while (true) {
        const input = (await ask("Enter your test score (0-100): ")).trim();
        score = Number(input);

        if (
            input !== "" &&
            Number.isFinite(score) &&
            score >= 0 &&
            score <= 100
        ) break;

        console.log("Invalid score. Enter a number from 0 to 100.");
    }

    let grade;

    if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else if (score >= 70) {
        grade = "C";
    } else if (score >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }

    console.log("\n===== RESULT =====");
    console.log(`Score: ${score}`);

    switch (grade) {
        case "A":
            console.log("Grade: A");
            break;
        case "B":
            console.log("Grade: B");
            break;
        case "C":
            console.log("Grade: C");
            break;
        case "D":
            console.log("Grade: D");
            break;
        default:
            console.log("Grade: F");
    }

    const status = score >= 40 ? "Passed" : "Failed";
    console.log(`Status: ${status}`);

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
