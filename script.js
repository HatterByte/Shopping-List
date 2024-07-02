const itemForm = document.getElementById('item-form');
const itemInput  = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


function displayItems(){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item)=>addItemToDom(item));
    ResetUI();
}

function getItemFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function addItemSubmit(e){
    e.preventDefault();
    const ip = itemInput.value
    if(ip === ''){
        alert('Box cannot be empty: Please add an item');
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    else{
        if(checkDuplicate(ip)){
            alert('Item Already Added');
            return;
        }
    }

    addItemToDom(ip);
    addItemToStorage(ip);
    itemInput.value = '';
    ResetUI();
}

function addItemToDom(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItemToStorage(item){
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function checkDuplicate(item){
    const itemsFromStorage = getItemFromStorage();
    return itemsFromStorage.includes(item);
    
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>   Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item){
    item.remove();

    removeItemFromStorage(item.textContent);

    ResetUI();
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i)=>i!==item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function filterItem(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    });
}

function clearAll(e){
    if(confirm('Are you sure?')){
            while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild);
        }
    }
    localStorage.removeItem('items');
    ResetUI();
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function ResetUI(){
    itemInput.value = '';
    const allItems = itemList.querySelectorAll('li');
    if(allItems.length===0){
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else{
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

function init(){
    itemForm.addEventListener('submit',addItemSubmit);
    itemList.addEventListener('click',onClickItem);
    itemFilter.addEventListener('input',filterItem);
    itemClear.addEventListener('click',clearAll);
    document.addEventListener('DOMContentLoaded',displayItems);
    
    ResetUI();
}

init();