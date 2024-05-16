# EduPulse-Online Learning Management System With Microservices Architecture

EduPulse is a modern e-learning platform designed to enhance online education through a microservices architecture. The platform provides a seamless interface for learners to browse, enroll in, and access courses, while offering robust tools for instructors and administrators to manage course content and student progress.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/d5c8cb9f-4c68-4894-b2f8-c468effd585f" alt="Screenshot 2024-05-16 195703" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/7d99fefd-29f4-4d3b-a53d-b1add44c1dcd" alt="Screenshot 2024-05-16 195757" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/f3f9607f-ef97-4b62-ab4f-b72b6c01d013" alt="Screenshot 2024-05-16 200000" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/7701f419-6253-4717-a04e-bb219a59a321" alt="Screenshot 2024-05-16 200101" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/a6d6fd19-850d-4aa5-b8f5-56c0f7cf8b7b" alt="Screenshot 2024-05-16 200132" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/d1585b54-29db-4d76-bccc-983bc180db8b" alt="Screenshot 2024-05-16 200216" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/e7f6b866-12b4-4273-8759-6f7a0cdccbc5" alt="Screenshot 2024-05-16 200247" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/6febc684-daf0-42c5-95f7-9d36ae4118cb" alt="Screenshot 2024-05-16 200330" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/33a50969-4339-495f-9745-ee8ffb4f925d" alt="Screenshot 2024-05-16 201650" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/4ebd1bd0-07b5-47a0-9a12-6dee35057ecb" alt="Screenshot 2024-05-16 201650" />
    </td>
  </tr>
  <tr>
    <td align="center">
       <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/26680fef-218f-42e4-a11c-295e1555c4a8" alt="Screenshot 2024-05-16 201715" />
    </td>
    <td align="center">
      <img src="https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/138cf59a-1f26-4ad3-b02c-0c8be5fa67a2" alt="Screenshot 2024-05-16 201754" />
    </td>
  </tr>
</table>


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

![Screenshot 2024-05-16 213552](https://github.com/SarangaSiriwardhana9/EduPulse-Microservices-EducationPlatform/assets/99233703/33a50969-4339-495f-9745-ee8ffb4f925d)

