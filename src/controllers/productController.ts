import { Request, Response } from "express";
import { ProductImage } from "../entities/productImage"
import { findProducts,addProduct,findExistingProducts ,updateProduct,removeProduct,findProductById} from "../services/productServices";
import { Product } from "../entities/product";
import path from "path";
import fs from 'fs';


export const getProducts = async (req: Request, res: Response) => {
  const products = await findProducts();
  res.json(products);
};
export const getProductsById = async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
     res.status(400).json({ error: "Invalid Product ID" });
  }
  if (!id) {
     res.status(400).json({ error: "Product ID is required" });
  }
  const products = await findProductById(id);
  res.status(200).json({data:products});
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    
    const { sku, name, price } = req.body;
    
    if (!sku || !name || !price ) {
       res.status(400).json({ error: "SKU, Name, and Price are required fields!" });
    }
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
       res.status(400).json({ error: "No files uploaded!" });
    }

    // Extract uploaded image paths from req.files
    const uploadedImages = (req.files as Express.Multer.File[])?.map(file => {
      const image = new ProductImage();
      image.imageUrl = file.filename;
      return image;
    }) || [];

    const newProduct = new Product();
    newProduct.sku = sku;
    newProduct.name = name;
    newProduct.price = parseFloat(price); // Convert price to number
    newProduct.images = uploadedImages;

    const savedProduct = await addProduct(newProduct);

     res.status(201).json({
      message: "Product created successfully!",
      product: savedProduct,
    });

  } catch (error:any) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

export const updateExistingProduct = async (req: Request, res: Response) => {
  const id : number =parseInt (req.params.id);4
  console.log("req.params.id",req.params.id);
  
  const existingProduct = await findExistingProducts(id);
const product=req.body
  if (!existingProduct)  res.status(404).json({ message: "Product not found" });

  if (Array.isArray(req.files) && req.files.length > 0)
    {
      const uploadedImages = (req.files as Express.Multer.File[])?.map(file => {
        const image = new ProductImage();
        image.imageUrl = file.filename;
        return image;
      }) || [];
    
      const newProduct = new Product();
      newProduct.id = id; // Set the ID of the existing produc
      newProduct.sku =product. sku;
      newProduct.name = product.name;
      newProduct.price = parseFloat(product.price); // Convert price to number
      newProduct.images = uploadedImages;
      await addProduct(newProduct);
    }
    await addProduct({...product,id});

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response):  Promise<void>=> {
  const id :number = parseInt(  req.params.id);
  const product = await findProductById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  product?.images.forEach((image: any) => {
    const imagePath = path.join(__dirname, 'uploads', image.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image file
    }
  });
  if (product) {
    await removeProduct(product);
    res.status(204).json({
      message: "Product deleted successfully!"
    });
  }
};
