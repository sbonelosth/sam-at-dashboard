# Smart Asset Management System

## Project Overview
The Smart Asset Management System is a web application designed to track assets using barcode scanning. Users can check availability and virtually borrow assets in real-time. This project was created to help organizations prevent theft by monitoring the check-in and check-out of assets.

## Features
- **Asset Tracking**: Keep track of assets in real-time.
- **Barcode Scanning**: Scan asset barcodes for easy identification.
- **Borrowing System**: Users can check out and return assets via the system.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: MongoDB Database


## Project Architecture
The project consists of both cloud and hardware components:
1. **Cloud Architecture**:
   - IoT devices collect data and send it via an MQTT gateway to cloud storage.
   - The cloud processes and stores the data for analytics and reporting.
2. **Hardware Design - Perception Layer**:
   - RFID scanning activity for asset identification.
   - System GUI with a camera module for additional tracking.
   - Asset barcode scanning interface for asset check-in/out.

## Deployment
The project was deployed on GitHub, but it is currently not functional. Future updates may include bug fixes and additional feature enhancements.

## Video Demonstration
[![Watch the Project Video](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](SAM video.mp4)

## Contributors
This project was a group effort, and the following members contributed to its success:
- **[Sbonelo Dube](https://www.linkedin.com/in/sbonelodube/)**
- **[Calen Joshua Singh](https://www.linkedin.com/in/calen-joshua-singh-137783177/)**
- **[Asanda Ngcobo](https://www.linkedin.com/in/asanda-ngcobo-5418902bb/)**
- **[Khawulela Mpono](https://www.linkedin.com/in/khawulela-mpono-9a7744163/)**

## Screenshots
![Cloud Architecture](sam.png)
![Hardware Design](sam2.png)

## Future Enhancements
- Improve system efficiency and performance.
- Implement a mobile-friendly interface.
- Enhance security measures for asset tracking.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.
