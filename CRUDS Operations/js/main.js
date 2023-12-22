//get Total
//creat product 
// save localstorage
//clear inputs
// read
//count 
//deleat
//update 
//search
//clean data



// --get variabels
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxs = document.getElementById('taxs');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categroy = document.getElementById('categroy');
let submit = document.getElementById('submit');
let mood ='create';
// console.log(title,price,taxs,ads,discount,total,count,categroy,submit) for testing the variables

// 1--get total
function getTotal(){
    if(price.value != ''){
    let result = (+price.value + +taxs.value + +ads.value) - +discount.value;
    console.log(+result);
    total.innerHTML = result;
    total.style.background = '#040';
    }else{
        total.innerHTML = '';  
        total.style.background = '#a00d02';
    }
}
// 2--creat product 
let dataProduct = [];//array
submit.onclick = function(){ // [object1,object2,object3,.....]
    let newProdcut = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxs:taxs.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        categroy:categroy.value.toLowerCase(),
    }
    //count
    if(title.value !=''&& price.value != ''&&categroy.value != ''&&newProdcut.count < 100){
        if(mood === 'create'){
            if(newProdcut.count > 1){
                for(let i = 0; i< newProdcut.count;i++){
                    dataProduct.push(newProdcut); // put object(newProdcut) in array(dataproduct)   
                }
            }else{
                dataProduct.push(newProdcut);
            }
        }else{
            dataProduct[ tmp ] = newProdcut;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'none';
        }
        clearData();
    }
}
    
// 3--save localstorage 
localStorage.setItem('product' , JSON.stringify(dataProduct));// match array(dataproduct) in localStorage .
// console.log(dataProduct);
clearData();
showData();

// ........ make localstorage save array every reload prowser
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}
// 4--clear inputs ........ هنعمل استدعاء ليها عند الضغطع زرار الانشاء ف ال الخطوة 3
function clearData(){
    title.value = '';
    price.value = '';
    taxs.value = '';
    ads.value = '';
    discount.value = '';
    total.value = '';
    total.innerHTML = '';
    count.value = '';
    categroy.value = '';   
}
// 5--read == showData .......... هنعمل استدعاء ليها عند الضغط ع زرار الانشاء ف ال الخطوة 3
function showData(){    // any array have data sure need loop to show or read this data
    getTotal()
    let tabel = '';
    for(let i = 0; i < dataProduct.length;i++){
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxs}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].categroy}</td>
            <td> <button onclick="updateData(${i})" id="update"> update </button></td>
            <td> <button onclick="deleteData(${i})" id="delete"> delete </button></td>
        </tr>
       `
    }
    document.getElementById('tbody').innerHTML = tabel;
    //make deleteBtn button by js
    let deleteBtn = document.getElementById('deleteAll');
    if(dataProduct.length > 0){// incse of array has elements create a deleteBtn 
        deleteBtn.innerHTML = `
        <button onclick = "deleteAll()"> delete All () </button>
        `
    }else{
        deleteBtn.innerHTML = '';
    }
}
showData()
// 6-- delete data
let i;
function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
// 7--deleteAll 
function deleteAll() {
    localStorage.clear()
    dataProduct.splice(0)
    showData() 
}
// 8--update Data
function updateData(i){
    title.value = dataProduct[i].title;
    title.price = dataProduct[i].price;
    taxs.value = dataProduct[i].taxs;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    categroy.value = dataProduct[i].categroy;
    submit.innerHTML= 'update';
    mood ='update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// 9--search data
let searchMood = 'Title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'search-title'){
        searchMood = 'Title'
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'Category'
    }
    search.placeholder = 'Search By ' + searchMood;
search.focus();
search.value = '';
showData();
}
function searchData(value){
    let tabel = '';
    for(let i = 0; i < dataProduct.length;i++){
        if(searchMood == 'title'){
                if(dataProduct[i].title.includes(value.toLowerCase())){
                    tabel += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxs}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].categroy}</td>
                        <td> <button onclick="updateData(${i})" id="update"> update </button></td>
                        <td> <button onclick="deleteData(${i})" id="delete"> delete </button></td>
                    </tr>
                    `;
                }
        }else{
                if(dataProduct[i].categroy.includes(value.toLowerCase())){
                    tabel += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxs}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].categroy}</td>
                        <td> <button onclick="updateData(${i})" id="update"> update </button></td>
                        <td> <button onclick="deleteData(${i})" id="delete"> delete </button></td>
                    </tr>
                    `;
                }
        }
    }
    document.getElementById('tbody').innerHTML = tabel;
}