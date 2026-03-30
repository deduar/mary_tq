## ADDED Requirements

### Requirement: Docker Compose configuration exists
The system SHALL have a docker-compose.yml file for containerized development.

#### Scenario: Docker Compose file exists
- **WHEN** developer checks project root
- **THEN** docker-compose.yml file is present
- **AND** defines version "3.8" or higher

#### Scenario: Service configuration
- **WHEN** docker-compose is inspected
- **THEN** service is named "app"
- **AND** container_name is set to "mary-tq-dev"
- **AND** build context is current directory
- **AND** dockerfile is "Dockerfile"

### Requirement: Docker image is properly named and tagged
The system SHALL build with the correct image name and tag.

#### Scenario: Image naming
- **WHEN** Docker image is built
- **THEN** image name is "mary-tq/app"
- **AND** tag is "latest:dev"

### Requirement: Docker network is configured
The system SHALL have a dedicated network for container communication.

#### Scenario: Network configuration
- **WHEN** containers are started
- **THEN** network named "mary-tq-network" is created
- **AND** driver is "bridge"

### Requirement: Volume is configured for live reload
The system SHALL mount project files for development with live reload.

#### Scenario: Volume mount
- **WHEN** container is started with docker-compose
- **THEN** volume maps project root to container working directory
- **AND** changes to source files are reflected immediately
- **AND** node_modules is not overwritten (use anonymous volume or proper path)

### Requirement: Dockerfile exists and configures development environment
The system SHALL have a Dockerfile for building the container image.

#### Scenario: Dockerfile exists
- **WHEN** project is checked
- **THEN** Dockerfile exists in project root
- **AND** base image is Node.js (latest or specific version)
- **AND** working directory is set to /app
- **AND** dependencies are installed
- **AND** ports are exposed (3000 for backend, 5173 for frontend)

#### Scenario: Development dependencies
- **WHEN** container is built
- **AND** package.json includes dev dependencies
- **AND** nodemon or similar is available for auto-restart
