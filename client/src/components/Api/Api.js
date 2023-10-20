import axios from 'axios';
const userId = localStorage.getItem('uId')
const Email = localStorage.getItem('email')
const baseUrl = 'http://localhost:3000';


//resetpassword api
export const resetPasswordApi = async (formData) => {
  const response = await axios.post(`${baseUrl}/users/resetPassword`, formData)
  return response.data

}
export const changePasswordApi = async (formData) => {
  formData.email = Email
  //console.log(formData)
  const response = await axios.post(`${baseUrl}/users/changepassword`, formData)
  return response.data.message
}


//cart
export const addToCartApi = (productId) => {

  const response = axios.post(`${baseUrl}/users/${userId}/carts`, { productId });

  return response

};
export const removeFromCartApi = async (itemId) => {
  return axios.delete(`${baseUrl}/users/carts/${itemId}`)

};

export const displayCartApi = async () => {
  const response = await axios.get(`${baseUrl}/users/${userId}/carts`)
  console.log(response)
  return response.data.data.data

}
export const updateQuantityApi = async (itemId, newQuantity) => {
  const response = await axios.put(`${baseUrl}/updatequanity/${itemId}`, { quantity: newQuantity })
  return response.data.data
  console.log(response)
}


//wishlist

export const addToWishlistApi = (productId) => {
  return axios.post(`${baseUrl}/users/wishlist`, { productId });
};

export const removeFromWishlistApi = async (itemId) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/wishlist/${itemId}`);
    return response.data;
  }
  catch (error) {
    throw error;
  }
};


//users

export const getUserApi = async () => {
  const response = await axios.get(`${baseUrl}/users/${userId}`)
  //console.log(response.data.data.data)
  return response.data.data
}

export const updateUserApi = async (formData) => {
  console.log("updateUserApi", formData)
  const response = await axios.put(`${baseUrl}/users/${userId}`, formData)
  return response
}

export const displayUsersApi = async () => {
  //console.log("userId", userId)
  const response = await axios.get(`${baseUrl}/users`)
  //console.log("response", response.data)
  return response
}
export const deleteUsersApi = async (userId) => {
  const response = await axios.delete(`${baseUrl}/users/${userId}`)
  return response.data
}
//products
export const displayProductsApi = async () => {
  const response = await axios.get(`${baseUrl}/products`)
  return response
}
export const addProductsApi = async (data) => {
  const response = await axios.post(`${baseUrl}/products`, data)
  return response
}
export const deleteProductApi = async (productId) => {
  const response = await axios.delete(`${baseUrl}/products/${productId}`)
  return response
}

//orders
export const displayOrderApi = async () => {
  const response = await axios.get(`${baseUrl}/users/orders`)
  //console.log("response", response)
  return response
}
export const displayorderByIdApi = async () => {
  const response = await axios.get(`${baseUrl}/users/${userId}/orders`)
  return response
}
export const updateOrderStatusApi = async (orderId, status) => {
  const response = await axios.put(`${baseUrl}/users/orders/${orderId}`, { status })
  //console.log(response)
  return response
}