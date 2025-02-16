

# Quick Polling App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a full-stack application that allows users to create polls, vote on them, and view live results in real-time using **Server-Sent Events (SSE)**.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or any MongoDB instance)
- Vercel account (for deployment)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quick-polling-app.git
   cd quick-polling-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/quick-polling-app?retryWrites=true&w=majority"
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

---

## Features
- **Create Polls**: Users can create polls with a question and multiple options.
- **Vote on Polls**: Users can vote on active polls.
- **Live Results**: Poll results update in real-time using Server-Sent Events (SSE).
- **Full-Stack**: Built with Next.js, Prisma, and MongoDB for a seamless experience.

---

## API Endpoints

### 1. Polls (`/api/polls`)
- **GET `/api/polls`**:
  - Fetch all polls.
  - **Response**:
    ```json
    [
      {
        "id": "poll-id-1",
        "question": "What's your favorite programming language?",
        "options": [
          { "text": "Python", "votes": 10 },
          { "text": "JavaScript", "votes": 5 }
        ]
      }
    ]
    ```

- **POST `/api/polls`**:
  - Create a new poll.
  - **Request Body**:
    ```json
    {
      "question": "What's your favorite programming language?",
      "options": ["Python", "JavaScript", "Java"]
    }
    ```
  - **Response**:
    ```json
    {
      "id": "poll-id-1",
      "question": "What's your favorite programming language?",
      "options": [
        { "text": "Python", "votes": 0 },
        { "text": "JavaScript", "votes": 0 },
        { "text": "Java", "votes": 0 }
      ]
    }
    ```

### 2. Single Poll (`/api/polls/[id]`)
- **GET `/api/polls/:id`**:
  - Fetch a single poll by ID.
  - **Response**:
    ```json
    {
      "id": "poll-id-1",
      "question": "What's your favorite programming language?",
      "options": [
        { "text": "Python", "votes": 10 },
        { "text": "JavaScript", "votes": 5 }
      ]
    }
    ```

### 3. Vote on a Poll (`/api/polls/[id]/vote`)
- **POST `/api/polls/:id/vote`**:
  - Submit a vote for a specific poll.
  - **Request Body**:
    ```json
    {
      "option": "Python"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Vote recorded successfully"
    }
    ```

### 4. Live Results (`/api/polls/[id]/results`)
- **GET `/api/polls/:id/results`**:
  - Stream live results using Server-Sent Events (SSE).
  - **Response** (streamed every 5 seconds):
    ```json
    [
      { "text": "Python", "votes": 10 },
      { "text": "JavaScript", "votes": 5 }
    ]
    ```

---

## Database Schema

The database uses MongoDB with the following schema:

### 1. **Poll**
```prisma
model Poll {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  question  String
  options   Option[]
  createdAt DateTime  @default(now())
}
```

### 2. **Option**
```prisma
model Option {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  text    String
  votes   Int      @default(0)
  poll    Poll     @relation(fields: [pollId], references: [id])
  pollId  String   @db.ObjectId
}
```

---

## Deployment

### Deploy to Vercel
The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add the `DATABASE_URL` environment variable in Vercel’s settings.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Learn More

To learn more about the technologies used in this project, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - Learn how to use Prisma with MongoDB.
- [MongoDB Documentation](https://www.mongodb.com/docs/) - Learn about MongoDB and its features.
- [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) - Learn how SSE works for real-time updates.

You can also check out the [Next.js GitHub repository](https://github.com/vercel/next.js) for contributions and feedback.
