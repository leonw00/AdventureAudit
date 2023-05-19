# User story 4: [As a traveller, I want to be able to add transactions to a trip so that I can record what I have spent during the trip](https://github.com/Taehoya/Adventure-Audit/issues/17)

Expected condition:

1. Logged in successfully
2. Trip added with the following information:
   1. Trip title: “Hawaii with friends”
   2. Start date: “2023-06-01”
   3. End date: “2023-06-22”
   4. Destination: “United States”
   5. Budget: “1000”

---

Test:

1. Click on the “Hawaii with friends” button on the left sidebar under “UPCOMING”
2. Click on the “+” button on the top right corner of the screen
3. Fill in the form from top to bottom in order:
   1. Item details: “Breakfast”
   2. Amount: “10”
   3. Date: “2023-06-01 7:40 AM”
   4. Category: Click on the first icon button (top left corner)
   5. Notes: at McDonalds
4. Click on the “Save” button on the bottom left corner of the form

---

Expected result:

1. Under “Transactions” tab in the middle of the screen under the trip information, there should be the transaction showing up
