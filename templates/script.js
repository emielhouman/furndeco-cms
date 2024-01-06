{
    const handleSortingMethod = (e) => {
        const $itemsContainer = document.querySelector('.spotlight__items');
        const $items = Array.from($itemsContainer.querySelectorAll(`.spotlight__item`));

        if (e.target.textContent === `Most Popular`) {
            sortItemsRandom($itemsContainer, $items);
        } else if (e.target.textContent === `Alphabetical`) {
            sortItemsAlphabetical($itemsContainer, $items);
        } else if (e.target.textContent === `Price: low to high`) {
            sortItemsPrice($itemsContainer, $items, false);
        } else if (e.target.textContent === `Price: high to low`) {
            sortItemsPrice($itemsContainer, $items, true);
        };
    }

    const sortItemsRandom = (itemsContainer, items) => {
        items.sort(() => Math.random() - 0.5);

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsAlphabetical = (itemsContainer, items) => {
        items.sort((a, b) => {
            const $titleA = a.querySelector('.item__title').textContent.toLowerCase();
            const $titleB = b.querySelector('.item__title').textContent.toLowerCase();
            return $titleA.localeCompare($titleB);
        });

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const sortItemsPrice = (itemsContainer, items, descending) => {
        items.sort((a, b) => {
            const $priceA = parseFloat(a.querySelector('.item__price').textContent.replace(/[^\d.-]/g, ''));
            const $priceB = parseFloat(b.querySelector('.item__price').textContent.replace(/[^\d.-]/g, ''));
            if (descending) {
                return $priceA - $priceB;
            } else {
                return $priceB - $priceA;
            };
        });

        items.forEach(item => itemsContainer.appendChild(item));
    };

    const init = () => {
        if (document.querySelector(`.products__sorting`)) {
            const $sortingDropdown = document.querySelector(`.sorting__select`);
            const $sortingDropdownIcon = document.querySelector(`.sorting__icon`);
            const $sortingOptions = document.querySelector(`.sorting__options`);

            $sortingDropdown.addEventListener(`click`, e => {
                $sortingOptions.style.display = $sortingOptions.style.display === `block` ? `none` : `block`;
                $sortingDropdownIcon.style.transform = $sortingDropdownIcon.style.transform === `scaleY(-1)` ? `scaleY(1)` : `scaleY(-1)`;
            });

            $sortingOptions.addEventListener(`click`, e => {
                if (e.target.classList.contains(`sorting__option`)) {
                    handleSortingMethod(e);

                    $sortingOptions.style.display = `none`;
                    $sortingDropdown.querySelector(`span`).textContent = e.target.textContent;
                    $sortingDropdownIcon.style.transform = `scaleY(1)`;
                }
            });
        };
    };

    init();
}