# User story 9: [As a traveller, I want to be able to record transactions in different currencies to make documenting foreign purchases more accurate](https://github.com/Taehoya/Adventure-Audit/issues/37)

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
2. lick on the edit button in the top right corner of the 2nd column of the page next to the title of the trip.
3. Edit the trip information with the following information:
   1. Trip title: “Japan with friends”
   2. Destination: “Japan”
4. Click the “Save” button
5. Click on the “+” button in the top right corner of the screen
6. Fill in the form from top to bottom in order:
   1. Item details: “Hotel”
   2. Amount: “250”
   3. Date: “2023-06-01 10:50 AM”
   4. Category: Click on ![Pink Bed Category](images/pink_bed_category.png)
   5. Leave the Notes empty
7. Click on the “Save” button in the bottom left corner of the form

---

Expected result:

1. The trip title should change to “Japan with friends” instead of “Hawaii with friends”
2. The “Destination” and “Currency” section should be updated to “Japan” and “¥” accordingly
3. All “$” should be replaced by “¥”
4. The entry for putting in the amount of a transaction should be in “¥”
5. New transaction that was added should show the amount in “¥”
