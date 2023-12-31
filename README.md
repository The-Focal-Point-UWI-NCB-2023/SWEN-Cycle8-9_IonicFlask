# UWI-NCB Agile Scrum Cycle 8 & 9 Assignment

## Development Workflow
1) Create a branch from dev with the issue id and a title for example : **FA-31/User-API-Endpoints**

2) Merge to Dev

3) Merge from Dev -> Main

## Ionic Setup
- Install dependencies
```bash
npm install
```

- Start Dev Server
```bash
npm run dev
```

## API Setup

- Create virtual environment
```bash
python -m venv env
```

- Install requirements
```bash
pip install -r requirements.txt
```

- Run Server
```bash
python run.py
```

### Database Migrations
- Check for changes and make new migration file
```bash
flask db migrate
```

- Sync changes to the database
```bash
flask db upgrade
```

- Revert database changes to previous state
```bash
flask db downgrade
```

## Testing
- Using pytest with pytest-cov. <a href="https://testdriven.io/blog/flask-pytest/">Reference</a>
```bash
python -m pytest --cov=app
```

## CI/CD
- Using <a href="https://pre-commit.com/">pre-commit</a>  hook for file auto-formatting
    - Lints code
    - Autocorrects format to pep8 standard
    - Runs pytest

- Staging Environment <a href="https://focalpoint-app-staging.onrender.com/">HERE</a>

- Deployed to <a href="https://focalpoint-app.onrender.com/">HERE</a>
    - Configured to deploy on changes to main

# Folder Structure
- api - All API endpoints here
- models - ORM configuration and classes
- static - CSS, JS, Images, all static files
- templates - SSR templates
- tests - Unit tests for entire application
- views - SSR template endpoints

# Requirements

## Unauthenticated Users
- As an unauthenticated user I want to be able to register for an account using my username and password so that I can log in and log out

- As an unauthenticated user I want to view products and their details without logging in

## Authenticated users
- As an authenticated user I want to be able to add products and choose the amount when I go to the product detail page
    - As an authenticated user I want to be able to view my shopping cart to see my added products, their quantity and my total price
    - As an authenticated user I want to be able to checkout and make payments using <a href="https://stripe.com/docs/checkout/quickstart">Stripe</a>
    - As an authenticated user I want to be able to see my order as pending, completed or cancelled.

## Admin Users

- As an admin I want to view a list of users and edit their details, including their role (admin/regular)
- As an admin I want to be able to create, read, update or delete products
- As an admin I want to be able to view a list of orders with their respective statuses and line item details
