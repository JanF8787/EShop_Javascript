const container = document.getElementById('container');
const sortedBtnFromLowest = document.getElementById('sorted-btn-from-lowest');
const sortedBtnFromHighest = document.getElementById('sorted-btn-from-highest');
const backBtn = document.getElementById('back-btn');

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    let products = [];
    products = data.products;
    handleData(products);

    sortedBtnFromLowest.addEventListener('click', () => {
      const sortedData = products.slice().sort((a, b) => a.price - b.price);
      handleData(sortedData);
    });

    sortedBtnFromHighest.addEventListener('click', () => {
      const sortedData = products.slice().sort((a, b) => b.price - a.price);
      handleData(sortedData);
    });

    backBtn.addEventListener('click', () => {
      handleData(products);
    })
  });

const addClasses = (myProduct, picture, content, brand, name, information, prices, beforeDiscount, addBtn) => {
  myProduct.classList.add('product');
  picture.classList.add('picture');
  content.classList.add('content');
  brand.classList.add('brand');
  name.classList.add('name');
  information.classList.add('information');
  prices.classList.add('prices');
  beforeDiscount.classList.add('before-discount');
  addBtn.classList.add('add-btn');
}

const appendChildren = (container, myProduct, picture, content, prices, myImg, brand, name, information, beforeDiscount, discount, afterDiscount, addBtn) => {
  container.appendChild(myProduct);

  myProduct.appendChild(picture);
  myProduct.appendChild(content);
  myProduct.appendChild(prices);

  picture.appendChild(myImg);

  content.appendChild(brand);
  content.appendChild(name);
  content.appendChild(information);

  prices.appendChild(beforeDiscount);

  if (discount != undefined && afterDiscount != undefined) {
    prices.appendChild(discount);
    prices.appendChild(afterDiscount)
  }

  prices.appendChild(addBtn);
}

const setContent = (myImg, brand, name, information, addBtn, product) => {
  myImg.setAttribute('src', product.thumbnail);
  brand.textContent = product.brand;
  name.textContent = product.title;
  information.textContent = product.description;
  addBtn.textContent = "ADD";
}

function handleData(products) {
  container.innerHTML = '';

  products.forEach(product => {
    const myProduct = document.createElement('div');
    const picture = document.createElement('div');
    const myImg = document.createElement('img');
    const content = document.createElement('div');
    const brand = document.createElement('p');
    const name = document.createElement('p');
    const information = document.createElement('p');
    const prices = document.createElement('div');
    const beforeDiscount = document.createElement('p');
    const discount = document.createElement('p');
    const afterDiscount = document.createElement('p');
    const addBtn = document.createElement('button');

    if (product.discountPercentage < 5) {
      addClasses(myProduct, picture, content, brand, name, information, prices, beforeDiscount, addBtn);

      setContent(myImg, brand, name, information, addBtn, product);
      beforeDiscount.textContent = product.price + "$";

      appendChildren(container, myProduct, picture, content, prices, myImg, brand, name, information, beforeDiscount, discount, afterDiscount, addBtn);

      addBtn.addEventListener('click', () => {
        console.log(product.description);
      });
    } else {
      addClasses(myProduct, picture, content, brand, name, information, prices, beforeDiscount, addBtn);

      discount.classList.add('discount');
      afterDiscount.classList.add('after-discount');

      setContent(myImg, brand, name, information, addBtn, product);

      const priceBefore = Math.ceil(product.price / (1 - (product.discountPercentage / 100)));
      discount.textContent = Math.ceil(priceBefore - product.price) + "$";
      afterDiscount.textContent = product.price + "$";
      beforeDiscount.textContent = priceBefore + "$";
      beforeDiscount.style.textDecoration = 'line-through';

      appendChildren(container, myProduct, picture, content, prices, myImg, brand, name, information, beforeDiscount, discount, afterDiscount, addBtn);

      addBtn.addEventListener('click', () => {
        console.log(product.description);
      });
    }
  });
}