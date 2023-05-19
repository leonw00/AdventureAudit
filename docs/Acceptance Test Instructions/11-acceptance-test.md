# User story 11: [As a traveller, I want to be able to invite other users to trips so that I can document transactions with others](https://github.com/Taehoya/Adventure-Audit/issues/43)

Expected condition:

1. Logged in successfully
2. Trip added with the following information:
   1. Trip title: “Japan with friends”
   2. Start date: “2023-06-01”
   3. End date: “2023-06-22”
   4. Destination: “Japan”
   5. Budget: “100000”

---

Test:

1. Click on the “Japan with friends” button on the left sidebar under “UPCOMING”
2. Click on the ![Collaboration](images/collaboration_button.png) button in the top right corner of the screen
3. Click the “Invite” button underneath the input field for “Invite”
4. Type in “kangsuhjingmail.com” in the input field under “Invite”
5. Click the “Invite” button underneath the input field
6. Type in “kang@gmail.com” in the input field under “Invite”
7. Click the “Invite” button underneath the input field
8. Type in “kangsuhjin@gmail.com” in the input field under “Invite”
9. Type in “suhjin9810@gmail.com” in the input field under “Invite”
10. Logout by clicking the Profile avatar and clicking on the “Logout” button in the top right corner
11. Login with “kangsuhjin@gmail.com” account
12. Click on the profile button
13. Click on the “Accept” button with the invite from “Suhjin Kang” with trip name “Japan with friends”
14. Click “x” button on the top right corner
15. Click on the “Japan with friends” button on the left sidebar under “UPCOMING”
16. Click on the ![Collaboration](images/collaboration_button.png) button in the top right corner of the screen

---

Expected result:

1. The first time clicking the “Invite” button should give an error saying “Please fill out this field”
2. The second input should give an error saying “Please include an ‘@’ in the email address…”
3. The third input should give an error saying “There is no user with that email”
4. The fourth input should successfully show an invite on the Profile window.
5. The fifth input should give an error saying “That user is already in this group or has a pending invite”
6. Logging into “kangsuhjin@gmail.com” account and accepting the invite should successfully show the “Japan with friends” trip and show both users’ names (Suhjin Kang & Lydia) in the “Collaboration” tab
