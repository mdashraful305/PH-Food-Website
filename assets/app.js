var products=document.getElementById('products');
var button=document.getElementById('load-more');
const cards = document.querySelectorAll('.testimonial-slider .card');

var load=false;
var data=[
    {
        "id":1,
        "name":"Gyro Sandwhic",
        "price":'$15',
        "image":"assets/img/food/f1.png",
        "rating":4.9,
    },
    {
        "id":2,
        "name":"Enchilade",
        "price":'$25',
        "image":"assets/img/food/f2.png",
        "rating":5,
    },
    {
        "id":3,
        "name":"Green Beans",
        "price":'$12',
        "image":"assets/img/food/f3.png",
        "rating":4.8,
    },
    {
        "id":4,
        "name":"Pizza",
        "price":'$18.50',
        "image":"assets/img/food/f4.png",
        "rating":5,
    },
    {
        "id":5,
        "name":"Chicken Pot Pie",
        "price":'$25',
        "image":"assets/img/food/f5.png",
        "rating":4.9,
    },     
    {
        "id":6,
        "name":"Green Salad",
        "price":'$25',
        "image":"assets/img/food/f6.png",
        "rating":4.9,
    },   
    {
        "id":7,
        "name":"Grill BBQ Chicken",
        "price":'$25',
        "image":"assets/img/food/f7.jpg",
        "rating":4.6,
    },
    {
        "id":8,
        "name":"Chicken Skewers",
        "price":'$18',
        "image":"assets/img/food/f8.png",
        "rating":4.9,
    },
    {
        "id":9,
        "name":"Gourmet Seafood",
        "price":'$17.5',
        "image":"assets/img/food/f9.png",
        "rating":5,
    },
    {
        "id":10,
        "name":"Brazilian Food ",
        "price":'$15',
        "image":"assets/img/food/f10.png",
        "rating":4.8,
    },
    {
        "id":11,
        "name":"Vegetable Soup",
        "price":'$15',
        "image":"assets/img/food/f11.png",
        "rating":4.9,
    },
    {
        "id":12,
        "name":"Meat Cutlets",
        "price":'$22',
        "image":"assets/img/food/f12.png",
        "rating":4.8,
    },
]; 
var new_data=data.slice(6,data.length);
function loadProducts(){   
    var html='';
    var cnt=0;
    data.forEach(function(product){
        if(cnt>5)
            return
       html+=`
          <div class="card ">
                <img src="${product.image}" alt="">
                <div class="card-body">
                    <div class="content">
                        <div>
                            <h3>${product.name}</h3>   
                        </div>
                        <div>
                            <i class="fa-solid fa-star"> </i>  ${product.rating}        
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <button class="order-btn" onclick="addToCart(${product.id})"> Add To Cart</button>
                        </div>
                        <div>
                            <h2>${product.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
       `;
       cnt++;
    });   
     products.innerHTML=html;
    
}
function loadLess(){
    var html='';
    var cnt=0;
    var products=document.getElementById('products');
    var item=products.querySelectorAll('.card.slide-down');
    item.forEach(function(product){
        product.classList.remove("slide-down");
        product.classList.add("slide-up");
        product.outerHTML='';
    });        
}
function loadMore(){   
    if(load){
        loadLess();
        load=false;
        button.textContent='Load More ';
        return;
    }   
   
    var html='';
    new_data.forEach(function(product){
       html+=`
          <div class="card slide-down">
                <img src="${product.image}" alt="">
                <div class="card-body">
                    <div class="content">
                        <div>
                            <h3>${product.name}</h3>   
                        </div>
                        <div>
                            <i class="fa-solid fa-star"> </i>  ${product.rating}        
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <button class="order-btn" onclick="addToCart( ${product.id})"> Add To Cart</button>
                        </div>
                        <div>
                            <h2>${product.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
       `;
    });
    load=true;
    button.textContent='See Less ';

    products.innerHTML+=html;

}

let currentIndex = 0;
const totalCards = cards.length;
function testimonial(){

    
    document.querySelector('.next').addEventListener('click', showNextCard);
    document.querySelector('.prev').addEventListener('click', showPrevCard);
    
    showCard(currentIndex,cards);
}

function showCard(index,cards) {
    cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

function showNextCard() {
    currentIndex = (currentIndex + 1) % totalCards;
    showCard(currentIndex,cards);
}

function showPrevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    showCard(currentIndex,cards);
}




function addToCart(id){
    var products=localStorage.getItem('products');
    if(products){
        products=JSON.parse(products);
        if(products.indexOf(id)==-1){
            products.push(id);
        }
        localStorage.setItem('products',JSON.stringify(products));
    }else{
        localStorage.setItem('products',JSON.stringify([id]));
    }
}

function loadCart(){
    var products=localStorage.getItem('products');
    if(products){
        products=JSON.parse(products);
        document.getElementById('total-price').innerHTM=0;
        var html='';
        var total=0;
        products.forEach(function(id){
            var product=data.find(function(p){
                return p.id==id;
            });
            html+=`
                <tr>
                    <td><img src="${product.image}"></td>
                    <td><b>${product.name}</b></td>
                    <td>${product.price}</td>
                    <td>1</td>
                    <td><button class="remove-btn" onclick="removeFromCart(${product.id})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
                `;
            total+=parseFloat(product.price.replace('$',''));
        });
        document.getElementById('total-price').innerHTML=total
        document.getElementById('cart-items').innerHTML=html;
    }
}
function removeFromCart(id){
    var products=localStorage.getItem('products');
    if(products){
        products=JSON.parse(products);
        var index=products.indexOf(id);
        products.splice(index,1);
        localStorage.setItem('products',JSON.stringify(products));
        loadCart();
    }
}
if(document.getElementById('email')){
    document.getElementById('newsletter').addEventListener('submit',function(e){
        e.preventDefault();
        var email=document.getElementById('email').value;
        console.log(email);
        if(email){
            document.getElementById('email').value='';
            document.getElementById('thank').innerHTML='Thank you for subscribing';
            document.getElementById('thank').style.display='block';
        }else{
            document.getElementById('thank').innerHTML='Enter a valid email';
            document.getElementById('thank').style.display='block';

        }
    });
}