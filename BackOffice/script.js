const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

window.onload = async() => {
    if (productId) {
        console.log('productId:', productId);
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw");
        const options = {
            method: 'GET',
            headers: myHeaders,

        }
        const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${productId}`, options
        );
        const product = await response.json();
        let submitButton = document.querySelector("#submit-button");
        submitButton.innerText = "Edit Product";
        submitButton.classList.remove("btn-primary");
        submitButton.classList.add("btn-success");
        document.querySelector("#product-name").value = product.name;
        document.querySelector("#product-description").value = product.description;
        document.querySelector("#product-brand").value = product.brand
        document.querySelector("#product-price").value = product.price;
    }
};

async function onFormSubmit(event) {
    event.preventDefault();
    const newProduct = {
        name: document.querySelector("#product-name").value,
        description: document.querySelector("#product-description").value,
        price: document.querySelector("#product-price").value,
        brand: document.querySelector("#product-brand").value,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlf3QTD8Jb0maN6DL1ArXFNibJKAlEDiGPow&usqp=CAU",
    };
    console.log('newProduct:', newProduct);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw");
    myHeaders.append("Content-Type", "application/json");
    const options = {
        method: productId ? "PUT" : "POST",
        body: JSON.stringify(newProduct),
        headers: myHeaders
    };
    try {
        const endpoint = productId ?
            `https://striveschool-api.herokuapp.com/api/product/${productId}` :
            "https://striveschool-api.herokuapp.com/api/product/";

        const response = await fetch(endpoint, options);
        if (response.ok) {
            let result = confirm(
                productId ?
                "Product edited successfully!" :
                "Product created successfully!"
            );
            result && window.location.assign('../Home/index.html')
        } else {
            throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
        }
    } catch (error) {
        console.error(error);
    }
}