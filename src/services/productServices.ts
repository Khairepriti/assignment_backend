import { log } from "console";
import { AppDataSource } from "../../config";
import { Product } from "../entities/product";
import { ProductImage } from "../entities/productImage";

const productRepository = AppDataSource.getRepository(Product);
const productImageRepository =AppDataSource.getRepository(ProductImage)

export const findProducts = async () => {
  const products = await productRepository.find({ relations: ["images"] });
return products
};

export const findExistingProducts = async (id:number) => {
    const products = await productRepository.findOneBy({ id });
  return products
  };

  export const updateProduct =async (id:number, data:Product) => {
    const updatedProduct = await productRepository.update(id, data);    
    return updatedProduct;
  }

export const addProduct = async (data:Product) => {  
  const product = productRepository.save(data);
return product
  }
  
export const findProductById = async (id: number) => {
  const product = await productRepository.findOne({
    where: { id },
    relations: ["images"]
  });
return product
}
  
  export const removeProduct = async (product: Product) => {
  
    if (product) {
      // First, delete the associated ProductImage records
      await productImageRepository.delete({ product: product });
  
      // Now delete the product
      await productRepository.remove(product);
    } else {
      throw new Error("Product not found");
    }
  };
  
  

