import { hero, feaProducts, leaProducts, service } from './data.js';

const heroWrapper = document.querySelector(".hero__wrapper");

heroWrapper.innerHTML = hero.map((item) => (
    `<div>
    <p class="font-bold leading-[175%] text-[16px] text-[#FB2E86] mb-[12px]">${item.info}</p>
    <h2 class="font-bold text-[53px] text-[#000] mb-[12px] w-[750px]">${item.title}</h2>
    <p class="font-bold text-[16px] leading-[175%] text-[#8A8FB9] w-[600px] mb-[27px]">${item.text}</p>
    <a class="font-bold text-[17px] text-[#FFFFFF] rounded-[2px] bg-[#FB2E86] py-[16px] px-[40px]" href="#">${item.button}</a>
    </div>
    <img src="${item.img}">
    `
)).join("");



const FeaturedProduct = document.querySelector(".FeaturedProducts_list");
const cartEl = document.querySelector(".counter");
const title = document.querySelector(".title_price");

const drawer = document.querySelector('.drawer');
const openDrawerBtn = document.querySelector('.open-drawer-btn');

openDrawerBtn.addEventListener('click', () => {
  drawer.classList.toggle('-translate-y-full'); 
});

const closeDrawerBtn = document.querySelector('.drawer-close');
const closeDrawer = () => {
  drawer.classList.remove('show'); // Toggles drawer visibility from top
};

closeDrawerBtn.addEventListener('click', () => {
  closeDrawer();
});

FeaturedProduct.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const product = feaProducts.find((item) => item.id === Number(id));
    const oldData = loadState("products");
    if (oldData) {
      const oldProduct = oldData.find((item) => item.id === Number(id));
      if (!oldProduct) {
        saveState("products", [
          ...oldData,
          { ...product, user_price: product.count, user_count: 1 },
        ]);
      }
    } else {
      saveState("products", [
        { ...product, user_price: product.count, user_count: 1 },
      ]);
    }
  }

  renderCart();
});

FeaturedProduct.innerHTML = feaProducts.map((item) => (
    `<li class="w-[270px]  text-center shadow-md">
    <div class="bg-[#f6f7fb] pt-[46px] pb-[12px]"><img class="mx-auto" src="${item.img}"></div>
    <div class="py-[15px]"><h2 class="font-bold text-[18px] text-[#FB2E86] mb-[12px]">${item.title}</h2>
    <img class="mx-auto mb-[12px]" src="${item.icon}">
    <p class="font-normal text-[14px] text-[#151875] mb-[12px]">${item.info}</p>
    <p class="font-normal text-[14px] text-[#151875] mb-[12px]">$ ${item.count}</p>
    <button data-id=${item.id} class="font-bold text-[17px] text-[#FFFFFF] rounded-[2px] bg-[#FB2E86] py-[12px] px-[30px]">BUY</button>
    </div>
    </li>`
)).join("");

const loadState = (key) => {
  const data = localStorage.getItem(key);
  if(data) {
    return JSON.parse(data);
  }
  return;
};

const saveState = (key, data) => {
  if(data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const totalPrice = () => {
  const data = loadState("products");
  if (data) {
    title.innerHTML = data.reduce((a, b) => a + b.user_price, 0) + " $";
  }
};

const renderCart = () => {
  const data = loadState('products');
  cartEl.innerHTML = data?.map((item) =>
    `<li class="w-[270px]  text-center shadow-md">
  <div class="bg-[#f6f7fb] pt-[46px] pb-[12px]"><img class="mx-auto" src="${item.img}"></div>
  <div class="py-[15px]"><h2 class="font-bold text-[18px] text-[#FB2E86] mb-[12px]">${item.title}</h2>
  <img class="mx-auto mb-[12px]" src="${item.icon}">
  <p class="font-normal text-[14px] text-[#151875] mb-[12px]">${item.info}</p>
  <p class="font-normal text-[14px] text-[#151875] mb-[12px]">$ ${item.user_price}</p>
  <div>
  <button data-increment="${item.id}">+</button>
  <span>${item.user_count}</span>
  ${item.user_count > 1 ? `<button data-decrement=${item.id}>-</button>` : `<button data-delete=${item.id}>x</button>`}
  </div>
  </div>
  </li>`
);
totalPrice();
};

renderCart();

const delettedItem = (id) => {
  const data = loadState("products");
  const newData = data.filter((item) => item.id != id);
  saveState("products", newData);

  renderCart();
};

cartEl.addEventListener("click", (e) => {
  const inc = e.target.dataset.increment;
  const dec = e.target.dataset.decrement;
  const del = e.target.dataset.delete;
  const products = loadState('products');
  if (del) {
    delettedItem(del);
  }
  if (inc || dec) {
    const newData = products.map((item) => {
      if (inc == item.id) {
        return {
          ...item,
          user_count: item.user_count + 1,
          user_price: item.count * (item.user_count + 1),
        };
      }
      if (dec == item.id && item.user_count > 0) {
        return {
          ...item,
          user_count: item.user_count - 1,
          user_price: item.count * (item.user_count - 1),
        };
      }
      return item;
    });

    saveState("products", newData);

    renderCart();
  }
});

const LeatestProductsList = document.querySelector(".LeatestProducts_list");

LeatestProductsList.innerHTML = leaProducts.map((item) => (
    `<li class="w-[360px]">
    <div class="bg-[#f7f7f7] pt-[33px] pb-[8px]">
    <img class="mx-auto" src="${item.img}">
    </div>
    <div class="pt-[15px] bg-[#fff] flex items-center justify-between">
    <h3 class="font-normal text-[16px] text-[#1a0b5b] border-b-solid border-b-[2px] border-[#EEEFFB] pb-[4px]">${item.title}</h3>
    <div class="flex items-center gap-[10px]">
    <p class="font-normal text-[14px] text-[#1a0b5b]">${item.count}</p>
    <p class="font-normal text-[12px] text-[#FB2448] line-through pt-[4px]">${item.sale}</p>
    </div>
    </div>
    </li>`
)).join("");

const Service = document.querySelector(".service");

Service.innerHTML = service.map((item) => (
    `<li class="w-[270px] text-center px-[26px] pt-[56px] pb-[45px] shadow-md">
    <img class="mx-auto mb-[27px]" src="${item.img}">
    <h3 class="font-semibold text-[22px] text-[#1a0b5b] mb-[20px]">${item.title}</h3>
    <p class="font-bold text-[16px] text-[#BAB6CE] leading-[160%]">${item.info}</p>
    </li>`
)).join("");


const breadcrumb = document.querySelector(".breadcrumb");

const generateLink = (...arr) => {
  console.log(globalThis.location);

  breadcrumb.innerHTML = arr
    .map(
      (item, i) =>
        `<a class="font-normal text-[18px] text-[#1a0b5b] hover:text-[#FB2E86] hover:border-b-[solid] hover:border-b-[1px] hover:border-b-[#FB2E86]" href="${
          item == "New Arrival" ? "index" : item
        }.html">${item}</a> ${arr[i + 1] ? "" : ""} `
    )
    .join("");
};

generateLink("New Arrival", "Best Seller", "Featured", "Special Offer");

$(".slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        dots: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
