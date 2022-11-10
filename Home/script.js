getProducts = async() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw");
    const options = {
        method: "GET",
        headers: myHeaders,
        redirect: 'follow'
    }
    const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/", options
    );
    const products = await response.json();
    return products;
}

renderProducts = (listOfProducts) => {
    let productslist = document.querySelector(".list-group");
    listOfProducts.map(({ name, description, brand, imageUrl, price, _id, userId }, index) => {
        const divNode = document.createElement("div");
        divNode.classList.add("shadow");
        divNode.classList.add("p-3");
        divNode.classList.add("bg-white");
        divNode.classList.add("rounded");
        divNode.classList.add('mb-5');
        divNode.innerHTML = `<div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
            <h4 class="ms-3 mr-3">${index + 1}</h4>
              <div>
              <img
              src=${imageUrl}
              class="img-fluid rounded" alt="Shopping item" style="width: 65px; height:70px">
              </div>
              <div class="ms-3 mx-2">
                <h5> ${name}</h5>
                <p class="small mb-0 d-inline-block text-truncate" style="max-width: 100px;">${description}</p>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center">
              <div style="width: 100px;">
                <h5 class="fw-normal mb-0">${brand}</h5>
              </div>
              <div style="width: 50px;">
                <h5 class="mb-0">$${price}</h5>
              </div>
              <a href="../ProductDetails/index.html?productId=${_id}"><i class="fas fa-trash-alt">VIEW DETAILS</i></a>
            </div>
          </div>
        </div>`
        productslist.appendChild(divNode);
    });
}

window.onload = async() => {
    const products = await getProducts();
    renderProducts(products);
};