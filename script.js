const itemForm = document.getElementById('item-form');
const itemInput  = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

function addItem(e){
    e.preventDefault();
    const ip = itemInput.value
    if(ip === ''){
        alert('Box cannot be empty: Please add an item');
        return;
    }
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(ip));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}


itemForm.addEventListener('submit',addItem);