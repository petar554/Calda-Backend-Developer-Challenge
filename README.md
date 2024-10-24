# Calda Backend Developer Challenge

## Overview

This project is a backend application for a simple e-commerce platform built using Supabase. The application includes features for user creation, item catalog management, order processing, and change tracking.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [Features](#features)

## Technologies Used

- **Supabase**: For database management and authentication.
- **PostgreSQL**: Used as the underlying database.
- **JavaScript**: For writing edge functions.
- Docker:
- **Git**: For version control.

## Setup Instructions

1. **Create a Supabase Account**:

   - Go to [Supabase](https://supabase.com/) and sign up for an account.
   - Create a new project named "Calda Challenge".
2. **Set Up the Database**:

   - Run the SQL commands in `db/schema.sql` to create the necessary tables and relationships.
   - Optionally, execute `db/seed.sql` to populate the database with initial test data.
3. **Deploy Edge Functions**:

   - Use the Supabase CLI to deploy the edge functions defined in the `functions/` directory.
4. **Scheduled Jobs**:

   - Implement the scheduled jobs using the SQL scripts in the `jobs/` directory.

## Database Schema

The database schema is defined in `db/schema.sql`. It includes the following tables:

- **Users**: Stores user information.
- **Items**: Contains item details such as name, price, and stock.
- **Orders**: Manages order details, including shipping information.
- **Order Items**: Links orders with their respective items.

## Features

- User creation and management.
- Item catalog with metadata.
- Order processing with the ability to include multiple order items.
- Change tracking for items.
- Edge functions to handle order creation.
- Scheduled jobs to delete old orders.
