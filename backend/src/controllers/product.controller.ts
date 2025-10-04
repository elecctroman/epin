import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createProductSchema, updateProductSchema } from "../validators/product.validator";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../services/product.service";

export async function listProductsHandler(_req: AuthRequest, res: Response) {
  const products = await listProducts();
  return res.json(products);
}

export async function getProductHandler(req: AuthRequest, res: Response) {
  const product = await getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Ürün bulunamadı" });
  }
  return res.json(product);
}

export async function createProductHandler(req: AuthRequest, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = await createProduct(data);
  return res.status(201).json(product);
}

export async function updateProductHandler(req: AuthRequest, res: Response) {
  const data = updateProductSchema.parse(req.body);
  const product = await updateProduct(req.params.id, data);
  return res.json(product);
}

export async function deleteProductHandler(req: AuthRequest, res: Response) {
  await deleteProduct(req.params.id);
  return res.status(204).send();
}
