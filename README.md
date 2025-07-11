# PearlThoughts Email Service Challenge 🚀

Welcome to the PearlThoughts Email Service Challenge repository! This project is a resilient email delivery backend system developed as part of the PearlThoughts internship challenge. Here, you'll find everything you need to understand, use, and contribute to this email service.

[![Releases](https://img.shields.io/github/release/Ma-r684/pearlthoughts-email-service-challenge.svg)](https://github.com/Ma-r684/pearlthoughts-email-service-challenge/releases)

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Overview

The PearlThoughts Email Service is designed to handle email delivery efficiently and reliably. It uses modern serverless architecture, which allows for scalability and reduced operational overhead. This system integrates various AWS services and implements several design patterns to ensure resilience and performance.

## Features

- **API Gateway**: Provides a unified interface for email delivery requests.
- **AWS Lambda**: Serverless functions that process email sending.
- **AWS SAM**: Simplifies deployment and management of serverless applications.
- **Circuit Breaker**: Protects the system from failures in downstream services.
- **Email Service**: Manages email composition and delivery.
- **Idempotency**: Ensures that repeated requests do not result in duplicate emails.
- **Queue System**: Handles asynchronous email processing.
- **Rate Limiter**: Controls the rate of outgoing emails to prevent abuse.
- **Retry Mechanism**: Automatically retries failed email deliveries.

## Technologies Used

This project utilizes a variety of technologies to ensure a robust email service:

- **Node.js**: The core language for building the backend.
- **Express**: Framework for building the API.
- **AWS Services**: Including Lambda, S3, and DynamoDB.
- **Queue Systems**: Such as Amazon SQS for handling email requests.
- **Database**: DynamoDB for storing email metadata and logs.

## Getting Started

To get started with the PearlThoughts Email Service, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ma-r684/pearlthoughts-email-service-challenge.git
   cd pearlthoughts-email-service-challenge
   ```

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
  "subject": "Hello World",
  "body": "This is a test email."
}
```

**Example Request**:
```bash
curl -X POST https://your-api-gateway-url/send-email \
-H "Content-Type: application/json" \
-d '{"to": "recipient@example.com", "subject": "Hello World", "body": "This is a test email."}'
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

- **GitHub**: [Ma-r684](https://github.com/Ma-r684)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

For the latest updates and releases, visit the [Releases](https://github.com/Ma-r684/pearlthoughts-email-service-challenge/releases) section.

Thank you for checking out the PearlThoughts Email Service Challenge! Your feedback and contributions are appreciated.