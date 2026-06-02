# Acmatix Automation Framework

A comprehensive Test Automation Framework built using Playwright and JavaScript that covers both:

✅ UI Automation Testing

✅ API Automation Testing

The framework validates web application functionality through browser automation and API endpoint testing while following industry-standard automation practices such as Page Object Model (POM), reusable utilities, fixtures, and detailed reporting.

---

## 🚀 Features

### UI Automation

- Login Validation
- Inventory Verification
- Cart Functionality Testing
- Checkout Flow Testing
- Logout Validation
- Cross Browser Testing

### API Automation

- GET Request Validation
- POST Request Validation
- PUT Request Validation
- DELETE Request Validation
- Response Schema Validation
- Status Code Validation
- Error Handling Verification
- Timeout Validation

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| JavaScript (ES6+) | Programming Language |
| Playwright | UI Automation |
| Playwright API Testing | API Automation |
| Node.js | Runtime Environment |
| Playwright Test Runner | Test Execution |
| Page Object Model | Design Pattern |
| Git & GitHub | Version Control |
| HTML Reports | Reporting |

---

## 📁 Project Structure

```bash
Acmatix/
│
├── tests/
│   ├── ui/
│   │   ├── login.spec.js
│   │   ├── inventory.spec.js
│   │   ├── cart.spec.js
│   │   └── checkout.spec.js
│   │
│   └── api/
│       ├── posts.spec.js
│       ├── comments.spec.js
│       ├── users.spec.js
│       └── httpbin.spec.js
│
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/
│
├── utils/
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## ✅ API Test Coverage

### JSONPlaceholder APIs

- GET /posts
- GET /posts/{id}
- POST /posts
- PUT /posts/{id}
- DELETE /posts/{id}
- Query Parameter Validation
- Response Data Validation

### HTTPBin APIs

- Status Code Validation
- Error Handling Validation
- Timeout Handling Validation

---

## ✅ UI Test Coverage

### SauceDemo Application

- Standard User Login
- Locked User Validation
- Invalid Credential Validation
- Product Listing Validation
- Add To Cart Validation
- Cart Verification
- Checkout Workflow
- Logout Functionality
- Product Sorting Validation

---

## ▶️ Execute UI Tests

```bash
npx playwright test tests/ui
```

## ▶️ Execute API Tests

```bash
npx playwright test tests/api
```

## ▶️ Execute Complete Test Suite

```bash
npx playwright test
```

---

## 📊 Reporting

Generate and open reports:

```bash
npx playwright show-report
```

---

## ⭐ Key Achievements

- Automated UI and API testing in a single framework
- Implemented Page Object Model (POM)
- Created reusable fixtures and utilities
- Added API response validation
- Implemented timeout and error handling scenarios
- Enabled parallel execution
- Generated detailed HTML reports
- CI/CD integration ready
