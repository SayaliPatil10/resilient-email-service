# Resilient Email Service 📬

Welcome to the **Resilient Email Service** repository!  
This project was built as part of the **PearlThoughts Backend Developer Challenge**, with a focus on creating a fault-tolerant and scalable email delivery backend using JavaScript.

---

## 📚 Table of Contents
- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Usage](#api-usage)
- [Development & Deployment](#development--deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🔍 Project Overview

This service is designed to send emails in a **reliable and efficient** manner. It integrates essential backend engineering concepts like:
- Retry mechanisms with backoff
- Provider fallback
- Request idempotency
- Rate limiting
- Status tracking

The goal is to ensure that emails are sent exactly once, even in the face of failure or high traffic.

---

## 🚀 Core Features

✅ **Retry with Exponential Backoff**  
✅ **Fallback to Secondary Email Provider**  
✅ **Idempotent Email Sending (No Duplicates)**  
✅ **Basic Rate Limiting**  
✅ **Status Tracking by Email ID**  

**Bonus Implementations:**
- 🧯 Circuit Breaker Pattern  
- 📜 Simple Logging  
- 📥 Queuing System (In-Memory Simulation)

---

## 🛠️ Tech Stack

- **Node.js** – Server-side JavaScript
- **Express** – REST API Framework
- **UUID** – For idempotency keys
- **In-Memory Store** – For status tracking and logging

> This project uses mock email providers — no actual emails are sent.

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SayaliPatil10/resilient-email-service.git
cd resilient-email-service


2. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure AWS Credentials**:
   Ensure you have your AWS credentials set up. You can do this by configuring the AWS CLI:
   ```bash
   aws configure
   ```

4. **Deploy the Service**:
   Use AWS SAM to deploy the service:
   ```bash
   sam deploy --guided
   ```

5. **Test the Service**:
   You can test the service using Postman or curl. Make a POST request to the API Gateway endpoint with the required email data.

## Usage

After deploying the service, you can use the API to send emails. Here’s a quick guide on how to make a request:

### Send Email

**Endpoint**: `POST /send-email`

**Request Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is a demo message."
}
```

**Example Request**:
```bash
curl -X POST https://your-api-gateway-url/send-email \
-H "Content-Type: application/json" \
-d '{"to": "recipient@example.com", "subject": "Test Email", "body": "This is a demo message."}'
```

### Check Status

You can check the status of sent emails using the following endpoint:

**Endpoint**: `GET /email-status/{emailId}`

Replace `{emailId}` with the actual ID returned when you sent the email.

## Contributing

We welcome contributions! If you would like to contribute to this project, please follow these steps:

1. **Fork the Repository**: Click on the "Fork" button at the top right of this page.
2. **Create a Branch**: Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make Changes**: Make your changes in your local repository.
4. **Commit Changes**: Commit your changes with a descriptive message.
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push to GitHub**: Push your changes to your forked repository.
   ```bash
   git push origin feature/YourFeature
   ```
6. **Create a Pull Request**: Go to the original repository and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or inquiries, feel free to reach out:

GitHub: 

Email: sayalipatil152209@example.com

For the latest updates and releases, visit the [Releases](https://github.com/SayaliPatil10/resilient-email-service) section.

Thank you for checking out the PearlThoughts Email Service Challenge! Your feedback and contributions are appreciated.
