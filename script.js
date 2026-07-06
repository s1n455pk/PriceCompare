/* ============================================
   PriceCompare - Premium Script
   Part 1
   Loader
   Typing Animation
   Counter Animation
   ============================================ */

// ================= LOADER =================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1200);

});


// ================= TYPING EFFECT =================

const words = [

    "Amazon",

    "Flipkart",

    "Croma",

    "Myntra",

    "Reliance"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, charIndex);

        charIndex++;

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    }

    else {

        typing.textContent = currentWord.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length)

                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();


// ================= COUNTER =================

const counters = document.querySelectorAll(".counter");

const speed = 200;

function runCounter() {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const update = () => {

            const value = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (value < target) {

                counter.innerText = value + increment;

                setTimeout(update, 10);

            }

            else {

                counter.innerText = target.toLocaleString() + "+";

            }

        };

        update();

    });

}

const stats = document.querySelector(".stats");

let counterStarted = false;

window.addEventListener("scroll", () => {

    if (!stats) return;

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight && !counterStarted) {

        counterStarted = true;

        runCounter();

    }

});


/* ============================================
   PriceCompare - Premium Script
   Part 2
   Products
   Search
   Render Table
   ============================================ */

// ================= SAMPLE PRODUCTS =================

const products = [

    {
        name: "iPhone 16",
        image: "images/products/iphone.png",
        store: "Amazon",
        storage:"128GB • Black",

        price: 79999,
        rating: 4.8,
        delivery: "Tomorrow",
        logo: "images/stores/amazon.png"
    },

    {
        name: "iPhone 16",
        image: "images/products/iphone.png",
        store: "Flipkart",
        storage:"128GB • Black",

        price: 78999,
        rating: 4.7,
        logo: "images/stores/flipkart.png",
        delivery: "2 Days"
    },

    {
        name: "Samsung S25",
        image: "images/products/samsung.png",
        store: "Amazon",
        storage: "256GB • Titanium",
        price: 68999,
        rating: 4.7,
        logo: "images/stores/amazon.png",
        delivery: "Tomorrow"
    },

    {
        name: "Samsung S25",
        image: "images/products/samsung.png",
        store: "Croma",
        storage: "256GB • Titanium",
        price: 69999,
        rating: 4.6,
        logo: "images/stores/croma.png",
        delivery: "2 Days"
    },

    {
        name: "MacBook Air M4",
        image: "images/products/macbook.png",
        store: "Amazon",
        storage: "16GB RAM • 512GB SSD",
        price: 99999,
        rating: 4.9,
        logo: "images/stores/amazon.png",
        delivery: "Tomorrow"
    },

    {
        name: "MacBook Air M4",
        image: "images/products/macbook.png",
        store: "Reliance Digital",
        storage: "16GB RAM • 512GB SSD",
        price: 100999,
        rating: 4.8, logo: "images/stores/reliance.png",
        delivery: "3 Days"
    }

];


// ================= BEST PRICE =================

function getBestPrices(list) {

    const best = {};

    list.forEach(item => {

        if (best[item.name] === undefined || item.price < best[item.name]) {

            best[item.name] = item.price;

        }

    });

    return best;

}


// ================= RENDER TABLE =================

function renderTable(list) {

    const tbody = document.getElementById("productTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const bestPrices = getBestPrices(list);

    if (list.length === 0) {

        tbody.innerHTML = `
        <tr>
        <td colspan="7">
        No Product Found
        </td>
        </tr>
        `;

        return;

    }

    list.forEach(product => {

        const bestDeal = product.price === bestPrices[product.name];

        tbody.innerHTML += `

        <tr class="${bestDeal ? 'best-row' : ''}">

            <td>

                <img src="${product.image}"

                class="product-img"

                alt="${product.name}">

            </td>

            <td>

                <strong>${product.name}</strong>

                    <br>

                    <small class="product-spec">

                        ${product.storage}

                    </small>

            </td>

            <td>
                 <div class="store-box">
                     <img src="${product.logo}" class="store-logo" alt="${product.store}">
                     <span>${product.store}</span>
                 </div>
            </td>

            <td>

                <span class="price">

                ₹${product.price.toLocaleString()}

                </span>

                ${bestDeal ?

                `<br><span class="best-deal-badge">

                Best Deal

                </span>`: ""}

            </td>

            <td>

                ⭐ ${product.rating}

            </td>

            <td>

                ${product.delivery}

            </td>

            <td>

                <button class="buy-btn">

                Buy Now

                </button>

            </td>

        </tr>

        `;

    });

}

renderTable(products);


// ================= SEARCH =================

function searchProduct() {

    const input = document

        .getElementById("searchInput")

        .value

        .toLowerCase()

        .trim();

    const filtered = products.filter(product => {

        return product.name

            .toLowerCase()

            .includes(input);

    });

    renderTable(filtered);

}

document

    .getElementById("searchBtn")

    .addEventListener("click", searchProduct);

document

    .getElementById("searchInput")

    .addEventListener("keyup", (e) => {

        if (e.key === "Enter") {

            searchProduct();

        }

    });


// ================= BUY BUTTON =================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("buy-btn")) {

        alert("Redirecting to Store...");

    }

});

/* ============================================
   PriceCompare - Premium Script
   Part 3
   Dark Mode
   FAQ
   Mobile Menu
   Scroll To Top
   Scroll Reveal
   Sticky Navbar
   Footer Year
============================================ */


/* ================= DARK MODE ================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        }

        else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    });

}


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");

const menu = document.getElementById("menu");

if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("active");

    });

}


/* ================= FAQ ================= */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        const opened = answer.style.display === "block";

        document.querySelectorAll(".faq-answer").forEach(item => {

            item.style.display = "none";

        });

        if (!opened) {

            answer.style.display = "block";

        }

    });

});


/* ================= SCROLL TO TOP ================= */

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.style.display = "block";

    }

    else {

        scrollBtn.style.display = "none";

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= STICKY NAVBAR ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.padding = "5px 0";

        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    }

    else {

        navbar.style.padding = "0";

        navbar.style.boxShadow = "none";

    }

});


/* ================= SCROLL REVEAL ================= */

const revealItems = document.querySelectorAll(

    ".stat-card,.category-card,.feature-card,.testimonial-card,.faq-item"

);

function reveal() {

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


/* ================= FOOTER YEAR ================= */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ================= SEARCH ON ENTER ================= */

const input = document.getElementById("searchInput");

if (input) {

    input.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            searchProduct();

        }

    });

}


/* ================= NAVBAR ACTIVE LINK ================= */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ================= BUY BUTTON EFFECT ================= */

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("buy-btn")) {

        e.target.innerHTML = "✔ Redirecting...";

        e.target.disabled = true;

        setTimeout(() => {

            e.target.innerHTML = "Buy Now";

            e.target.disabled = false;

        }, 1500);

    }

});


/* ================= END ================= */

console.log("✅ PriceCompare Loaded Successfully");