export type TSellItem = {
  name: string;
  productId: string;
  quantity: string;
  buyerName: string;
  dateOfSale: string;
  [key: string]: string;
};

export type TSellItemInfo = {
  productId: string;
  name: string;
  quantity: string;
};
