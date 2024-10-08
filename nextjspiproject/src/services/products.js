import axios from 'axios';
import { errorAlert, success } from './alerts';
export const submitProduct = async (productData, mode) => {
  try {
    let response;
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('marque', productData.marque);
    formData.append('type', productData.type);
    productData.images.forEach((image) => formData.append('images', image));
    // console.log(productData.images);
    // console.log(productData._id);
    console.log(formData);
    console.log(productData);
    if (mode === 'Create') {
      response = await axios
        .post(`${process.env.backurl}/api/admin/products`, formData)
        .then((data) => {
          console.log(data);
          console.log(data.data);

          if (data) {
            success(data.message);
            window.location = '/admin/Products';
          }
        })
        .catch((error) => {
          if (error.response) {
            errorAlert(error.response.data.message);
          }
        });
    } else {
      response = await axios.put(
        `${process.env.backurl}/api/admin/products/update/${productData._id}`,
        formData
      );
    }

    // console.log(response.data);
  } catch (error) {
    console.error(error);
    // handle error
  }
};
