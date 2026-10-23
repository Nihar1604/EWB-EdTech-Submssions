
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log("\n===== PRODUCT INVENTORY SYSTEM =====");

    const products = [];

    while (true) {
        const name = (
            await ask("\nEnter product name (or 'done' to finish): ")
        ).trim();

        if (name.toLowerCase() === "done") {
            if (products.length === 0) {
                console.log("Please enter at least one product.");
                continue;
            }
            break;
        }

        if (name === "") {
            console.log("Product name cannot be empty.");
            continue;
        }

        const priceInput = (
            await ask("Enter product price: ")
        ).trim();

        const price = Number(priceInput);

        if (
            priceInput === "" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            console.log("Enter a valid non-negative price.");
            continue;
        }

        products.push({ name, price });
        console.log(`Added: ${name} - $${price.toFixed(2)}`);
    }

    console.log("\n-- All Products (forEach) --");

    products.forEach(product => {
        console.log(
            `Item: ${product.name} - Price: $${product.price.toFixed(2)}`
        );
    });

    let priceLimit;

    while (true) {
        const input = (
            await ask("\nShow products below what price? $")
        ).trim();

        priceLimit = Number(input);

        if (input !== "" && Number.isFinite(priceLimit) && priceLimit >= 0) {
            break;
        }

        console.log("Enter a valid non-negative price.");
    }

    const filteredProducts = products.filter(
        product => product.price < priceLimit
    );

    console.log(`\n-- Filtered Products (Price < $${priceLimit}) --`);

    if (filteredProducts.length > 0) {
        console.log(filteredProducts);
    } else {
        console.log("No products match this price limit.");
    }

    const productTags = products.map(
        product =>
            `${product.name.toUpperCase()} costs $${product.price.toFixed(2)}`
    );

    console.log("\n-- Mapped Product Tags (map) --");
    console.log(productTags);

    rl.close();
}

main().catch(error => {
    console.error(error);
    rl.close();
});
