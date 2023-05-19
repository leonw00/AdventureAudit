# User story 5: [As a traveller, I want to be able to categorize my transactions so that I can get a better understanding of how I’m spending my money](https://github.com/Taehoya/Adventure-Audit/issues/30)

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
2. Click on the “+” button in the top right corner of the screen
3. Fill in the form from top to bottom in order:
   1. Item details: “Hotel”
   2. Amount: “250”
   3. Date: “2023-06-01 10:50 AM”
   4. Category: ![Pink Bed Category](images/pink_bed_category.png)
   5. Leave the Notes empty
4. Click on the “Save” button in the bottom left corner of the form

---

Expected result:

1. Under “Transactions” tab in the middle of the screen under the trip information, the added transaction “Hotel”
2. The “Hotel” transaction should display the category icon with the pink background
