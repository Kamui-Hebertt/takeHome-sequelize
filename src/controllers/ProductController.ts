import { Request, Response } from 'express';
import Product from '../models/Product';

interface ProductDetails {
  name: string;
  brand: string;
  model: string;
  color: string;
  price: number;
}

const formatProductDetails = (product: ProductDetails | string | number) => {

  if (typeof product === 'string' || typeof product === 'number') {
   
    return product;
  }
  

  return {
    name: product.name,
    details: {
      brand: product.brand,
      model: product.model,
      color: product.color
    },
    price: product.price,
  };
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    const formattedProducts = products.map(formatProductDetails);
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {

    const { name, details, price } = req.body;

    const product = await Product.create({
      name,
      brand: details.brand,
      model: details.model,
      color: details.color,
      price
    });


    res.status(201).json(formatProductDetails(product));
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
 
    const productId = parseInt(req.params.id, 10);

    
    const product = await Product.findByPk(productId);


    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    
    res.json(formatProductDetails(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, details, price } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
   
    await product.update({
      name,
      brand: details.brand,
      model: details.model,
      color: details.color,
      price
    });

    res.json(formatProductDetails(product));
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
