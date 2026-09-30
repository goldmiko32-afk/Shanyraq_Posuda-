/* =========================================
   SHANYRAQ POSUDA
   10 PRODUCTS
========================================= */


const WHATSAPP = "77784326090";


const PRODUCTS = [

    {
        id: 1,
        name: "Бокалы Crystal",
        price: 14990,
        oldPrice: null,
        category: "dishes",
        tag: "BESTSELLER",
        image: "images/product-1.jpg",
        description:
            "Элегантный набор бокалов для красивой сервировки стола. Идеальный вариант для семейных ужинов и особенных вечеров."
    },

    {
        id: 2,
        name: "Столовая коллекция",
        price: 24990,
        oldPrice: 29990,
        category: "dishes",
        tag: "SALE",
        image: "images/product-2.jpg",
        description:
            "Стильная коллекция посуды для повседневной сервировки и праздничного стола."
    },

    {
        id: 3,
        name: "Ложки и вилки",
        price: 19990,
        oldPrice: null,
        category: "cutlery",
        tag: "NEW",
        image: "images/product-3.jpg",
        description:
            "Элегантный набор столовых приборов с минималистичным дизайном."
    },

    {
        id: 4,
        name: "Кофейный набор",
        price: 16990,
        oldPrice: null,
        category: "tea",
        tag: "NEW",
        image: "images/product-4.jpg",
        description:
            "Уютный кофейный набор для красивых завтраков и вечерних разговоров."
    },

    {
        id: 5,
        name: "Чайный сервиз",
        price: 22990,
        oldPrice: 25990,
        category: "tea",
        tag: "SALE",
        image: "images/product-5.jpg",
        description:
            "Красивый чайный сервиз для тёплых семейных встреч и особых случаев."
    },

    {
        id: 6,
        name: "Набор пиал",
        price: 11990,
        oldPrice: null,
        category: "dishes",
        tag: null,
        image: "images/product-6.jpg",
        description:
            "Минималистичные пиалы, которые отлично подойдут для завтраков, десертов и традиционных блюд."
    },

    {
        id: 7,
        name: "Сервировочные тарелки",
        price: 9990,
        oldPrice: null,
        category: "dishes",
        tag: null,
        image: "images/product-7.jpg",
        description:
            "Большие декоративные тарелки для красивой подачи блюд и праздничной сервировки."
    },

    {
        id: 8,
        name: "Glass Storage",
        price: 8990,
        oldPrice: null,
        category: "kitchen",
        tag: "NEW",
        image: "images/product-8.jpg",
        description:
            "Стильные стеклянные ёмкости для хранения продуктов. Красота и порядок на вашей кухне."
    },

    {
        id: 9,
        name: "Kitchen Collection",
        price: 12990,
        oldPrice: null,
        category: "kitchen",
        tag: null,
        image: "images/product-9.jpg",
        description:
            "Практичный набор кухонных принадлежностей для тех, кто любит готовить красиво."
    },

    {
        id: 10,
        name: "Shanyraq Gift Box",
        price: 29990,
        oldPrice: 34990,
        category: "gift",
        tag: "GIFT",
        image: "images/product-10.jpg",
        description:
            "Подарочный набор Shanyraq Posuda. Красивый подарок для близких, друзей и особенных людей."
    }

];


const PROMOS = {
    SHANYRAQ10: 10,
    WELCOME: 10,
    POSUDA15: 15
};


let cart =
    JSON.parse(
        localStorage.getItem(
            "shanyraqCart"
        )
    ) || [];


let favorites =
    JSON.parse(
        localStorage.getItem(
            "shanyraqFavorites"
        )
    ) || [];


let promoDiscount = 0;

let selectedProduct = null;


/* ELEMENTS */

const loader =
    document.getElementById("loader");

const productsContainer =
    document.getElementById("products");

const emptyProducts =
    document.getElementById("emptyProducts");

const search =
    document.getElementById("search");

const filters =
    document.querySelectorAll(".filter");

const mobileMenu =
    document.getElementById("mobileMenu");

const menu =
    document.getElementById("menu");

const cartButton =
    document.getElementById("cartButton");

const cartPanel =
    document.getElementById("cartPanel");

const cartClose =
    document.getElementById("cartClose");

const sideOverlay =
    document.getElementById("sideOverlay");

const cartProducts =
    document.getElementById("cartProducts");

const cartCount =
    document.getElementById("cartCount");

const favoritesButton =
    document.getElementById("favoritesButton");

const favoritesPanel =
    document.getElementById("favoritesPanel");

const favoritesClose =
    document.getElementById("favoritesClose");

const favoritesProducts =
    document.getElementById("favoritesProducts");

const favoritesCount =
    document.getElementById("favoritesCount");

const modal =
    document.getElementById("productModal");

const modalBg =
    document.getElementById("modalBg");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const addCart =
    document.getElementById("addCart");

const addFavorite =
    document.getElementById("addFavorite");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");

const promoInput =
    document.getElementById("promoInput");

const promoButton =
    document.getElementById("promoButton");

const promoMessage =
    document.getElementById("promoMessage");

const subtotalElement =
    document.getElementById("subtotal");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

const checkout =
    document.getElementById("checkout");

const thankYou =
    document.getElementById("thankYou");


/* LOADER */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                loader.classList.add(
                    "hidden"
                );

            },
            700
        );

    }
);


/* MOBILE MENU */

mobileMenu.addEventListener(
    "click",
    () => {

        menu.classList.toggle(
            "active"
        );

    }
);


document.querySelectorAll(
    ".menu a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            menu.classList.remove(
                "active"
            );

        }
    );

});


/* FORMAT PRICE */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "ru-RU"
    ).format(
        Math.round(price)
    ) + " ₸";

}


/* RENDER PRODUCTS */

function renderProducts() {

    const query =
        search.value
            .trim()
            .toLowerCase();


    const activeFilter =
        document
            .querySelector(
                ".filter.active"
            )
            .dataset.category;


    productsContainer.innerHTML = "";


    const filtered =
        PRODUCTS.filter(product => {

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(query);


            const matchCategory =
                activeFilter === "all" ||
                product.category === activeFilter;


            return (
                matchSearch &&
                matchCategory
            );

        });


    emptyProducts.style.display =
        filtered.length
            ? "none"
            : "block";


    filtered.forEach(
        (product, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "product-card";


            let tag = "";

            if (product.tag) {

                const tagClass =
                    product.tag === "SALE"
                        ? "sale"
                        : product.tag === "NEW"
                            ? "new"
                            : "";

                tag = `
                    <span
                        class="product-tag ${tagClass}"
                    >
                        ${product.tag}
                    </span>
                `;

            }


            const oldPrice =
                product.oldPrice
                    ? `
                        <span class="old-price">
                            ${formatPrice(
                                product.oldPrice
                            )}
                        </span>
                    `
                    : "";


            const favorite =
                isFavorite(product.id)
                    ? "♥"
                    : "♡";


            const favoriteClass =
                isFavorite(product.id)
                    ? "active"
                    : "";


            card.innerHTML = `

                <div class="product-photo">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    ${tag}

                    <button
                        class="
                            product-favorite
                            ${favoriteClass}
                        "
                        data-favorite="${product.id}"
                    >
                        ${favorite}
                    </button>

                    <span class="product-number">
                        ${String(
                            product.id
                        ).padStart(2,"0")}
                    </span>

                </div>


                <div class="product-details">

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${shortDescription(
                                product.description
                            )}
                        </p>

                    </div>


                    <div class="product-price">

                        ${oldPrice}

                        <span class="price">
                            ${formatPrice(
                                product.price
                            )}
                        </span>

                    </div>

                </div>
            `;


            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "[data-favorite]"
                        )
                    ) {

                        return;

                    }

                    openModal(product);

                }
            );


            const favoriteButton =
                card.querySelector(
                    "[data-favorite]"
                );


            favoriteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleFavorite(
                        product
                    );

                }
            );


            productsContainer.appendChild(
                card
            );

        }
    );

}


function shortDescription(text) {

    if (text.length <= 70) {

        return text;

    }

    return (
        text.substring(0,67) +
        "..."
    );

}


/* SEARCH */

search.addEventListener(
    "input",
    renderProducts
);


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            filter.classList.add(
                "active"
            );

            renderProducts();

        }
    );

});


/* MODAL */

function openModal(product) {

    selectedProduct =
        product;


    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;

    modalTitle.textContent =
        product.name;

    modalDescription.textContent =
        product.description;

    modalPrice.textContent =
        formatPrice(product.price);


    updateFavoriteButton();


    modal.classList.add(
        "active"
    );

    document.body.classList.add(
        "lock"
    );

}


function closeModal() {

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "lock"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);

modalBg.addEventListener(
    "click",
    closeModal
);


/* ADD CART */

addCart.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {

            return;

        }


        addProductToCart(
            selectedProduct
        );


        closeModal();

        setTimeout(
            openCart,
            150
        );

    }
);


function addProductToCart(product) {

    const existing =
        cart.find(
            item =>
                item.id ===
                product.id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} добавлен в корзину`
    );

}


/* CART */

cartButton.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


sideOverlay.addEventListener(
    "click",
    () => {

        closeCart();

        closeFavorites();

    }
);


function openCart() {

    closeFavorites();

    cartPanel.classList.add(
        "active"
    );

    sideOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "lock"
    );

}


function closeCart() {

    cartPanel.classList.remove(
        "active"
    );

    sideOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "lock"
    );

}


/* UPDATE CART */

function updateCart() {

    cartProducts.innerHTML = "";


    if (!cart.length) {

        cartProducts.innerHTML = `
            <div class="empty">
                Ваша корзина пока пуста.
            </div>
        `;

        cartCount.textContent =
            "0";

        subtotalElement.textContent =
            "0 ₸";

        discountElement.textContent =
            "0 ₸";

        totalElement.textContent =
            "0 ₸";

        return;

    }


    let quantity = 0;

    let subtotal = 0;


    cart.forEach(
        (item,index) => {

            quantity +=
                item.quantity;


            subtotal +=
                item.price *
                item.quantity;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        ${formatPrice(
                            item.price
                        )}
                    </p>


                    <div class="quantity">

                        <button
                            data-action="minus"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-action="plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    data-action="remove"
                    data-index="${index}"
                >
                    Удалить
                </button>

            `;


            cartProducts.appendChild(
                element
            );

        }
    );


    cartCount.textContent =
        quantity;


    const discount =
        subtotal *
        promoDiscount /
        100;


    const total =
        subtotal -
        discount;


    subtotalElement.textContent =
        formatPrice(subtotal);

    discountElement.textContent =
        discount > 0
            ? "- " +
              formatPrice(discount)
            : "0 ₸";

    totalElement.textContent =
        formatPrice(total);


    saveCart();

}


cartProducts.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        const index =
            Number(
                button.dataset.index
            );


        const action =
            button.dataset.action;


        if (action === "plus") {

            cart[index].quantity++;

        }


        if (action === "minus") {

            cart[index].quantity--;

            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(
                    index,
                    1
                );

            }

        }


        if (action === "remove") {

            const name =
                cart[index].name;

            cart.splice(
                index,
                1
            );

            showToast(
                `${name} удалён`
            );

        }


        updateCart();

    }
);


/* FAVORITES */

function isFavorite(id) {

    return favorites.some(
        item =>
            item.id === id
    );

}


function toggleFavorite(product) {

    const index =
        favorites.findIndex(
            item =>
                item.id ===
                product.id
        );


    if (index === -1) {

        favorites.push(
            product
        );

        showToast(
            "Добавлено в избранное ♥"
        );

    } else {

        favorites.splice(
            index,
            1
        );

        showToast(
            "Удалено из избранного"
        );

    }


    saveFavorites();

    renderProducts();

    updateFavorites();

    updateFavoriteButton();

}


function updateFavoriteButton() {

    if (!selectedProduct) {

        return;

    }


    if (
        isFavorite(
            selectedProduct.id
        )
    ) {

        addFavorite.textContent =
            "♥ Убрать из избранного";

    } else {

        addFavorite.textContent =
            "♡ Добавить в избранное";

    }

}


/* FAVORITES BUTTON */

addFavorite.addEventListener(
    "click",
    () => {

        if (!selectedProduct) {

            return;

        }

        toggleFavorite(
            selectedProduct
        );

    }
);


/* FAVORITES PANEL */

favoritesButton.addEventListener(
    "click",
    () => {

        closeCart();

        updateFavorites();

        favoritesPanel.classList.add(
            "active"
        );

        sideOverlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "lock"
        );

    }
);


favoritesClose.addEventListener(
    "click",
    closeFavorites
);


function closeFavorites() {

    favoritesPanel.classList.remove(
        "active"
    );

    sideOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "lock"
    );

}


function updateFavorites() {

    favoritesCount.textContent =
        favorites.length;


    favoritesProducts.innerHTML = "";


    if (!favorites.length) {

        favoritesProducts.innerHTML = `
            <div class="empty">
                В избранном пока ничего нет.
            </div>
        `;

        return;

    }


    favorites.forEach(
        product => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "favorite-item";


            item.innerHTML = `

                <div class="favorite-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${formatPrice(
                            product.price
                        )}
                    </p>

                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    closeFavorites();

                    openModal(
                        product
                    );

                }
            );


            favoritesProducts.appendChild(
                item
            );

        }
    );

}


/* PROMO */

promoButton.addEventListener(
    "click",
    applyPromo
);


promoInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            applyPromo();

        }

    }
);


function applyPromo() {

    const code =
        promoInput.value
            .trim()
            .toUpperCase();


    if (!code) {

        promoMessage.textContent =
            "Введите промокод.";

        return;

    }


    if (
        PROMOS[code]
    ) {

        promoDiscount =
            PROMOS[code];


        promoMessage.textContent =
            `Скидка ${promoDiscount}% применена`;


        showToast(
            `Промокод ${code} активирован`
        );


        updateCart();

    } else {

        promoDiscount = 0;

        promoMessage.textContent =
            "Промокод не найден.";

        updateCart();

    }

}


/* CHECKOUT */

checkout.addEventListener(
    "click",
    checkoutOrder
);


function checkoutOrder() {

    if (!cart.length) {

        showToast(
            "Сначала добавьте товар"
        );

        return;

    }


    let subtotal = 0;


    let message =
        "Здравствуйте! Хочу оформить заказ в Shanyraq Posuda.\n\n";


    message +=
        "🛍 МОЙ ЗАКАЗ:\n";


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal +=
            itemTotal;


        message +=
            `• ${item.name} — ${item.quantity} шт. — ${formatPrice(itemTotal)}\n`;

    });


    const discount =
        subtotal *
        promoDiscount /
        100;


    const total =
        subtotal -
        discount;


    if (
        promoDiscount > 0
    ) {

        message +=
            `\n🏷 Скидка: ${promoDiscount}%`;

    }


    message +=
        `\n\n💰 ИТОГО: ${formatPrice(total)}`;


    message +=
        "\n\nСпасибо! Жду подтверждения заказа.";


    closeCart();


    thankYou.classList.add(
        "active"
    );


    setTimeout(
        () => {

            const whatsappURL =
                "https://wa.me/" +
                WHATSAPP +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.location.href =
                whatsappURL;

        },
        1800
    );

}


/* TOAST */

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;


    toast.classList.add(
        "active"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            2500
        );

}


/* STORAGE */

function saveCart() {

    localStorage.setItem(
        "shanyraqCart",
        JSON.stringify(cart)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "shanyraqFavorites",
        JSON.stringify(favorites)
    );

}


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeModal();

        closeCart();

        closeFavorites();

        thankYou.classList.remove(
            "active"
        );

    }
);


/* INIT */

renderProducts();

updateCart();

updateFavorites();
