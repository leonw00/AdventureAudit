# User story 1: [As a traveller, I want to be able to create a trip so that I can record my transactions](https://github.com/Taehoya/Adventure-Audit/issues/13)

Test:

1. Click on “Sign in with Google” on the centre of the screen
2. Sign in using the Google account
3. Click on “+ New Trip” button on the bottom of the sidebar (left bottom corner of the screen)
4. Fill in the new trip form:
   1. On the very top, type in the trip title: “Hawaii with friends”
   2. Select start date: “2023-06-01”
   3. Select end date: “2023-06-22”
   4. Select destination/country from drop down: “United States”
   5. Type in the budget field: “1000”
5. Click on the “Save” button on the bottom right corner
6. Click on the “Hawaii with friends” button on the left sidebar under “UPCOMING”

---

Expected Result:

1. All the fields in the new trip form should be field before being able to save the trip
2. If any field is not filled, it should give an error
3. The end date should not allow the user to fill in dates that are prior to the start date
4. Clicking on the “Cancel” button should not save the trip information (should not show up on the Sidebar)
5. Clicking on the “Save” button should save the trip information as filled and show up on the sidebar as a button
6. Clicking on the “Hawaii with friends” button should display the trip details beside the sidebar
