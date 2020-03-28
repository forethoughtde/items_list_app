(function(){

    const data = [
        { category : "Sporting Goods", price : "$49.99", stocked : true, name : "Football" },
        { category : "Sporting Goods", price : "$9.99", stocked : true, name : "Baseball" },
        { category : "Sporting Goods", price : "$29.99", stocked : false, name : "Basketball" },
        { category : "Electronics", price : "$99.99", stocked : true, name : "iPod Touch" },
        { category : "Electronics", price : "$399.99", stocked : false, name : "iPhone 5" },
        { category : "Electronics", price : "$199.99", stocked : true, name : "Nexus 7" }
    ];

    const $stockElement = document.getElementById('showStockedItem');
    const $searchInput = document.getElementById('searchProducts');
    let filterData = [];

    const listCategoriesFromData = (data)=>{

        let categoryList = [];
        for (let row of data) {
            if (!categoryList.includes(row['category'])) {
                categoryList.push(row['category']);
            }
        }

        return categoryList;
    };


    const getItemsInStock = (data)=>{

        let itemsInStock = [];
        for (let row of data) {
            if (row['stocked']) {
                itemsInStock.push(row);
            }
        }

        return itemsInStock;
    };

    const getItemsFromCategory = (data, category, inStock)=>{

        let itemsInStock = inStock ? getItemsInStock(data) : data;
        let items = [];
        for (let row of itemsInStock) {
            if (row['category'] === category) {
                items.push(row);
            }
        }

        return items;
    };


    const buildHTMLStructureOfItems = (data, inStock = false)=>{

        let htmlStructure = ``;
        for (let i of listCategoriesFromData(data)) {
            htmlStructure += `<tr><td colspan="2" class="text-primary"><strong>${i}</strong></td></tr>`;
            for (let j of getItemsFromCategory(data, i, inStock)) {
                if (!j['stocked']) {
                    htmlStructure += `<tr class="text-gray"><td>${j['name']}</td><td>${j['price']}</td></tr>`;
                    continue;
                }
                htmlStructure += `<tr><td>${j['name']}</td><td>${j['price']}</td></tr>`;
            }
        }

        return htmlStructure;
    };

    function appendToTableBody(tbodyData){
        document.getElementsByTagName('tbody')[0].innerHTML = tbodyData;
    }

    appendToTableBody(buildHTMLStructureOfItems(data));

    $stockElement.addEventListener('change', function(){
        let fData = filterData.length ? filterData : data;
        if (this.checked) {
            appendToTableBody(buildHTMLStructureOfItems(fData, true));
            return;
        }
        appendToTableBody(buildHTMLStructureOfItems(fData));
    });

    $searchInput.addEventListener('input', function(){

        filterData = [];
        for (let row of data) {
            if (row['name'].toLowerCase().indexOf(this.value.toLowerCase()) > -1) {
                filterData.push(row);
            }
        }
        appendToTableBody(buildHTMLStructureOfItems(filterData, $stockElement.checked));
    });

})();
