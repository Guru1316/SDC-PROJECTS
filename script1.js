document.getElementById("addItem").addEventListener("click", () => {
    const items = document.getElementById("items");
    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
        <input type="text" class="itemDescription" placeholder="Item Description" required>
        <input type="number" class="quantity" placeholder="Quantity" min="1" required>
        <input type="number" class="price" placeholder="Price per Unit" min="0" required>
        <input type="number" class="tax" placeholder="Tax Rate (%)" min="0" required>
    `;
    items.appendChild(newItem);
});

document.getElementById("invoiceForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const customerAddress = document.getElementById("customerAddress").value;

    const items = Array.from(document.getElementsByClassName("item")).map(item => ({
        description: item.querySelector(".itemDescription").value,
        quantity: parseInt(item.querySelector(".quantity").value),
        price: parseFloat(item.querySelector(".price").value),
        tax: parseFloat(item.querySelector(".tax").value),
    }));

    let totalAmount = 0;

    const invoiceHTML = `
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Address:</strong> ${customerAddress}</p>
        <table border="1" width="100%" style="margin-top: 20px; text-align: left;">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => {
                    const itemTotal = item.quantity * item.price;
                    const taxAmount = (item.tax / 100) * itemTotal;
                    const total = itemTotal + taxAmount;
                    totalAmount += total;
                    return `
                        <tr>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>Rs.${item.price.toFixed(2)}</td>
                            <td>${item.tax}%</td>
                            <td>Rs.${total.toFixed(2)}</td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
        <h3>Total Amount Due: Rs.${totalAmount.toFixed(2)}</h3>
    `;

    document.getElementById("invoicePreview").innerHTML = invoiceHTML;
    document.getElementById("invoiceOutput").style.display = "block";
});

document.getElementById("editInvoice").addEventListener("click", () => {
    document.getElementById("invoiceOutput").style.display = "none";
});

document.getElementById("printInvoice").addEventListener("click", () => {
    window.print();
});

document.getElementById("downloadInvoice").addEventListener("click", () => {
    const element = document.createElement("a");
    const blob = new Blob([document.getElementById("invoicePreview").innerHTML], { type: "text/html" });
    element.href = URL.createObjectURL(blob);
    element.download = "invoice.html";
    element.click();
});