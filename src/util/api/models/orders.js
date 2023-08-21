async function getOrders() {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/rest/orders/", {
        headers: {
          "Authorization": "Bearer", // Add your bearer token here
        }
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
  
  async function createOrder(orderData) {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/rest/orders/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      console.log("Created Order:", data);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  async function updateOrder(orderId, updatedOrderData) {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/rest/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrderData),
      });
  
      const updatedOrder = await response.json();
      console.log("Updated Order:", updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
  
  async function deleteOrder(orderId) {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/rest/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer`,
        },
      });
  
      if (response.status === 204) {
        console.log("Order deleted successfully");
      } else {
        console.log("Failed to delete order");
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
  
  async function getOrderById(orderId) {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/rest/orders/${orderId}`);
      const order = await response.json();
      console.log("Order by ID:", order);
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
  
  // Example order data
  const orderData = {
    user_id: 20,
    billing_address: "123 Main St",
    total_amount: 50.00,
    status: "Pending",
  };
  
  // Example updated order data
  const updatedOrderData = {
    user_id: 21,
    billing_address: "456 Elm St",
    total_amount: 75.00,
    status: "Shipped",
  };
  
  // Call the functions to interact with the orders API
  // getOrders();
  // createOrder(orderData);
  // updateOrder(1, updatedOrderData);
  // deleteOrder(1);
  // getOrderById(10);
  