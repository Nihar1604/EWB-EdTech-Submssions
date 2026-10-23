
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log("\n===== PERSONAL INFORMATION SYSTEM =====");

    const name = (await ask("Enter your name: ")).trim();

    let age;
    while (true) {
        const input = (await ask("Enter your age: ")).trim();
        age = Number(input);

        if (input !== "" && Number.isInteger(age) && age >= 0) break;
        console.log("Please enter a valid non-negative age.");
    }

    let employed;
    while (true) {
        const input = (await ask("Are you employed? (yes/no): "))
            .trim().toLowerCase();

        if (input === "yes" || input === "no") {
            employed = input === "yes";
            break;
        }
        console.log("Please enter yes or no.");
    }

    const skillsInput = await ask(
        "Enter your skills separated by commas: "
    );

    const skills = skillsInput
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    console.log("\n===== YOUR INFORMATION =====");
    console.log(`Name: ${name} (Type: ${typeof name})`);
    console.log(`Age: ${age} (Type: ${typeof age})`);
    console.log(`Is Employed: ${employed} (Type: ${typeof employed})`);
    console.log(`Skills: ${JSON.stringify(skills)} (Type: ${typeof skills})`);

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
