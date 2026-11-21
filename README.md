# Khan Foods

**CS4032 Web Programming, Assignment 02, Fall 2026**
Abdul Hannan Khan · Roll no. 24i2014 · Section B · BS Cyber Security, FAST-NUCES Islamabad

## Description
Khan Foods is a fictional fast-food business (burgers, fried chicken, wraps, sides, drinks and desserts) for FAST students in Islamabad. Customers browse the menu, search, filter and sort, open an item, build an order, complete a checkout form, review a calculated summary and reach a confirmation.

All orders are **simulated**. No payment is taken, no real order is sent, and no personal data leaves the browser.

## Links
- GitHub: [PASTE REPO URL]
- Deployment: [PASTE VERCEL URL]
- Final commit hash: [PASTE `git rev-parse HEAD`]

## Commands
```
npm install      # install dependencies
npm run dev      # development server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm test         # runs: node --test
```

## Routes
| Route | Purpose |
|---|---|
| `/` | Menu: search, category, vegetarian filter, sort (kept in the URL) |
| `/items/:id` | Item details, for example `/items/m1`; unknown IDs show a helpful message |
| `/checkout` | Order review, quantity changes, form, calculated summary |
| `/confirmation` | Final order summary (simulated) |
| `*` | Not-found page with a link back to the menu |

## Features
- 12 items with stable IDs in `src/data/items.js`
- Search, category filter, vegetarian filter and sort, all working together
- Cart with quantity controls, shared across menu, details and checkout
- Cart, delivery mode and last order saved in local storage
- Async mock loader with loading, error and Retry states
- Separate empty-state messages (no data vs. no matches)
- Controlled checkout form with per-field validation
- Summary with subtotal, delivery fee and total
- Three operating rules (below)

## Operating rules
| Rule | Condition | Where users are told | Behaviour |
|---|---|---|---|
| Availability | Max 6 of one item per order, never more than stock | Beside the quantity control | "+" disables at the limit; saved quantities above the limit are corrected with a message |
| Eligibility | Collection-only items (Soft-Serve Sundae) cannot be delivered | "Collection only" badge on card and details page | Checkout blocks delivery until the item is removed or collection is chosen |
| Pricing / fulfilment | Delivery needs Rs 800 minimum, costs Rs 150, free from Rs 2,500 | Strip on every page and the summary | Checkout blocks delivery below Rs 800 and shows how much to add |

Rule logic lives in `src/rules/orderRules.js`.

## Reproducing edge cases
- **Loading failure:** tick "Simulate loading failure" in the footer. The menu shows an error and Retry. Untick and press Retry to recover.
- **Changed availability:** add Khan Crunch Burger and Tikka Grill Burger to the order, then press the footer button that sells those two out. They are removed from the order and a message explains why. Press the button again to restore stock.
- **Restored saved data:** add items and refresh. The order is restored and checked against current stock and rules.
- **Invalid URL:** open `/items/zzz`.
- **No results:** search for `zzz` on the menu.

## Testing
`npm test` runs `tests/orderRules.test.js` with Node's built-in test runner (`node:test`, `node:assert/strict`). It tests the same `checkQuantity` function the app uses: a valid quantity (3), exactly the limit (6), one above the limit (7), and stock lower than the limit. Result: 4 passed, 0 failed.

## Simulated operations
Orders, the confirmation reference, the loading failure and the "sell out" control are all simulated. No payment details or personal information are collected beyond a name and phone number typed into the form, and those are not stored or sent anywhere.

## Known limitations
- Stock levels are fixed in the data file and do not fall after an order is placed.
- Only the availability rule has an automated test. The other two rules are checked manually.
- The page does not move keyboard focus to the first invalid form field on submit.
- Menu items have no photos.
- Delivery areas and time slots are fixed lists.

## Concept map
| Concept | File | Component / function |
|---|---|---|
| Components, props, callback props | src/components/ItemCard.jsx, QtyControl.jsx | ItemCard, QtyControl |
| Routing, URL parameters, links | src/App.jsx, src/pages/ItemDetails.jsx | Routes, useParams, Link |
| URL-based filters | src/pages/Menu.jsx | useSearchParams, update |
| Shared state (context) | src/context/StoreContext.jsx | StoreProvider, useStore |
| Functional state updates | src/context/StoreContext.jsx | setQty |
| Immutable object updates | src/pages/Checkout.jsx, StoreContext.jsx | onChange, setQty |
| Effects and cleanup | src/context/StoreContext.jsx | load effect with `ignore` cleanup |
| Local storage persistence | src/context/StoreContext.jsx | read, write, persistence effects |
| Async mock loader | src/api/loadItems.js | loadItems (Promise, failure path) |
| Derived values | src/context/StoreContext.jsx | cartLines, subtotal, fee, total |
| Array methods and lists with keys | src/pages/Menu.jsx | filter, sort, map with key=item.id |
| Controlled form and validation | src/pages/Checkout.jsx | validate, field, submit |
| Conditional rendering | src/pages/Menu.jsx, Checkout.jsx | loading, error, empty states |
| Business rules | src/rules/orderRules.js | checkQuantity, deliveryFee, fulfilmentProblems |
| Automated test | tests/orderRules.test.js | node:test cases |
