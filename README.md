# AdventureAudit

## Project Summary and Vision

AdventureAudit is a travel focused expense tracking web application that aims to provide users a quick and easy to use tool to document the transactions of their trips. AdventureAudit can document trip expenses individually or with other travelers as a group.

The main users of AdventureAudit are travelers who want to have a clear record of their spending history. AdventureAudit provides travelers the option to set their budget at the start of a trip to help them not overspend. Transactions and expenses can be quickly added to a trip from flight tickets to accommodations. These transactions can also be given different categories to increase the level of detail of their spending history. Custom categories can be created for a traveler’s specific needs and circumstances. AdventureAudit will produce a comprehensive report of expenses for each trip, listing the top five most expensive purchases and displaying a pie chart organized by transaction category. This report will serve as a tool for the users to analyze their expenses and as a reference for future planning decisions. Traveling abroad? Don’t worry! AdventureAudit will handle transactions made in foreign currencies.

Using AdventureAudit makes it easy to travel with friends and family. Travelers can add their travel partner(s) to their AdventureAudit trip, allowing them all to add transactions to the same trip. Furthermore, AdventureAudit can divide the costs of purchases evenly among the travelers. For example, if one person organizes the hotel or plane tickets for a trip, AdventureAudit can display how much money the other travelers in the group would need to give the organizer.

AdventureAudit lowers the stress of traveling with a budget by creating a simple and fast way to document the spending of your trip. Instead of focusing on your budget, focus on making memories.

## Core Features

- Trip expense/payment tracking
- Group trip sharing (collaborate)
- Trip Report
- Response 100 users with 1000 requests per minute concurrently

## Technologies

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL

## User Stories

- User stories for trip expense/payment tracking:
  - As a traveler, I want to be able to view a list of all my trips so that I can access a specific trip
  - As a traveler, I want to be able to create a trip so that I can record my transactions
  - As a traveler, I want to be able to add transactions to a trip so that I can record what I have spent during the trip
  - As a traveler, I want to be able to view all my transactions of a trip, so that I can view a record of my spending
  - As a traveler, I want to be able to enter my budget for a trip so that I know how much I can spend and not overspend
  - As a traveler, I want to be able to categorize my transactions so that I can get a better understanding of how I’m spending my money
  - As a traveler, I want to be able to add custom categories so that I can personalize my transactions to have a more detailed record
  - As a traveler, I want to be able to record transactions in different currencies to make documenting foreign purchases more accurate
- User stories for group trip sharing:
  - As a traveler, I want to be able to invite other users to trips so that I can document transactions with others
  - As a transaction payer, when I add a transaction, I want to be able to select the other users that I paid for, so that we can divide the cost later
- User Stories for Trip report:
  - As a traveler, I want to be able to see how much the entire trip cost so that I can learn about how much it took to travel
  - As a traveler, I want to be able to view my transactions in a pie chart by category so that I can see where I spent the most money
  - As a traveler, I want to be able to see my top 5 most expensive transactions so I can see what activities/services cost the most during a trip
  - As a group traveler, I want to see how much money I owe to others and who owes me money, so that everyone’s debts are documented
