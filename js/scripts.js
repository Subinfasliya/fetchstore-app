AOS.init();

const productsContainer = document.getElementById("productsContainer");
const loader = document.getElementById("loader")


// API Url
const BASE_URL = `https://fakestoreapi.com/products`;

// Default value of loading
let isLoading = false;

// Loading Spinner
const setLoading = (state) => {
  isLoading = state;
  if(isLoading){
    loader.style.display = "block"
    productsContainer.style.display = "none"
  }else{
    loader.style.display = "none"
    productsContainer.style.display = "block"
  }
  
};

// Error message Showing function
const showError = (message) => {
  const errorEl = document.getElementById("errorMessage");
  errorEl.textContent = message;
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = `${product.image}`;
    img.alt = `${product.title} Image`;

    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `${product.title}`;

    cardBody.appendChild(cardTitle);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = `${product.description}`;

    cardBody.appendChild(description);

    const price = document.createElement("p");
    price.classList.add("fw-bold", "text-success");
    price.textContent = `$ ${product.price}`;

    cardBody.appendChild(price);

    const viewProduct = document.createElement("button");
    viewProduct.classList.add("btn", "btn-success");
    viewProduct.textContent = "View Product";

    cardBody.appendChild(viewProduct);

    productsContainer.appendChild(card);
  });
};

async function fetchProducts() {
  
    setLoading(true)

    try {

    const res = await fetch(`${BASE_URL}`);

    // API error (like 404, 500)
    if (!res.ok) {
      throw new Error(`Server error. Please try again later. ${res.status}`);
    }

    const data = await res.json();

    // Empty data check
    if (!data || data.length === 0) {
      showError("No products available right now.");
    }

    displayProducts(data);
  } catch (error) {
    if (error.name === "TypeError") {
      showError("Network error. Please check your internet connection.");
    } else {
      showError(error.message || "Something went wrong.");
    }
  } finally {
    setLoading(false);
  }
}

fetchProducts();
