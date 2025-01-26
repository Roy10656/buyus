import summaryApi from '../common';

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(summaryApi.categoryWiseProduct.url, {
      method: summaryApi.categoryWiseProduct.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productCategory: category })
    });

    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching category-wise products:', error);
    throw error;
  }
};

export default fetchCategoryWiseProduct;
