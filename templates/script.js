{
    const selectedCategories = [];

    const toggleCategoriesSelection = ($selectedItem) => {
        const $selectedItemTitle = $selectedItem.querySelector(`span`).textContent.toLowerCase();
        const isSelected = selectedCategories.includes($selectedItemTitle);

        $selectedItem.style.backgroundColor = isSelected ? `rgba(0,0,0,.5)` : `rgba(0,0,0,.25)`;

        if (isSelected) {
            const index = selectedCategories.indexOf($selectedItemTitle);
            selectedCategories.splice(index, 1);
        } else {
            selectedCategories.push($selectedItemTitle);
        }

        filterProducts();
    };

    const filterProducts = () => {
        const $products = document.querySelectorAll(`.product`);
        const $searchInput = document.querySelector(`.search__input`);

        $products.forEach($product => {
            const title = $product.getAttribute('data-title').toLowerCase();
            const category = $product.getAttribute('data-category').toLowerCase();

            const matchesSearch = $searchInput ? title.includes($searchInput.value.toLowerCase()) : true;
            const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(category);

            $product.style.display = (matchesSearch && matchesCategories) ? `block` : `none`;
        });
    };

    const scrollCategoriesItems = (direction) => {
        const $scrollingCategories = document.querySelector(`.categories__select`);
        const scrollValue = $scrollingCategories.offsetWidth;

        $scrollingCategories.scrollBy({ left: (direction === `right` ? scrollValue : -scrollValue), behavior: 'smooth' });

        const startPosition = $scrollingCategories.scrollLeft === 0;
        const endPosition = $scrollingCategories.scrollLeft + $scrollingCategories.clientWidth >= $scrollingCategories.scrollWidth;

        document.querySelector(`.categories__button.left`).style.display = startPosition ? `block` : `none`;
        document.querySelector(`.categories__button.right`).style.display = endPosition ? `block` : `none`;
    };

    const handleSortingMethod = (e) => {
        const $itemsContainer = document.querySelector('.products');
        const $items = Array.from($itemsContainer.querySelectorAll(`.product`));

        const sortingMethods = {
            'Most Popular': sortItemsRandom,
            'Alphabetical': sortItemsAlphabetical,
            'Price: low to high': () => sortItemsPrice(false),
            'Price: high to low': () => sortItemsPrice(true),
        };

        sortingMethods[e.target.textContent]($itemsContainer, $items);
    };

    const sortItemsRandom = (itemsContainer, items) => {
        items.sort(() => Math.random() - 0.5);
        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsAlphabetical = (itemsContainer, items) => {
        items.sort((a, b) => {
            const titleA = a.querySelector('.product__title').textContent.toLowerCase();
            const titleB = b.querySelector('.product__title').textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });
        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsPrice = (descending) => (itemsContainer, items) => {
        items.sort((a, b) => {
            const priceA = parseInt(a.querySelector(`.product__price`).textContent.replace(/[^\d.-]/g, '').replace('.', ''));
            const priceB = parseInt(b.querySelector(`.product__price`).textContent.replace(/[^\d.-]/g, '').replace('.', ''));
            return descending ? priceB - priceA : priceA - priceB;
        });
        items.forEach(item => itemsContainer.appendChild(item));
    };

    const handleSearchInput = () => {
        const $searchInput = document.querySelector(`.search__input`);
        const $searchInputButton = document.querySelector(`.search__button`);

        const handleSearch = () => filterProducts();

        $searchInput.addEventListener(`input`, handleSearch);
        $searchInputButton.addEventListener(`click`, handleSearch);
    };

    const handleCategoriesInput = () => {
        const $categoriesItems = document.querySelectorAll(`.categories__item`);

        $categoriesItems.forEach($categoriesItem => {
            $categoriesItem.addEventListener(`click`, () => {
                const $selectedItem = $categoriesItem.querySelector(`.item__content`);
                toggleCategoriesSelection($selectedItem);
            });
        });

        document.querySelector(`.categories__button.left`).addEventListener(`click`, () => {
            scrollCategoriesItems(`left`);
        });

        document.querySelector(`.categories__button.right`).addEventListener(`click`, () => {
            scrollCategoriesItems(`right`);
        });
    };

    const handleSortingInput = () => {
        const $sortingDropdown = document.querySelector(`.sorting__select`);
        const $sortingOptions = document.querySelector(`.sorting__options`);

        $sortingDropdown.addEventListener(`click`, () => {
            $sortingOptions.style.display = $sortingOptions.style.display === `block` ? `none` : `block`;
            document.querySelector(`.sorting__icon`).style.transform = $sortingOptions.style.display === `block` ? `scaleY(-1)` : `scaleY(1)`;
        });

        $sortingOptions.addEventListener(`click`, e => {
            if (e.target.classList.contains(`sorting__option`)) {
                handleSortingMethod(e);
                $sortingDropdown.querySelector(`span`).textContent = e.target.textContent;
                $sortingOptions.style.display = `none`;
                document.querySelector(`.sorting__icon`).style.transform = `scaleY(1)`;
            }
        });
    };

    const init = () => {
        if (document.querySelector(`.products__search`)) {
            handleSearchInput();
        }
        if (document.querySelector(`.categories__select`)) {
            handleCategoriesInput();
        }
        if (document.querySelector(`.products__sorting`)) {
            handleSortingInput();
        }
    };

    init();
}