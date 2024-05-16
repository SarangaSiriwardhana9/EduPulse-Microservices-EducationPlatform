# EduPulse - Microservices Architecture

EduPulse is an educational platform built using microservices architecture. It offers a wide range of courses to learners, allowing them to browse, enroll, and access courses conveniently. This README provides an overview of the project structure and its components.

## Architecture Overview

The architecture of EduPulse is designed as a set of microservices, each responsible for a specific domain within the platform. The main microservices include:

- **User Management**: Handles user registration, authentication, and profile management.
- **Course Management**: Manages course information, content, enrollment, and progress tracking.
- **Payment Management**: Integrates with Stripe payment service for processing course payments.
- **Email Service**: Utilizes Mailgun for sending email notifications to users.

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

## Contributing

Contributions to EduPulse are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request. Be sure to follow the project's coding conventions and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

