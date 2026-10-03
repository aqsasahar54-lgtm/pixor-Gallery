const galleryItems = [
    ...document.querySelectorAll(".gallery-item")
];

const lightbox = document.getElementById("lightbox");

const lightboxImg =
    document.getElementById("lightboxImg");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const closeBtn =
    document.getElementById("close");

const nextBtn =
    document.getElementById("next");

const prevBtn =
    document.getElementById("prev");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const imageCount =
    document.getElementById("imageCount");

const noResults =
    document.getElementById("noResults");

let currentIndex = 0;

let currentFilter = "all";

let visibleItems = [...galleryItems];



/* =========================
   OPEN LIGHTBOX
========================= */

galleryItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        if (
            event.target.classList.contains("like-btn")
        ) {
            return;
        }

        visibleItems = galleryItems.filter(
            item => item.style.display !== "none"
        );

        currentIndex =
            visibleItems.indexOf(item);

        showLightboxImage();

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});



/* =========================
   SHOW IMAGE
========================= */

function showLightboxImage() {

    if (visibleItems.length === 0) {
        return;
    }

    const item =
        visibleItems[currentIndex];

    const img =
        item.querySelector("img");

    const category =
        item.querySelector(".image-overlay span");

    const title =
        item.querySelector("h3");

    lightboxImg.src = img.src;

    lightboxImg.alt = img.alt;

    lightboxTitle.textContent =
        title.textContent;

    lightboxCategory.textContent =
        category.textContent;

    syncLightboxLikeState();

}



/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (
        currentIndex >= visibleItems.length
    ) {
        currentIndex = 0;
    }

    showLightboxImage();

});



/* =========================
   PREVIOUS
========================= */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex =
            visibleItems.length - 1;
    }

    showLightboxImage();

});



/* =========================
   CLOSE
========================= */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener(
    "click",
    closeLightbox
);



/* =========================
   CLICK OUTSIDE
========================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});



/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});



/* =========================
   FILTER
========================= */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        applyFilters();

    });

});



/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    applyFilters
);



function applyFilters() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    let count = 0;

    galleryItems.forEach((item) => {

        const category =
            item.dataset.category;

        const title =
            item.dataset.title.toLowerCase();

        const matchesCategory =
            currentFilter === "all" ||
            category === currentFilter;

        const matchesSearch =
            title.includes(search) ||
            category.includes(search);

        if (
            matchesCategory &&
            matchesSearch
        ) {

            item.style.display = "inline-block";

            count++;

        } else {

            item.style.display = "none";

        }

    });

    imageCount.textContent = count;

    if (count === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}



/* =========================
   LIKE BUTTON
========================= */

document.querySelectorAll(".like-btn")
    .forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (button.textContent === "♡") {

                    button.textContent = "♥";

                } else {

                    button.textContent = "♡";

                }

            }
        );

    });



/* =========================
   THEME BUTTON
========================= */

const themeBtn =
    document.getElementById("themeBtn");

const lightboxLikeBtn =
    document.querySelector(".lightbox-like");

function syncLightboxLikeState() {
    if (!visibleItems.length) {
        return;
    }

    const currentItem =
        visibleItems[currentIndex];

    const currentLikeButton =
        currentItem.querySelector(".like-btn");

    lightboxLikeBtn.textContent =
        currentLikeButton.textContent;
}

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            themeBtn.textContent = "☾";

        } else {

            themeBtn.textContent = "☀";

        }

    }
);

lightboxLikeBtn.addEventListener(
    "click",
    () => {

        const currentItem =
            visibleItems[currentIndex];

        const currentLikeButton =
            currentItem.querySelector(".like-btn");

        if (
            currentLikeButton.textContent === "♡"
        ) {
            currentLikeButton.textContent = "♥";
            lightboxLikeBtn.textContent = "♥";
        } else {
            currentLikeButton.textContent = "♡";
            lightboxLikeBtn.textContent = "♡";
        }

    }
);