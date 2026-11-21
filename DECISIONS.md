# Frontend decisions (Khan Foods)

## 1. Show choosing information on the listing card (information hierarchy)
- **Problem:** On mltd.online the menu listing shows only a name and a price. A required flavour choice appears only after opening the product (`/product/Wings`).
- **Decision:** Each card shows price, diet, spice level, calories, prep time and conditions ("Collection only", "Only N left", "Sold out") before the customer opens anything. The quantity limit appears beside the quantity control.
- **Alternative:** Keep cards minimal and put all detail on the details page.
- **Reason:** Customers can compare items and see restrictions from the list, which suits quick student orders and avoids surprises at checkout.
- **Tradeoff:** Denser cards, and more care needed to keep them readable at 390 px.
- **Code location:** `src/components/ItemCard.jsx` (ItemCard), `src/components/QtyControl.jsx` (QtyControl)
- **Evidence:** `app-card-listing.png`. Steps: 1. Open the menu. 2. Read a card without opening it. 3. Note the diet, spice, prep time and badges.

## 2. Keep filters in the URL and report hidden selections (interaction and state)
- **Problem:** On mltd.online the category buttons only scroll the page to a section. There is no way to narrow the menu by diet or price.
- **Decision:** Search, category, vegetarian-only and sort work together and are stored in the URL with `useSearchParams`. If a filter hides items already in the order, a message lists them.
- **Alternative:** Keep filters in component state only.
- **Reason:** Customers can narrow by what they need, and Back, refresh and shared links keep the same view.
- **Tradeoff:** More logic to keep the URL and controls in sync, and extra feedback so hidden selections do not confuse people.
- **Code location:** `src/pages/Menu.jsx` (Menu: `update`, `shown`, `hidden`)
- **Evidence:** `app-filters-url.png`, `app-hidden-selection.png`. Steps: 1. Add Khan Crunch Burger. 2. Choose the Drinks category. 3. See the message about hidden selected items. 4. Refresh and see the filter and the order kept.

## 3. Put each error next to its field and name it clearly (form feedback)
- **Problem:** On mltd.online/product/Wings, pressing Add to Cart without choosing a flavour shows "must select at least one addon". The message appears away from the "Choose Your Flavor" section, the page does not scroll to or highlight it, and the wording ("addon") differs from the section's label ("Flavor").
- **Decision:** Every checkout field shows its own message directly beneath it, using the field's own name and the format expected (for example "Enter a mobile number like 0300-1234567."). Invalid fields get a thicker red border and the text "Error:", not just colour. Errors appear after a field is touched or after submit, and the form state is never reset.
- **Alternative:** One general error message at the top of the form.
- **Reason:** The customer sees which field is wrong without searching for it, and only fixes that field.
- **Tradeoff:** More validation code, and each message must stay in sync with its rule. Keyboard focus does not move automatically to the first error, so a long form on a small screen can still need some scrolling.
- **Code location:** `src/pages/Checkout.jsx` (`validate`, `field`, `onChange`, `onBlur`)
- **Evidence:** `app-form-errors.png`. Steps: 1. Add items totalling over Rs 800. 2. Open checkout. 3. Press Place order with the form empty. 4. See an error under each empty field. 5. Enter a bad phone number and see only that field's error while the name stays filled.
