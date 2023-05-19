# User story 3: [As a traveller, I want to be able to enter my budget for a trip so that I know how much I can spend and not overspend](https://github.com/Taehoya/Adventure-Audit/issues/25)

Expected condition:

1. Logged in successfully

---

Test:

1. Click on “+ New Trip” button on the bottom of the sidebar (left bottom corner of the screen)
2. Fill in the new trip form:
   1. On the very top, type in the trip title: “Winnipeg”
   2. Select start date: “2023-01-01”
   3. Select end date: “2023-01-22”
   4. Select destination/country from drop down: “Canada”
   5. Type in the budget field: “500”
3. Click on the “Save” button on the bottom right corner
4. Click on the “Winnipeg” button on the left sidebar under “PAST”

---

Expected Result:

1. Clicking on the “Save” button should save the trip information as filled and show up on the sidebar as a button
2. Clicking on the “Winnipeg” button should display the budget under “Budget” as “$ 500.00”
