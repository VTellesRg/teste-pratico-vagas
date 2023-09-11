export type ProductType = {
	  code: number;
	  name: string;
	  cost_price: number;
	  sales_price: number;
	  new_price?: number;
	  valid_from: string;
}

export type ProductTypeUpdate = {
	code: number;
	new_price: number;
}