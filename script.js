// Array of food items as an example (replace this with API call to fetch items)
const foodItems = [
    { id: 1, name: 'Burger', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3b/9a/d2/burger-king.jpg?w=500&h=-1&s=1' },
    { id: 2, name: 'Fries', img: 'https://socialcompare.com/u/1308/bk_3c1e12581a255bb31eaf1ac94c8c34e8.jpg' },
    { id: 3, name: 'Coke', img: 'https://img.freepik.com/premium-photo/closeup-ice-americano-coffee_863013-79729.jpg' }
  ];
  
  const menu = document.getElementById('menu');
  const orderButton = document.getElementById('order-button');
  const loadingMessage = document.getElementById('loading-message');
  const orderCompleted = document.getElementById('order-completed');
  const foodImage = document.getElementById('food-image');
  const orderId = document.getElementById('order-id');
  
  // Load food items dynamically into the menu section
  function loadMenu() {
    foodItems.forEach(item => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
        <input type="checkbox" id="food-${item.id}" data-id="${item.id}" data-name="${item.name}" data-img="${item.img}">
        <label for="food-${item.id}">${item.name}</label>
      `;
      menu.appendChild(foodItem);
    });
  }
  
  // Order Food Functionality
  function orderFood() {
    loadingMessage.style.display = 'block';
    orderCompleted.style.display = 'none';
    
    // Simulate a random preparation time (2-5 seconds)
    const preparationTime = Math.floor(Math.random() * 4 + 2) * 1000;
    
    new Promise((resolve) => {
      setTimeout(() => {
        // Get selected food items
        const selectedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
        
        // Choose a random item to display in the completed order (or handle multiple as per requirements)
        const randomItem = selectedItems[Math.floor(Math.random() * selectedItems.length)];
        
        if (randomItem) {
          const foodImageSrc = randomItem.dataset.img;
          foodImage.src = foodImageSrc;
          resolve(foodImageSrc);
        } else {
          resolve(null);
        }
      }, preparationTime);
    }).then((foodImageSrc) => {
      if (foodImageSrc) {
        // Show order completed UI
        loadingMessage.style.display = 'none';
        orderCompleted.style.display = 'block';
        
        // Generate unique order ID
        const uniqueOrderId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
        orderId.innerText = 'Order ID: ' + uniqueOrderId;
      } else {
        alert('Please select at least one food item!');
        loadingMessage.style.display = 'none';
      }
    });
  }
  
  // Initialize the app
  loadMenu();
  orderButton.addEventListener('click', orderFood);
  