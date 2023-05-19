# User story 8: [As a traveller, I want to delete the trip information so that I can remove the trip event that I no longer want to keep a record of](https://github.com/Taehoya/Adventure-Audit/issues/114)

Expected condition:

1. Logged in successfully
2. Trip added with the following information:
   1. Trip title: “Edmonton”
   2. Start date: “2022-04-28”
   3. End date: “2022-04-30”
   4. Destination: “Canada”
   5. Budget: “500”

---

Test:

1. Click on the “Edmonton” button on the left sidebar under “PAST”
2. Click on the ![Edit](images/edit_trip.png) button on the right side of the trip title
3. Click on “Cancel” button in the bottom right side of the modal
4. Click on the ![Edit](images/edit_trip.png) button on the right side of the trip title
5. Click on the “Delete” button in the bottom left side of the modal
6. Click on the “Delete” button for the confirmation message

---

Expected result:

1. Clicking on the “Cancel” button should not do anything and still display the trip information details on the screen
2. Clicking on the “Delete” button on the alert window should refresh the page and the sidebar on the left should not have the trip button with the name “Edmonton” under “PAST”
