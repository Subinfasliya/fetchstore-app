AOS.init();

const productsContainer = document.getElementById("productsContainer");
const loader = document.getElementById("loader");

// API Url
const BASE_URL = `https://fakestoreapi.com/products`;

// Default value of loading
let isLoading = false;


// Login Function
const handleLogin = () =>{
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const storedData = localStorage.getItem(username)

  if(storedData.name === name && storedData.password){
    console.log("Successfully loggedIn")
  }else{
    console.log("Please Regester first");
    
  }
}


// Shorting product description
const shortedWord = (text, wordLimit = 10) => {
  const words = text.split(" ");

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};


// Loading Spinner
const setLoading = (state) => {
  isLoading = state;
  if (isLoading) {
    loader.style.display = "block";
    productsContainer.style.display = "none";
  } else {
    loader.style.display = "none";
    productsContainer.style.display = "flex";
  }
};

// Error message Showing function
const showError = (message) => {
  const errorEl = document.getElementById("errorMessage");
  errorEl.textContent = message;
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-md-6", "col-lg-3", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.height = "520px";
    card.style.overflow = "hidden";

    colDiv.appendChild(card);

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = `${product.image}`;
    img.alt = `${product.title} Image`;
    img.style.height = "250px";
    img.style.objectFit = "contain";

    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.style.fontSize = '17px'
    cardTitle.textContent = `${product.title}`;

    cardBody.appendChild(cardTitle);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.style.fontSize = '16px'
    description.textContent = shortedWord(product.description, 10);

    cardBody.appendChild(description);

    const price = document.createElement("p");
    price.classList.add("fw-bold", "text-success");
    price.textContent = `$ ${product.price}`;

    cardBody.appendChild(price);

    const viewProduct = document.createElement("button");
    viewProduct.classList.add("btn", "btn-success");
    viewProduct.textContent = "View Product";

    cardBody.appendChild(viewProduct);

    productsContainer.appendChild(colDiv);
  });
};

async function fetchProducts() {
  setLoading(true);

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


const loginBtn = document.getElementById('loginButton')

loginBtn.addEventListener('click',handleLogin)