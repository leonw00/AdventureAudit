# User story 13: [As a group traveller, I want to see how much money I owe to others and who owes me money, so that everyone’s debts are documented](https://github.com/Taehoya/Adventure-Audit/issues/58)

Expected condition:

1. Logged in successfully
2. Trip added with the following information:
   1. Trip title: “Japan with friends”
   2. Start date: “2023-06-01”
   3. End date: “2023-06-22”
   4. Destination: “Japan”
   5. Budget: “100000”
   6. There are the following members part of the trip “Japan with friends”
      1. “Suhjin Kang”
      2. “Luke Lepa”
      3. “Taeho Choi”
      4. “Leonardo Warsito”
3. Transaction added with the following information:
   1. Item details: “breakfast”
   2. Amount: “90”
   3. Date: “2023-06-01 8:30 AM”
   4. Category: first icon button (top left corner)
   5. Leave the Notes empty
   6. Who paid?: “Suhjin Kang”
   7. Related members: “Luke Lepa”, “Taeho Choi”

---

Test:

1. Click on the “Japan with friends” button on the left sidebar under “UPCOMING”
2. Click on the “+” button in the top right corner of the screen
3. Fill in the form from top to bottom in order:
   1. Item details: “Ticket to museum”
   2. Amount: “100”
   3. Date: “2023-06-05 10:00 AM”
   4. Category: ![Orange Library Category](images/orange_library_category.png)
   5. Leave the Notes empty
   6. Who paid?: “Leonardo Warsito”
   7. Related members: “Suhjin Kang”
4. Click on the “Save” button in the bottom left corner of the form
5. Click on the ![Report](images/report_button.png) button top of the 3rd column.

---

Expected result:

1. Under “Payment Summary” section, it should display three rows (no significance in order):
   1. You ← Luke Lepa ¥30
   2. You ← Taeho Choi ¥30
   3. You → Leonardo Warsito ¥50
