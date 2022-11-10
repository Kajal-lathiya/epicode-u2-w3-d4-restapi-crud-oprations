const params = new URLSearchParams(
    window.location.search
)
const productId = params.get('productId')

getProduct = async() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw");
    let options = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, options)
    const product = await response.json()
    return product;
}

renderProduct = ({ name, description, brand, imageUrl, price }) => {
    document.querySelector('#product-details').innerHTML = `<div class="card text-black">
        <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
        <img src=${imageUrl} class="card-img-top" alt="product Image" />
        <div class="card-body">
            <div class="text-center">
                <h5 class="card-title">${name}</h5>
                <p class="text-muted mb-4">${description}</p>
            </div>
            <div class="d-flex justify-content-between total font-weight-bold mt-4">
                <span>${brand}</span><span>$ ${price}</span>
            </div>
        </div>
    </div>`
}


onClickDelete = async() => {
    try {
        if (confirm("Do you really want to delete this product?")) {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw");
            let options = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/product/${productId}`,
                options
            )
            if (response.ok) {
                window.location.assign('../Home/index.html')
            } else {
                alert("Error while deleting!")
            }
        }

    } catch (error) {
        alert(`Some erorr occured: ${error}`)
    }

}

onClickEdit = () => {
    window.location.assign(`../BackOffice/index.html?productId=${productId}`)
}


window.onload = async() => {
    const product = await getProduct()
    renderProduct(product)
}