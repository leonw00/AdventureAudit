# User story 6: [As a traveller, I want to be able to view all my transactions of a trip, so that I can view a record of my spending](https://github.com/Taehoya/Adventure-Audit/issues/22)

Expected condition:

1. Logged in successfully
2. Trip added with the following information:
   1. Trip title: “Hawaii with friends”
   2. Start date: “2023-06-01”
   3. End date: “2023-06-22”
   4. Destination: “United States”
   5. Budget: “1000”
3. One transaction added in the “Hawaii with friends” trip with the following information:
   1. Item details: “Breakfast”
   2. Amount: “10”
   3. Date: “2023-06-01 7:40 AM”
   4. Category: first icon button (top left corner)
   5. Notes: at McDonalds
4. Second transaction added in the “Hawaii with friends” trip with the following information:
   1. Item details: “Hotel”
   2. Amount: “250”
   3. Date: “2023-06-01 10:50 AM”
   4. Category: ![Pink Bed Category](images/pink_bed_category.png)

---

Test:

1. Click on the “Hawaii with friends” button on the left sidebar under “UPCOMING”
2. Click on each of the transactions to see the transaction details

---

Expected result:

1. Under “Transactions” tab in the middle of the screen under the trip information, there should be the 2 transactions showing up accordingly
2. Clicking on each of the transactions would show the details on the 3rd column
