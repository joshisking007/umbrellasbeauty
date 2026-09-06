/*
  Product catalog for Umbrella's Beauty.
  Edit this file to add, remove, or update products —
  every page (home bestsellers + shop grid + cart) reads from here.

  NOTE: prices below are placeholders (NGN). Update the `price`
  field for each product with your real prices before launch.
*/

const PRODUCTS = [
  {
    id: "qibest-lip-serum",
    name: "Hydrating Tinted Lip Serum",
    brand: "QIBEST",
    category: "lips",
    price: 8500,
    image: "assets/images/products/qibest-lip-serum.jpg",
    description: "A plumping, hydrating tint that locks in shine and keeps lips glossy long after application.",
    bestseller: true
  },
  {
    id: "herorange-lip-lacquer",
    name: "Mirror-Shine Lip Lacquer",
    brand: "HERORANGE",
    category: "lips",
    price: 9500,
    image: "assets/images/products/herorange-lip-lacquer.jpg",
    description: "A high-shine lacquer in a deep berry-wine tone, buildable from a soft flush to a full stain.",
    bestseller: true
  },
  {
    id: "leafpoem-lip-duo-berry",
    name: "2-in-1 Lip Duo — Spice Route",
    brand: "Leaf Poem",
    category: "lips",
    price: 7000,
    image: "assets/images/products/leafpoem-lip-duo-berry.jpg",
    description: "A double-ended pen pairing a warm spice liner with a coral gloss for definition and dimension.",
    bestseller: false
  },
  {
    id: "leafpoem-lip-duo-nude",
    name: "2-in-1 Lip Duo — Bare Beige",
    brand: "Leaf Poem",
    category: "lips",
    price: 7000,
    image: "assets/images/products/leafpoem-lip-duo-nude.jpg",
    description: "Cocoa liner meets a soft nude-mauve gloss — an easy everyday lip in one pen.",
    bestseller: true
  },
  {
    id: "mknk-eyeliner",
    name: "24hr Waterproof Eyeliner Duo",
    brand: "MKNK",
    category: "eyes",
    price: 5000,
    image: "assets/images/products/mknk-eyeliner.jpg",
    description: "A precision felt-tip liner in deep matte black, waterproof for up to 24 hours. Set of two.",
    bestseller: false
  },
  {
    id: "lamei-mascara",
    name: "2-Step Volumizing Mascara",
    brand: "La Mei La",
    category: "eyes",
    price: 6500,
    image: "assets/images/products/lamei-mascara.jpg",
    description: "A primer-and-colour system in one wand for lifted, fanned-out lashes that hold all day.",
    bestseller: true
  },
  {
    id: "hivi-glam-set",
    name: "The Glam Edit Gift Set",
    brand: "HiVi",
    category: "sets",
    price: 18000,
    image: "assets/images/products/hivi-glam-set.jpg",
    description: "A curated set of lip products, mascara, and a touch-up mirror — ready to gift or keep.",
    bestseller: true
  },
  {
    id: "florona-blushy-girl",
    name: "Blushy Girl Eau de Parfum",
    brand: "Florona Collection",
    category: "fragrance",
    price: 11500,
    compareAt: 24000,
    image: "assets/images/products/florona-blushy-girl.jpg",
    description: "A soft, floral-sweet Eau de Parfum in an elegant pink bottle. 100ml, made for everyday wear or gifting.",
    bestseller: true
  }
];

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function priceMarkup(product) {
  if (product.compareAt) {
    return `<span class="price">${formatNaira(product.price)}</span> <span class="compare-price">${formatNaira(product.compareAt)}</span>`;
  }
  return `<span class="price">${formatNaira(product.price)}</span>`;
}
