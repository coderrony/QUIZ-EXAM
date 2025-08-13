> 🚧 **Work in Progress:** This application is still being developed. I’m actively working on it and regularly adding new features and improvements.


# Quiz Exam – A Quiz Generation Platform for Recruiters

## Overview
Quiz Exam is a full-featured quiz creation and evaluation system built for internal interviews. It allows admins to create quizzes based on different positions and send tests to candidates via email. The platform supports both automatic and manual grading.

## Features

### 🛠️ Admin Panel
- Create job positions (e.g., *Frontend Intern*, *Junior Node Developer*)
- Build quizzes for each position with one or more groups:
  - Each group can include:
    - Multiple Choice Questions (MCQ) – with single/multiple correct answers
    - Open-ended text-based questions
- Mark correct answers for MCQs

### 🧪 Test Creation
- Create a test based on an existing quiz
- Customize:
  - Test name and date
  - Select questions from quiz groups
  - Set test duration (e.g., 30 minutes)
- Timer starts when candidate begins test
- Auto-submit when timer expires

### 👤 Candidate Assignment
- Assign tests to candidates by name and email
- Auto-generate or manually assign login credentials
- Resend credentials via email

### 🧑‍💻 Test Taker Interface
- Secure login with provided credentials
- View assigned tests
- Answer questions and submit within time
- Auto-submission when time ends

### 📝 Result Evaluation
- Automatic scoring for MCQs
- Manual review for open-ended answers
  - Accept / Reject / Assign partial marks
- View detailed test result reports per candidate

## 🛠 Tech Stack
- **Next.js** – App Router-based React framework with support for SSR and SSG
- **Prisma** – Type-safe ORM for interacting with the database
- **PostgreSQL** – Relational database (integrated via Prisma)
- **NextAuth.js** – Authentication library supporting credentials and OAuth providers
- **Zod** – Schema-based validation for forms and APIs
- **React Hook Form** – Performant form handling and validation
- **Tailwind CSS** – Utility-first CSS framework for building modern UIs
- **shadcn/ui** – Beautifully designed, accessible components built with Tailwind CSS
- **Resend** – Email sending service for delivering test credentials and notifications
  
## 🌐 Live Demo

You can explore the live project here:

🔗 [https://quiz-exam-iota.vercel.app](https://quiz-exam-iota.vercel.app)

## 🗂️ Application Architecture

Here’s a visual diagram of the application's structure:

![Quiz Exam Architecture](https://res.cloudinary.com/drtqzfefz/image/upload/v1754046775/quiz_exam_diagram___Mermaid_Chart_jwqt8u.png)


