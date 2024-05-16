# EduPulse-Online Learning Management System With Microservices Architecture

EduPulse is a modern e-learning platform designed to enhance online education through a microservices architecture. The platform provides a seamless interface for learners to browse, enroll in, and access courses, while offering robust tools for instructors and administrators to manage course content and student progress.

## Features

- **User Management**: User registration, authentication, and profile management.
- **Course Management**: Manage course information, content, enrollment, and progress tracking.
- **Payment Integration**: Process payments using Stripe.
- **Email Notifications**: Send email notifications via Mailgun.
- **Responsive Design**: User-friendly interface supporting various devices.
- **Role-Based Access**: Different roles (learner, instructor, admin) with specific permissions and functionalities.


## Architecture Overview

The architecture of EduPulse is designed as a set of microservices, each responsible for a specific domain within the platform. The main microservices include:

Each microservice is containerized using Docker for easy deployment and scalability. Communication between microservices is established via RESTful API endpoints.

## Components

### User Management
- Provides APIs for user registration, login, and profile management.
- Utilizes MongoDB as the database for storing user data.
- Dockerized and deployed as a separate microservice.

### Course Management
- Manages course information, content, and enrollment.
- Integrates with MongoDB for storing course data.
- Utilizes Docker for containerization.

### Payment Management
- Integrates with Stripe payment service for processing course payments.
- Communicates with the Course Management microservice to handle enrollments.
- Dockerized for easy deployment and scalability.

### Email Service
- Utilizes Mailgun for sending email notifications to users.
- Communicates with other microservices to trigger email notifications.
- Dockerized and deployed as a standalone service.

## Deployment

The entire EduPulse platform can be deployed using Docker Compose, which orchestrates the deployment of all microservices and their dependencies. Each microservice is configured with environment variables for port binding, database connection, and API keys.

To deploy the platform locally, follow these steps:
1. Clone the repository.
2. Navigate to the root directory of the project.
3. Run `docker-compose up` to start all services.
4. Access the services through their respective ports.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe Account](https://stripe.com/)
- [Mailgun Account](https://www.mailgun.com/)

## Contributing

Contributions to EduPulse are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request. Be sure to follow the project's coding conventions and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

