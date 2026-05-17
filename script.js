function goPage(page){
window.location.href = page;
}

function showNotification(){
alert(`Notifications\n\n• 8 Products Low in Stock\n• Revenue Increased by 12%\n• 15 New Orders Received`);
}

function openReports(){
alert('Opening Advanced Reports Dashboard');
}

function cardClick(name){
alert(name + ' details loaded successfully');
}

function toggleDarkMode(){
if(document.body.style.background === 'white'){
document.body.style.background = '#0f172a';
document.body.style.color = 'white';
}
else{
document.body.style.background = 'white';
document.body.style.color = 'black';
}
}

function login(){
alert('Login Successful');
window.location.href='index.html';
}

function generateReport(){
alert('Report Generated Successfully');
}

function addProduct(){
const name = document.getElementById('productName').value;
const price = document.getElementById('productPrice').value;

if(name === '' || price === ''){
alert('Please fill all fields');
return;
}

const table = document.getElementById('productTable');

const row = table.insertRow();

row.innerHTML = `
<td>${name}</td>
<td>₹${price}</td>
<td>
<button onclick="editProduct(this)">Edit</button>
<button onclick="deleteProduct(this)">Delete</button>
</td>
`;

alert(name + ' added successfully');

saveProducts();
}

function deleteProduct(button){
button.parentElement.parentElement.remove();
alert('Product Deleted');
saveProducts();
}

function editProduct(button){
const row = button.parentElement.parentElement;

const name = row.cells[0].innerText;
const price = row.cells[1].innerText.replace('₹','');

const newName = prompt('Edit Product Name',name);
const newPrice = prompt('Edit Price',price);

if(newName && newPrice){
row.cells[0].innerText = newName;
row.cells[1].innerText = '₹'+newPrice;

alert('Product Updated');

saveProducts();
}
}

function saveProducts(){
const rows = document.querySelectorAll('#productTable tr');
let products = [];

rows.forEach(row=>{
products.push({
name: row.cells[0].innerText,
price: row.cells[1].innerText
});
});

localStorage.setItem('products',JSON.stringify(products));
}

function loadProducts(){
const products = JSON.parse(localStorage.getItem('products')) || [];

const table = document.getElementById('productTable');

if(table){
products.forEach(product=>{
const row = table.insertRow();

row.innerHTML = `
<td>${product.name}</td>
<td>${product.price}</td>
<td>
<button onclick="editProduct(this)">Edit</button>
<button onclick="deleteProduct(this)">Delete</button>
</td>
`;
});
}
}

window.onload = ()=>{
loadProducts();

setInterval(()=>{
const total = document.getElementById('totalProducts');

if(total){
total.innerText = parseInt(total.innerText)+1;
}
},5000);

setInterval(()=>{
const low = document.getElementById('lowStock');

if(low){
low.innerText = Math.floor(Math.random()*10)+1;
}
},7000);
}