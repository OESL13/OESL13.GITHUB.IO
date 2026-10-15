const PRODUCTS = [
{id:1,name:'Televisor Sony Bravia 55” 4K',category:'Electronica',brand:'Sony',price:18999,emoji:'📺'},
{id:2,name:'Audífonos Sony inalámbricos',category:'Electronica',brand:'Sony',price:7499,emoji:'🎧'},
{id:3,name:'Smartphone Samsung Galaxy',category:'Electronica',brand:'Samsung',price:21999,emoji:'📱'},
{id:4,name:'Tablet Samsung Galaxy',category:'Electronica',brand:'Samsung',price:15999,emoji:'📱'},
{id:5,name:'Bocina Bluetooth Sony',category:'Electronica',brand:'Sony',price:1799,emoji:'🔊'},
{id:6,name:'Laptop ASUS ROG Strix',category:'Computo',brand:'ASUS',price:28999,emoji:'💻'},
{id:7,name:'Laptop ASUS Vivobook',category:'Computo',brand:'ASUS',price:15999,emoji:'💻'},
{id:8,name:'Laptop HP Pavilion',category:'Computo',brand:'HP',price:17999,emoji:'🖥️'},
{id:9,name:'Monitor HP Full HD',category:'Computo',brand:'HP',price:4299,emoji:'🖥️'},
{id:10,name:'Teclado ASUS Gaming',category:'Computo',brand:'ASUS',price:1899,emoji:'⌨️'},
{id:11,name:'Tenis Nike Air Max',category:'Ropa',brand:'Nike',price:2899,emoji:'👟'},
{id:12,name:'Playera Nike Sportswear',category:'Ropa',brand:'Nike',price:899,emoji:'👕'},
{id:13,name:'Sudadera Nike Club',category:'Ropa',brand:'Nike',price:1699,emoji:'🧥'},
{id:14,name:'Pantalón deportivo Nike',category:'Ropa',brand:'Nike',price:1299,emoji:'👖'},
{id:15,name:'Gorra Nike Heritage',category:'Ropa',brand:'Nike',price:699,emoji:'🧢'},
{id:16,name:'Mochila para laptop ASUS',category:'Accesorios',brand:'ASUS',price:1299,emoji:'🎒'},
{id:17,name:'Mouse inalámbrico HP',category:'Accesorios',brand:'HP',price:599,emoji:'🖱️'},
{id:18,name:'Cargador USB Samsung',category:'Accesorios',brand:'Samsung',price:499,emoji:'🔌'},
{id:19,name:'Audífonos deportivos Samsung',category:'Accesorios',brand:'Samsung',price:899,emoji:'🎧'},
{id:20,name:'Mousepad ASUS Gaming',category:'Accesorios',brand:'ASUS',price:449,emoji:'🖱️'},
{id:21,name:'Refrigerador Samsung',category:'Hogar',brand:'Samsung',price:25999,emoji:'🧊'},
{id:22,name:'Microondas Samsung',category:'Hogar',brand:'Samsung',price:3499,emoji:'🍲'},
{id:23,name:'Televisor Sony 43”',category:'Hogar',brand:'Sony',price:12999,emoji:'📺'},
{id:24,name:'Bocina Sony para hogar',category:'Hogar',brand:'Sony',price:2499,emoji:'🔈'},
{id:25,name:'Aspiradora Samsung Jet',category:'Hogar',brand:'Samsung',price:8999,emoji:'🧹'}
];
const money = n => n.toLocaleString('es-MX',{style:'currency',currency:'MXN'});
function getCart(){try{return JSON.parse(localStorage.getItem('tiendaSaraCart')||'[]')}catch(e){return []}}
function saveCart(cart){localStorage.setItem('tiendaSaraCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const el=document.getElementById('cart-count');if(el)el.textContent=getCart().reduce((s,p)=>s+p.qty,0)}
function addToCart(id){const cart=getCart();const found=cart.find(p=>p.id===id);if(found)found.qty++;else cart.push({id,qty:1});saveCart(cart);const old=document.getElementById('toast-cart');if(old)old.remove();const toast=document.createElement('div');toast.id='toast-cart';toast.className='alert alert-success position-fixed bottom-0 end-0 m-3 shadow';toast.textContent='Producto agregado al carrito';toast.style.zIndex=1080;document.body.appendChild(toast);setTimeout(()=>toast.remove(),1800)}
function cardHTML(p){return `<div class="col-12 col-sm-6 col-lg-4 col-xl-3"><article class="product-card"><div class="product-art" role="img" aria-label="${p.name}">${p.emoji}</div><div class="product-body"><div class="product-category">${p.category}</div><h3 class="h6 fw-bold mt-2">${p.name}</h3><p class="small text-secondary mb-2">Marca: ${p.brand}</p><div class="d-flex justify-content-between align-items-center gap-2"><span class="product-price">${money(p.price)}</span><button class="btn btn-sm btn-accent" onclick="addToCart(${p.id})">Agregar</button></div></div></article></div>`}
function renderFeatured(){const el=document.getElementById('featured-products');if(el)el.innerHTML=[PRODUCTS[0],PRODUCTS[5],PRODUCTS[10],PRODUCTS[20]].map(cardHTML).join('')}
function renderProducts(){const search=(document.getElementById('search')?.value||'').toLowerCase().trim();const cat=document.getElementById('category')?.value||'';const sort=document.getElementById('sort')?.value||'default';let list=PRODUCTS.filter(p=>(!cat||p.category===cat)&&(!search||(p.name+' '+p.brand+' '+p.category).toLowerCase().includes(search)));if(sort==='asc')list.sort((a,b)=>a.price-b.price);if(sort==='desc')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'es'));const grid=document.getElementById('product-grid');if(grid)grid.innerHTML=list.length?list.map(cardHTML).join():'<div class="col-12"><div class="empty-state"><div style="font-size:3rem">🔎</div><h3 class="h5">No encontramos productos</h3><p>Prueba con otro término o selecciona otra categoría.</p></div></div>';const label=document.getElementById('results-label');if(label)label.textContent=`${list.length} producto(s) encontrado(s)`}
let couponApplied=false;
function renderCart(){const cart=getCart();const host=document.getElementById('cart-items');if(!host)return;if(!cart.length){host.innerHTML='<div class="empty-state"><div style="font-size:3rem">🛒</div><h3 class="h5">Tu carrito está vacío</h3><p>Explora el catálogo para agregar productos.</p><a href="productos.html" class="btn btn-accent">Ver productos</a></div>';updateTotals(0);return}host.innerHTML=cart.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id);if(!p)return '';return `<div class="cart-row"><div class="cart-icon">${p.emoji}</div><div><h3 class="h6 fw-bold mb-1">${p.name}</h3><div class="text-secondary small">${money(p.price)} c/u</div><button class="btn btn-link text-danger p-0 small" onclick="removeItem(${p.id})">Eliminar</button></div><div class="cart-actions text-end"><label class="small text-secondary d-block" for="qty-${p.id}">Cantidad</label><input id="qty-${p.id}" class="form-control form-control-sm qty-control" type="number" min="1" max="99" value="${item.qty}" onchange="changeQty(${p.id},this.value)"><strong class="d-block mt-2">${money(p.price*item.qty)}</strong></div></div>`}).join('');updateTotals(cart.reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+(p?p.price*i.qty:0)},0))}
function updateTotals(subtotal){const ship=subtotal===0?0:(subtotal>=3000?0:99);const discount=couponApplied?subtotal*.10:0;const el=id=>document.getElementById(id);if(el('subtotal'))el('subtotal').textContent=money(subtotal-discount);if(el('shipping'))el('shipping').textContent=ship===0?'Gratis':money(ship);if(el('total'))el('total').textContent=money(subtotal-discount+ship)}
function changeQty(id,value){let qty=parseInt(value,10);if(!Number.isFinite(qty)||qty<1)qty=1;if(qty>99)qty=99;const cart=getCart();const item=cart.find(p=>p.id===id);if(item)item.qty=qty;saveCart(cart);renderCart()}
function removeItem(id){saveCart(getCart().filter(p=>p.id!==id));renderCart()}
function applyCoupon(){const value=(document.getElementById('coupon')?.value||'').trim().toUpperCase();const msg=document.getElementById('cart-message');if(value==='SARA10'){couponApplied=true;if(msg){msg.className='alert alert-success';msg.textContent='Cupón aplicado: 10% de descuento.'}}else{couponApplied=false;if(msg){msg.className='alert alert-warning';msg.textContent='Cupón no válido. Prueba con SARA10.'}}renderCart()}
function checkout(){const msg=document.getElementById('cart-message');if(!getCart().length){msg.className='alert alert-warning';msg.textContent='Agrega al menos un producto antes de continuar.';return}msg.className='alert alert-info';msg.textContent='Demostración académica: el carrito está listo, pero no se procesa ningún pago real.'}
