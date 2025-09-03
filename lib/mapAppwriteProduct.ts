export function mapAppwriteProduct(res: any) {
  return {
    $id: res.$id,
    Name: res.Name,
    Price: res.Price,
    Long_Description: res.Long_Description,
    Short_Description: res.Short_Description,
    images: res.images,
    stock: res.stock,
    category: res.category,
  };
}