# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=mydatabase

# Expose PostgreSQL port
EXPOSE 5432

# Start PostgreSQL service
CMD ["postgres", "-p", "6000"]
