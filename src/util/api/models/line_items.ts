import { getCsrfToken } from "../../constants"

interface LineItem{
  
    order_id: number,
    product_id: number,
    qty: number,

}

async function getLineItems() {
    try {
      
      const response = await fetch("http://127.0.0.1:8080/api/v1/rest/line_items/", {
        headers: {
          "Authorization": "Bearer", // Add your bearer token here
        }
      });
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching line items:', error);
      throw error;
    }
  }
  
  async function createLineItem(lineItemData:LineItem) {
    try {
      const csrfToken = await getCsrfToken()
      const response = await fetch("http://127.0.0.1:8080/api/v1/rest/line_items/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      mode: 'cors',

        body: JSON.stringify(lineItemData),
      });
  
      const data = await response.json();
      console.log("Created Line Item:", data);
    } catch (error) {
      console.error('Error creating line item:', error);
      throw error;
    }
  }
  
  async function updateLineItem(lineItemId:string, updatedLineItemData:LineItem) {
    try {
      const csrfToken = await getCsrfToken()
      const response = await fetch(`http://127.0.0.1:8080/api/v1/rest/line_items/${lineItemId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(updatedLineItemData),
      });
  
      const updatedLineItem = await response.json();
      console.log("Updated Line Item:", updatedLineItem);
    } catch (error) {
      console.error('Error updating line item:', error);
      throw error;
    }
  }
  
  async function deleteLineItem(lineItemId:string) {
    try {
      const csrfToken = await getCsrfToken()
      const response = await fetch(`http://127.0.0.1:8080/api/v1/rest/line_items/${lineItemId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      },
        credentials: 'include',
        mode: 'cors',
      });
  
      if (response.status === 204) {
        console.log("Line item deleted successfully");
      } else {
        console.log("Failed to delete line item");
      }
    } catch (error) {
      console.error('Error deleting line item:', error);
      throw error;
    }
  }
  
  async function getLineItemById(lineItemId:string) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8080/api/v1/rest/line_items/${lineItemId}`
        )
        const data = await response.json()
        console.log('Line Item by ID:', data)
        return data;
        
    } catch (error) {
        console.error('Error fetching line item:', error)
        throw error
    }
}

  // Example line item data
  const lineItemData = {
    order_id: 9,
    product_id: 26,
    qty: 31,
  };
  
  // Example updated line item data
  const updatedLineItemData = {
    order_id: 17,
    product_id: 23,
    qty: 42,
  };
  
  // Call the functions to interact with line items
  getLineItems();
  // createLineItem(lineItemData);
  // updateLineItem(32, updatedLineItemData);
  // deleteLineItem(32);
  