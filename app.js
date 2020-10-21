const Data = (function() {

    const list = [];

    const Item = function(content) {
        this.content = content;
    };
    Item.prototype.finished = false;

    const addItem = function(content) {
        const item = new Item(content);
        list.push(item);
    }

    const removeItem = function(item_index) {
        list.splice(item_index, 1);
    }

    const checkItem = function(item_index) {
        const current_item = list[item_index];
        console.log("item_index:", item_index, "current_item:", current_item);
        current_item.finished = !current_item.finished;
        console.log(current_item);
        console.log(list);
    }

    return {
        list: list,
        Item: Item,
        addItem: addItem,
        removeItem: removeItem,
        checkItem: checkItem
    };

})();


const Controller = (function(){    

    const addItem = function(e) {
        e.preventDefault();

        const add_value = add_input.value;
        
        Data.addItem(add_value);
        
        UI.showList(Data.list);

        form.reset();
    }

    const searchItem = function(e) {
        e.preventDefault();

        const search_value = search_input.value;

        if (search_value) {
            var search_result = Data.list.filter((item) => {
                return item.content.includes(search_value)
            });

            UI.showList(search_result);        
        }
    }

    const removeItem = function(e) {
        if (e.target.tagName !== 'I') return;

        const item_id = e.target.parentNode.parentNode.id.split('-')[1];

        Data.removeItem(item_id);
        UI.showList(Data.list);
        
    }

    const checkItem = function(e) {
        if (e.target.tagName !== 'INPUT') return;

        const item_id = e.target.parentNode.parentNode.id.split('-')[1];
        Data.checkItem(item_id);

        UI.showList(Data.list);
    }

    const form = document.forms['list-form'];    
    const add_input = form['add-item__input'];
    const search_input = form['search-item__input'];

    const section = document.querySelector('section');
   
    form.addEventListener('submit', addItem);
    
    search_input.addEventListener('input', searchItem);
   
    section.addEventListener('click', removeItem);
    section.addEventListener('change', checkItem);
    
    
})();


const UI = (function() {

    const to_do_list = document.querySelector('.to-do-list');
    const finished_list = document.querySelector('.finished-list');

    var showList = function(list) {
        finished_list.innerHTML = '';
        to_do_list.innerHTML = '';

        list.forEach(function(item, i){

            if (item.finished) {
                const finished_list_HTML = `
                    <li class="to-do-list__item" id="item-${i}">
                        <div class="item__content">${item.content}</div>
                        <div class="item__action">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <input type="checkbox" checked>
                        </div>
                    </li>
                `;

                finished_list.insertAdjacentHTML('afterbegin', finished_list_HTML);
            } else {
                const to_do_item_HTML = `
                    <li class="to-do-list__item" id="item-${i}">
                        <div class="item__content">${item.content}</div>
                        <div class="item__action">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <input type="checkbox">
                        </div>
                    </li>
                `;

                to_do_list.insertAdjacentHTML('afterbegin', to_do_item_HTML);
            }
        });
        
    }

    return {
        showList: showList
    }
})();
