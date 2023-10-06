import axios from 'axios';
const userId = localStorage.getItem('uId')
const Email = localStorage.getItem('email')
const baseUrl = 'http://localhost:3000';

//resetpassword api
export const resetPasswordApi = async (formData) => {
  const response = await axios.post(`${baseUrl}/user/resetPassword`, formData)
  return response.data

}
export const changePasswordApi = async (formData) => {
  formData.email = Email
  //console.log(formData)
  const response = await axios.post(`${baseUrl}/user/changepassword`, formData)
  return response.data.message
}
export const addToCartApi = (productId) => {

  const response = axios.post(`${baseUrl}/addtocart`, { productId, userId });
  return response
};
export const removeFromCartApi = async (itemId) => {
  return axios.delete(`${baseUrl}/removecart/${itemId}`)

};

export const displayCartApi = async () => {
  const response = await axios.get(`${baseUrl}/displaycart/${userId}`)
  console.log(response)
  return response.data.data.data

}
export const updateQuantityApi = async (itemId, newQuantity) => {
  const response = await axios.put(`${baseUrl}/updatequanity/${itemId}`, { quantity: newQuantity })
  return response.data.data
  console.log(response)
}




export const addToWishlistApi = (productId) => {
  return axios.post(`${baseUrl}/addwishlist`, { productId, userId });
};

export const removeFromWishlistApi = async (itemId) => {
  try {
    const response = await axios.delete(`${baseUrl}/removeWishlist/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserApi = async () => {
  const response = await axios.get(`${baseUrl}/user/${userId}`)
  //console.log(response.data.data.data)
  return response.data.data
}

export const updateUserApi = async (formData) => {
  console.log("updateUserApi", formData)
  const response = await axios.put(`${baseUrl}/user/${userId}`, formData)
  return response
}

export const displayUsersApi = async () => {
  console.log("userId", userId)
  const response = await axios.get(`${baseUrl}/users`)
  console.log("response", response.data)
  return response
}
export const deleteUsersApi = async (userId) => {
  const response = await axios.delete(`${baseUrl}/users/${userId}`)
  return response
}
