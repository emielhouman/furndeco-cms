{
    let selectedCategories = [];

    const handleSelectedCategories = ($selectedItem) => {
        const $selectedItemTitle = $selectedItem.querySelector(`span`).textContent;

        if (selectedCategories.includes($selectedItemTitle)) {
            $selectedItem.style.backgroundColor = `rgba(0,0,0,.5)`;
            const index = selectedCategories.indexOf($selectedItemTitle);
            selectedCategories.splice(index, 1)
        } else {
            $selectedItem.style.backgroundColor = `rgba(0,0,0,.25)`;
            selectedCategories.push($selectedItemTitle);
        }
        filterProducts();
    };

    const filterProducts = () => {
        const $products = document.querySelectorAll(`.product`);

        $products.forEach($product => {
            $product.style.display = `none`;

            if (selectedCategories.length === 0) {
                $product.style.display = `block`;
            } else {
                for (let i = 0; i < selectedCategories.length; i++) {
                    if ($product.hasAttribute(`data-` + selectedCategories[i])) {
                        $product.style.display = `block`;
                    };
                };
            };
        });
    };

    const scrollCategoriesItems = (direction) => {
        const $leftButton = document.querySelector(`.categories__button.left`);
        const $rightButton = document.querySelector(`.categories__button.right`);
        const $scrollingCategories = document.querySelector(`.categories__select`);
        const scrollValue = 1200;

        if (direction === `right`) {
            $scrollingCategories.scrollBy({ left: scrollValue, behavior: 'smooth' });
        } else if (direction === `left`) {
            $scrollingCategories.scrollBy({ left: -scrollValue, behavior: 'smooth' });
        };

        const startPosition = $scrollingCategories.scrollLeft === 0;
        const endPosition = $scrollingCategories.scrollLeft + $scrollingCategories.clientWidth >= $scrollingCategories.scrollWidth;
        
        $leftButton.style.display = startPosition ? `block` : `none`;
        $rightButton.style.display = endPosition ? `block` : `none`;
    };

    const handleSortingMethod = (e) => {
        const $itemsContainer = document.querySelector('.products');
        const $items = Array.from($itemsContainer.querySelectorAll(`.product`));

        if (e.target.textContent === `Most Popular`) {
            sortItemsRandom($itemsContainer, $items);
        } else if (e.target.textContent === `Alphabetical`) {
            sortItemsAlphabetical($itemsContainer, $items);
        } else if (e.target.textContent === `Price: low to high`) {
            sortItemsPrice($itemsContainer, $items, false);
        } else if (e.target.textContent === `Price: high to low`) {
            sortItemsPrice($itemsContainer, $items, true);
        };
    };

    const sortItemsRandom = (itemsContainer, items) => {
        items.sort(() => Math.random() - 0.5);

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsAlphabetical = (itemsContainer, items) => {
        items.sort((a, b) => {
            const $titleA = a.querySelector('.product__title').textContent.toLowerCase();
            const $titleB = b.querySelector('.product__title').textContent.toLowerCase();
            return $titleA.localeCompare($titleB);
        });

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsPrice = (itemsContainer, items, descending) => {
        items.sort((a, b) => {
            const $priceA = parseInt(a.querySelector(`.product__price`).textContent.replace(/[^\d.-]/g, '').replace('.', ''));
            const $priceB = parseInt(b.querySelector(`.product__price`).textContent.replace(/[^\d.-]/g, '').replace('.', ''));

            return descending ? $priceB - $priceA : $priceA - $priceB;
        });

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const init = () => {
        if (document.querySelector(`.categories__select`)) {
            const $categoriesItems = document.querySelectorAll(`.categories__item`);
            const $leftButton = document.querySelector(`.categories__button.left`);
            const $rightButton = document.querySelector(`.categories__button.right`);

            $categoriesItems.forEach($categoriesItem => {
                $categoriesItem.addEventListener(`click`, () => {
                    const $selectedItem = $categoriesItem.querySelector(`.item__content`);
                    handleSelectedCategories($selectedItem);
                });
            });

            $leftButton.addEventListener(`click`, () => {
                scrollCategoriesItems(`left`);
            });

            $rightButton.addEventListener(`click`, () => {
                scrollCategoriesItems(`right`);
            });
        };

        if (document.querySelector(`.products__sorting`)) {
            const $sortingDropdown = document.querySelector(`.sorting__select`);
            const $sortingDropdownIcon = document.querySelector(`.sorting__icon`);
            const $sortingOptions = document.querySelector(`.sorting__options`);

            $sortingDropdown.addEventListener(`click`, () => {
                $sortingOptions.style.display = $sortingOptions.style.display === `block` ? `none` : `block`;
                $sortingDropdownIcon.style.transform = $sortingDropdownIcon.style.transform === `scaleY(-1)` ? `scaleY(1)` : `scaleY(-1)`;
            });

            $sortingOptions.addEventListener(`click`, e => {
                if (e.target.classList.contains(`sorting__option`)) {
                    handleSortingMethod(e);
                    $sortingDropdown.querySelector(`span`).textContent = e.target.textContent;
                    $sortingOptions.style.display = `none`;
                    $sortingDropdownIcon.style.transform = `scaleY(1)`;
                }
            });
        };
    };

    init();
}