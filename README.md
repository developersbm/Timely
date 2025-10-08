# Timely 

Timely is a comprehensive platform designed to streamline calendar management, group interactions, and saving plans. Built with modern frontend and backend technologies, the project lays a robust foundation with a focus on responsiveness, security, and scalability. It delivers a functional experience for managing user calendars, groups, and financial plans, integrating essential third-party APIs for added functionality.

## 📑 Table of Contents

- [Showcase](#showcase)
- [Built With](#built-with)
- [Starting Server](#starting-server)
- [Authentication & Users](#authentication--users)
- [Core Features](#core-features)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Cloud Computing](#cloud-computing)
  - [Architecture Diagram](#architecture-diagram)
- [Frontend Overview](#frontend-overview)
  - [What It Does](#what-it-does)
  - [Design Priorities](#design-priorities)
  - [State Management with Redux](#state-management-with-redux)
- [Backend Overview](#backend-overview)
  - [What It Does](#what-it-does-1)
  - [Key Components](#key-components)
  - [Example Route Handlers](#example-route-handlers)
- [Client Folder Structure](#client-folder-structure)
- [Server Folder Structure](#server-folder-structure)
- [Networking & VPC](#networking--vpc)
  - [Configuration Notes](#configuration-notes)
- [DeepSeek Chatbot](#deepseek-chatbot-integration)
- [Deployment](#deployment)
  - [AWS EC2 Instance](#aws-ec2-instance)
  - [PM2 Process Manager](#pm2-process-manager)
- [License](#license)

---

## 🚀 Showcase

https://github.com/user-attachments/assets/206b1914-614f-449f-bc5f-9a2765fc20d1

[🔝 Back to top](#timely)

---

## 🛠️ Built With

- ![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white&style=flat-square)
- ![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white&style=flat-square)
- ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=flat-square)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
- ![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white&style=flat-square)
- ![Express.js](https://img.shields.io/badge/Express.js-gray?logo=express&logoColor=white&style=flat-square)
- ![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazon-aws&logoColor=white&style=flat-square)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat-square)

[🔝 Back to top](#timely)

---

## 🔐 Authentication & Users

Timely employs secure user authentication using the service AWS Cognito for safe login and user management. Key features include:

- **User Registration**: Secure account creation with email/password credentials.
- **User Sign-In**: Authentication that verifies user identities.
- **Session Management**: Secure handling of user sessions for seamless interactions.

[🔝 Back to top](#timely)

---

## ✨ Core Features

This section outlines the project's current features, covering both the frontend (what users see and interact with) and the backend (the behind-the-scenes system that handles data and logic).

### Frontend

- **What it does**: The frontend is the interface users interact with. It allows users to:
    - Manage their Calendar (create, edit, and view events).
    - Interact with a chatbot (create events).
    - Work with Groups (interact with shared calendars or plans for a group of people).
    - Set up and monitor Saving Plans (track financial goals or progress).
- **Design priorities**:
    - **Responsiveness**: Ensures the interface looks and works smoothly across both desktop and mobile devices, with extra attention to mobile usability.
    - **Templates feature**: Includes pre-made event layouts like "Wedding" that users can customize (e.g., add details for "Food," "Host," "Participants").
    - **Technical base**: The frontend is built using modern frameworks (Next.js, React) to keep the web-app lightweight, fast, and scalable.

### Backend

- **What it does**: Acts as the brain of the platform, ensuring the frontend works seamlessly by:
    - Handling data requests (saving or retrieving user data).
    - Managing user authentication securely (e.g., logging in and verifying users).
    - Interacting with the database to store and fetch information about calendars, templates, groups, and saving plans.
- **Security**:
    - User authentication uses secure services like AWS Cognito.
    - Data is stored safely using cloud-based database solutions like AWS RDS.

### Cloud Computing

- **Why it's used**: To ensure the app is scalable, always available, and capable of handling user data without performance issues.
- **Current Cloud Setup**:
    - Stores user and app data in a reliable database (AWS RDS).
    - Provides hosting for the app's backend (AWS EC2) and frontend (deployment platform AWS Amplify).
    - Securely manages user sessions and authentication.
- **Services Used**:
    - AWS RDS – for managing relational database operations and storing structured user data.
    - AWS EC2 – to host and run backend services with full control over the environment.
    - AWS Amplify – for seamless frontend deployment, CI/CD, and environment management.
    - AWS Cognito – for secure user authentication, authorization, and session management.
    - Amazon VPC – to isolate and control networking for the app with subnets and IP ranges.
    - Security Groups – to define inbound and outbound traffic rules for EC2 instances.
    - Route Tables – to manage traffic routing within the VPC and between subnets.
    - Amazon API Gateway – to expose RESTful endpoints and efficiently manage API traffic.
    - Amazon CloudWatch – to monitor logs, metrics, and system performance.
    - IAM (Identity and Access Management) – to enforce granular access controls across AWS services.

### Architecture Diagram

![Diagram](https://github.com/user-attachments/assets/0e5f4298-f0db-43eb-b513-418b30423f66)

[🔝 Back to top](#timely)

---

## 🎨 Frontend Overview

### What It Does

The frontend is the user-facing component built with Next.js and React. It allows users to:

- Manage their calendars (create, edit, view events)
- Interact with group plans and shared calendars
- Set up and monitor saving plans for financial goals

### Design Priorities

- **Responsiveness**: Optimized for desktop and mobile.
- **Celebration Plan Feature**: Pre-made customizable event layouts
- **Modern Frameworks**: Built using Next.js and React for performance and scalability.

### State Management with Redux

Redux is used to centralize the app's data, making it easier to share and update information across components. States represent the current condition of the app (like user info or UI settings) and change in response to user actions or API calls.

#### `state` Folder

This folder organizes the app's state management and API integration.

1.  **`api.ts`**
    -   Manages API calls using `@reduxjs/toolkit/query`.
    -   Defines endpoints for each resource (e.g., users, groups, events).
    -   Automatically generates hooks for each API endpoint (e.g., `useGetUsersQuery`, `useCreateUserMutation`).
    -   Example: `getUsers` fetches a list of users; `createUser` sends new user data to the backend.

2.  **`index.ts`**
    -   Manages the global UI state using `createSlice`.
    -   Handles states like whether the sidebar is collapsed or if dark mode is enabled.
    -   Example: `setIsSidebarCollapsed` action toggles the sidebar state.

3.  **`interface.ts`**
    -   Defines TypeScript interfaces for data structures used throughout the frontend.
    -   Ensures type safety and alignment with the backend's Prisma schema.
    -   Example: `User` interface represents a user object (ID, name, email, etc.).

[🔝 Back to top](#timely)

---

## ⚙️ Backend Overview

### What It Does

The backend, built with Node.js and Express.js, serves as the engine of the platform by:

- Handling data requests (saving, retrieving, and manipulating user data)
- Managing authentication and session validation
- Interacting with the PostgreSQL database via the Prisma ORM

### Key Components

1.  **Prisma ORM**:
    -   An Object-Relational Mapping tool that simplifies database interactions.
    -   Provides a type-safe API for querying and manipulating the PostgreSQL database (hosted on AWS RDS).
    -   Manages database schema migrations and updates.

2.  **Controllers**:
    -   Contain the business logic for handling API requests and generating responses.
    -   Interact with Prisma to perform CRUD (Create, Read, Update, Delete) operations on the database.
    -   Keep the codebase modular by separating endpoint logic.
    -   Example: `getCalendars` fetches all calendars and related data (events, user, group); `getCalendar` fetches a specific calendar by ID.

3.  **Routes**:
    -   Map specific API endpoints (e.g., `/calendar`, `/event`) to their corresponding controller functions.
    -   Act as the entry point for API requests, directing them to the appropriate controller logic.
    -   Example: `router.get("/")` in `calendarRoutes.ts` maps to the `getCalendars` controller; `router.get("/:id")` maps to `getCalendar`.

4.  **`index.ts`**:
    -   The main entry point for the server application.
    -   Initializes the Express app, sets up middleware (like CORS, body parsing).
    -   Imports and integrates all route modules (e.g., `calendarRoutes`, `eventRoutes`).
    -   Defines the server's home route (`/`) and starts the server listening on the configured port.

### Example Route Handlers

- `POST`: Create/update events, groups, or saving plans.
- `GET`: Fetch calendars, events, and financial plans.
- `DELETE`: Remove user-related data.

[🔝 Back to top](#timely)

---

## 📁 Client Folder Structure

```bash
Timely/
└── client/
    ├── next                # Next.js framework files (build outputs, cache)
    ├── node_modules        # Project dependencies for the client application
    ├── public              # Static assets (images, fonts, icons) directly accessible via URL
    ├── src/
    │   ├── app/            # Core application: pages, layouts, global styles
    │   │   ├── add-template/page.tsx     # Page for adding new event templates
    │   │   ├── calendar/page.tsx         # Main calendar view page
    │   │   ├── groups/page.tsx           # Page for managing user groups
    │   │   ├── savingPlans/page.tsx      # Page for managing saving plans
    │   │   ├── settings/page.tsx         # User settings page
    │   │   ├── dashboardWrapper.tsx      # Wrapper component providing layout for dashboard pages
    │   │   ├── global.css                # Global CSS styles applied across the application
    │   │   ├── layout.tsx                # Root layout component for the application
    │   │   ├── page.tsx                  # Home page or landing page component
    │   │   ├── redux.tsx                 # Redux store setup and provider configuration
    │   ├── components/     # Reusable UI components shared across different pages
    │   │   ├── CalendarComponent/page.tsx # The main interactive calendar component
    │   │   ├── Modal/page.tsx            # Reusable modal component
    │   │   ├── Navbar/page.tsx           # Top navigation bar component
    │   │   ├── Sidebar/page.tsx          # Side navigation bar component
    │   ├── state/          # Redux state management logic and API integration
    │       ├── api.ts                    # Redux Toolkit Query API slice definition (endpoints, base query)
    │       ├── index.ts                  # Redux global state slice (e.g., UI state like dark mode)
    │       ├── interface.ts              # TypeScript interfaces defining data shapes (aligns with backend)
    ├── .env                 # Environment variables for the client (API keys, base URLs)
    ├── .eslintrc.json       # ESLint configuration for code linting rules
    ├── .prettierrc          # Prettier configuration for code formatting rules
    ├── next-env.d.ts        # TypeScript definitions for Next.js environment
    ├── next.config.ts       # Next.js framework configuration file
    ├── package-lock.json    # Exact dependency versions lockfile
    ├── package.json         # Lists client dependencies and scripts
    ├── postcss.config.mjs   # PostCSS configuration (used by Tailwind CSS)
    ├── tailwind.config.ts   # Tailwind CSS theme and plugin configuration
    ├── tsconfig.json        # TypeScript compiler options for the client
```

[🔝 Back to top](#timely)

---

## 📂 Server Folder Structure

```bash
Timely/
└── server/
    ├── dist                 # Compiled JavaScript output from TypeScript source
    ├── node_modules         # Project dependencies for the server application
    ├── prisma/              # Prisma ORM configuration and related files
    │   ├── migrations/      # Database migration history files generated by Prisma Migrate
    │   ├── seedData/        # JSON files containing initial data for seeding
    │   │   ├── auditLog.json
    │   │   ├── calendar.json
    │   │   └── ...          # Other seed data files
    │   ├── schema.prisma    # Prisma schema file defining database models and relations
    │   ├── seed.ts          # Script to populate the database with initial seed data
    ├── src/
    │   ├── controllers/     # Request handling logic for different resources (e.g., users, events)
    │   │   ├── calendarController.ts
    │   │   ├── eventController.ts
    │   │   └── ...          # Other controller files
    │   ├── middleware/      # Custom middleware functions (e.g., authentication, logging)
    │   ├── routes/          # API route definitions mapping endpoints to controllers
    │   │   ├── calendarRoutes.ts
    │   │   ├── eventRoutes.ts
    │   │   └── ...          # Other route definition files
    │   ├── utils/           # Utility functions shared across the server codebase
    │   ├── index.ts         # Main server entry point: initializes Express, middleware, routes
    ├── .env                 # Environment variables for the server (database URL, ports, secrets)
    ├── ecosystem.config.js  # PM2 process manager configuration for deployment
    ├── package-lock.json    # Exact dependency versions lockfile
    ├── package.json         # Lists server dependencies and scripts
    ├── tsconfig.json        # TypeScript compiler options for the server
```

[🔝 Back to top](#timely)

---

## 🌐 Networking & VPC (AWS Setup Example)

Timely utilizes a secure and scalable Virtual Private Cloud (VPC) setup on AWS.

-   **VPC (`pm_vpc`)**: Provides an isolated network environment.
    -   `IPv4 CIDR`: `10.0.0.0/16` (Defines the private IP address range for the VPC)
-   **Subnets**: Isolated sections within the VPC for organizing resources.
    -   **Public Subnet (`pm_public-subnet-1`)**: Resources can have direct access to the internet.
        -   `CIDR block`: `10.0.0.0/24`
        -   Typically hosts resources like the EC2 instance running the backend server.
    -   **Private Subnets (`pm_private-subnet-1`, `pm_private-subnet-2`)**: Resources do not have direct internet access, enhancing security. Deployed across multiple Availability Zones (AZs) for high availability.
        -   `CIDR block (1)`: `10.0.1.0/24`
        -   `CIDR block (2)`: `10.0.2.0/24`
        -   Typically hosts the RDS PostgreSQL database instance.
-   **Internet Gateway (`igw-xxxxxxxx`)**: Allows resources in public subnets to communicate with the internet. Attached to the VPC.
-   **NAT Gateway (Optional but Recommended)**: Placed in a public subnet, allows resources in private subnets to initiate outbound connections to the internet (e.g., for fetching updates) without allowing inbound connections.
-   **Route Tables**: Control the flow of traffic within the VPC.
    -   **Public Route Table (`pm_public-route-table-1`)**: Associated with public subnets.
        -   Route `0.0.0.0/0` -> `Internet Gateway`: Directs internet-bound traffic to the IGW.
    -   **Private Route Tables (`pm_private-route-table-1`, `pm_private-route-table-2`)**: Associated with private subnets.
        -   Route `0.0.0.0/0` -> `NAT Gateway` (if used): Directs internet-bound traffic from private subnets through the NAT Gateway.
        -   Includes routes for local VPC traffic.
-   **Security Groups**: Act as virtual firewalls controlling inbound and outbound traffic for resources like EC2 instances and RDS databases.
    -   `pm_ec2-sg`: Allows inbound traffic on necessary ports (e.g., 80/443 for HTTP/S, 22 for SSH) from specific sources (like your IP or anywhere, depending on needs). Allows outbound traffic as needed.
    -   `pm_rds-sg`: Allows inbound traffic on the database port (e.g., 5432 for PostgreSQL) only from trusted sources, typically the EC2 instance's security group (`pm_ec2-sg`). Restricts outbound traffic.
-   **Network ACLs (NACLs)**: Optional stateless firewall layer for subnets, providing an additional layer of security (can be used for blacklisting specific IPs).

[🔝 Back to top](#timely)

---

## 🤖 DeepSeek Chatbot Integration

-   **What it does**: Allow users to create calendar events using natural language input.
    -   Example: User inputs `"I have work from 9am-5pm and then dinner from 8pm-9pm"`.
    -   An integrated chatbot (DeepSeek) parses this text, extract event details (title, start time, end time), and interact with the backend API to create these events in the user's calendar.

[🔝 Back to top](#timely)

---

## 🚀 Deployment

### AWS EC2 Instance

The backend server is hosted on an AWS EC2 instance, providing:
- Scalable compute capacity in the cloud
- Secure hosting environment with configured security groups
- Easy integration with other AWS services
- Cost-effective solution for hosting Node.js applications

### PM2 Process Manager

PM2 is used to manage the Node.js application in production:
- **Process Management**: Keeps the application running continuously
- **Auto-restart**: Automatically restarts the server if it crashes
- **Load Balancing**: Can run multiple instances of the app for better performance
- **Monitoring**: Provides real-time monitoring of application metrics
- **Log Management**: Manages application logs effectively

**Monitoring**:
   - Use PM2 to monitor application health
   - Set up automatic restarts
   - Configure log rotation

[🔝 Back to top](#timely)

---

## 📄 License

Copyright (c) 2025 Sebastian Bastida Marin

All rights reserved.

This code is proprietary and confidential. No permission is granted to use, copy, modify, or distribute this code, in whole or in part, for any purpose without explicit written permission from the author.

[🔝 Back to top](#timely)
