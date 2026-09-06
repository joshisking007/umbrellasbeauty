# Umbrella's Beauty

Website for Umbrella's Beauty — cosmetics and self-care. Static HTML/CSS/JS, no build step, ready to host on GitHub Pages.

**Slogan:** Beauty of the seasons

## Pages

- `index.html` — Home
- `shop.html` — Full product grid with category filters (Lips / Eyes / Sets & gifting)
- `about.html` — Brand story
- `contact.html` — WhatsApp, Instagram, address, map

## How ordering works

There's no payment processor. Visitors browse `shop.html`, add items to a cart (saved in the browser via `localStorage`), then tap **Checkout on WhatsApp** in the cart drawer. That opens WhatsApp with a pre-filled message listing their items and subtotal, sent to the number in `js/cart.js`.

## Editing products

Everything about what's for sale lives in one file: **`js/products.js`**. To add, remove, reprice, or redescribe a product, edit the array there — every page reads from it automatically.

```js
{
  id: "unique-id",              // no spaces
  name: "Product name",
  brand: "Brand name",
  category: "lips" | "eyes" | "sets",
  price: 8500,                  // NGN, no commas
  image: "assets/images/products/your-image.jpg",
  description: "One sentence.",
  bestseller: true              // shows on the homepage if true
}
```

**Prices in this file are placeholders — update them with your real prices before launch.**

To add a new product photo: drop it in `assets/images/products/`, ideally under ~150KB (resize to max 1000px wide, JPEG quality ~82) so the site stays fast on mobile data.

## Editing contact details

WhatsApp number, address, Instagram handle, and hours currently appear in the footer of every page and on `contact.html`. Update them by searching for the phone number or handle across the HTML files — they're plain text, not pulled from a config file.

## Colors & fonts

- Palette (see `css/style.css` `:root`): dusty rose (`--blush`), deep mocha (`--mocha-deep`), wine accent (`--wine`) — pulled from the logo and product packaging.
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) for headings, [Manrope](https://fonts.google.com/specimen/Manrope) for body text, loaded from Google Fonts.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder, then save.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

No build tools, frameworks, or `npm install` needed — it's plain HTML/CSS/JS.
