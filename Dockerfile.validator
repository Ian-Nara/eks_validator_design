# Base Image
FROM amazonlinux:2023

# Working Directory
WORKDIR /app

# Copy your Python server file to the image
COPY validator.py .

# Expose the port used by your server
EXPOSE 8085

# Command to run when the container starts
CMD [ "python3.9", "/app/validator.py" ]