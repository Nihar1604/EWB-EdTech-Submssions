
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function main() {
    console.log("======================================");
    console.log("  PRODUCT INVENTORY ANALYTICS SYSTEM");
    console.log("======================================");

    // Initial inventory
    const inventory = [];

    // Add multiple products
    console.log("\n--- Add Products ---");
    console.log("Enter product details below.");

    while (true) {
        const productName = (
            await prompt("\nEnter product name (or type 'done' to finish): ")
        ).trim();

        // Stop adding products
        if (productName.toLowerCase() === "done") {
            break;
        }

        // Skip empty product names
        if (productName === "") {
            console.log("Product name cannot be empty. Try again.");
            continue;
        }

        const priceInput = (
            await prompt("Enter product price: ")
        ).trim();

        const productPrice = Number(priceInput);

        // Validate price
        if (
            priceInput === "" ||
            !Number.isFinite(productPrice) ||
            productPrice <= 0
        ) {
            console.log("Invalid price. Enter a number greater than zero.");
            continue;
        }

        inventory.push({
            name: productName,
            price: productPrice
        });

        console.log(`Product "${productName}" added successfully!`);
    }

    // Categorize products using if-else
    function getCategory(price) {
        if (price < 100) {
            return "Budget";
        } else if (price < 500) {
            return "Standard";
        } else {
            return "Premium";
        }
    }

    // Select category badge using switch
    function getCategoryBadge(category) {
        switch (category) {
            case "Budget":
                return "[BUDGET]";
            case "Standard":
                return "[STANDARD]";
            case "Premium":
                return "[PREMIUM]";
            default:
                return "[UNKNOWN]";
        }
    }

    // Search for products
    console.log("\n--- Search Inventory ---");

    while (true) {
        const searchName = (
            await prompt("Enter product name to search (or type 'done' to finish): ")
        ).trim();

        if (searchName.toLowerCase() === "done") {
            break;
        }

        if (searchName === "") {
            console.log("Search skipped. Enter a product name or 'done'.");
            continue;
        }

        let found = false;

        for (let i = 0; i < inventory.length; i++) {
            if (!inventory[i] || !inventory[i].name) {
                continue;
            }

            if (
                inventory[i].name.toLowerCase() ===
                searchName.toLowerCase()
            ) {
                console.log(
                    `Found: ${inventory[i].name} - $${inventory[i].price.toFixed(2)}`
                );
                found = true;
                break;
            }
        }

        if (!found) {
            console.log(`Product "${searchName}" not found.`);
        }
    }

    // Regular function: calculate total inventory value
    function calculateTotal(products) {
        let total = 0;

        for (const product of products) {
            if (!product || !Number.isFinite(product.price)) {
                continue;
            }

            total += product.price;
        }

        return total;
    }

    // Arrow function: calculate final price after discount and tax
    const calculateFinalPrice = (
        price,
        taxRate = 0,
        discountRate = 0
    ) => {
        if (
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isFinite(taxRate) ||
            !Number.isFinite(discountRate) ||
            taxRate < 0 ||
            discountRate < 0 ||
            taxRate > 1 ||
            discountRate > 1
        ) {
            throw new Error("Invalid price, tax rate, or discount rate.");
        }

        const discountedPrice = price * (1 - discountRate);
        const finalPrice = discountedPrice * (1 + taxRate);

        return Number(finalPrice.toFixed(2));
    };

    // Display all products using forEach
    console.log("\n--- Product Inventory ---");

    inventory.forEach((product, index) => {
        const category = getCategory(product.price);
        const badge = getCategoryBadge(category);

        console.log(
            `${index + 1}. ${product.name} | $${product.price.toFixed(2)} | ${badge}`
        );
    });

    // Calculate total inventory value
    const totalValue = calculateTotal(inventory);

    console.log("\n--- Inventory Analytics ---");
    console.log(`Total Products: ${inventory.length}`);
    console.log(`Total Inventory Value: $${totalValue.toFixed(2)}`);

    // Filter products under $200
    const affordableItems = inventory.filter(
        (product) => product.price < 200
    );

    console.log("\nAffordable Items (Under $200):");

    if (affordableItems.length > 0) {
        affordableItems.forEach((product) => {
            console.log(`${product.name} - $${product.price.toFixed(2)}`);
        });
    } else {
        console.log("No affordable products found.");
    }

    // Generate formatted report using map
    const formattedReport = inventory.map(
        (product) =>
            `${product.name.toUpperCase()}: $${product.price.toFixed(2)}`
    );

    console.log("\n--- Formatted Inventory Report ---");
    formattedReport.forEach((item) => console.log(item));

    // Demonstrate tax and discount calculation
    const examplePrice = 0;
    const taxRate = 0.18;
    const discountRate = 0.10;

    const finalPrice = calculateFinalPrice(
        examplePrice,
        taxRate,
        discountRate
    );

    console.log("\n--- Tax and Discount Example ---");
    console.log(`Original Price: $${examplePrice.toFixed(2)}`);
    console.log(`Discount: ${discountRate * 100}%`);
    console.log(`Tax: ${taxRate * 100}%`);
    console.log(`Final Price: $${finalPrice.toFixed(2)}`);

    console.log("\n======================================");
    console.log("  INVENTORY ANALYSIS COMPLETED");
    console.log("======================================");

    rl.close();
}

main().catch((error) => {
    console.error("An error occurred:", error.message);
    rl.close();
});
