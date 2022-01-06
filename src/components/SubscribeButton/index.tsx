interface Product {
  productId: string;
}

export function SubscribeButton(product: Product) {
  return <button>Subscribe now</button>;
}
