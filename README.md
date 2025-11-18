# 🎬 Cinema Scheduler – Playwright Automation (BDD with Cucumber)

This project contains automated end-to-end tests for the **Cinema Scheduler Web Application** using:

- **Playwright (TypeScript)**
- **Cucumber (Gherkin)** for BDD Tests
- **Page Object Model (POM)**
- **Reusable Test Data & Utility Functions**

The objective of this project is to validate the key functionalities of the Cinema Scheduler Application including login, table renders, sorting, pagination, export functionality, typeahead suggestions, input validations, and new show creation.

---

## 📌 Project Structure

project-root/
│── features/
│ └── cinema_scheduler.feature
│── steps/
│ └── cinemaSteps.ts
│── pages/
│ ├── LoginPage.ts
│ ├── CinemaListPage.ts
│ └── DetailsPage.ts
│── test-data/
│ └── shows.ts
│── tests/
│ ├── cinemaList.spec.ts
│ ├── details.spec.ts
│ └── login.spec.ts
│── playwright.config.ts
│── cucumber.config.js
│── package.json
│── README.md

---

## 🧩 Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16+ recommended, 18+ preferred) — https://nodejs.org  
- **Git** (optional)  
- Internet connection to download Playwright browsers

---

## 🚀 Installation

Run these commands inside the test project folder (`cinema-scheduler-tests`):

```bash
# Install dependencies
npm install
npm start

# Install Playwright browsers
npx playwright install

# For Run All Tests
npx playwright test --headed

#Run Specific Test
npx playwright test -g "TC_011"

#Rerun only failed tests from last run
npx playwright test --last-failed