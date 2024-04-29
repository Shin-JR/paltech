# PALTECH WEB APP

Aplicación Web diseñada para posicionar geofences y marcas en un mapa.

## DEMO:

[Paltech Web App](https://paltech-test.netlify.app/)

## Setup

To run this application, ensure that you have the necessary tools and technologies installed:

- Node.js
- Git
- npm, pnpm, yarn or bun (I used pnpm).

Clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/Shin-JR/paltech.git
```

Then, install the dependencies and run the application:

- Install the dependencies used.

```bash
pnpm install
```

- Run the application in development mode.

```bash
pnpm run dev
```

## Concept Questions

### What approach would you use to maintain the described functionalities offline (e.g. display the map)?

To maintain the described functionalities offline, it is crucial to have the ability to load and display a map without an Internet connection. This implies having access to map data stored locally on the device or using technologies that enable offline map visualization, such as pre-downloaded maps or vector maps.

In addition to the capability to display an offline map, it is important to ensure that all dependencies and resources necessary for the application's operation are available locally on the device. This includes code files, third-party libraries, images, CSS styles, and any other resources used by the application. To achieve this, all dependencies must be installed and configured during the development of the application, ensuring that the application does not rely on external resources that require an Internet connection.

Furthermore, it is possible to consider strategies for local storage to preserve important application data, such as geofence information, markers, and other settings. This could be achieved by using local databases on the device.

### Suppose that when starting a mission, the selected geofence and its markers must be loaded into the robot, so it is a process that occurs in the backend of your application. This process can take several seconds or even more than a minute. How do you prevent the frontend from blocking (commonly known as freezing) while the backend finishes processing the instruction?.

First and foremost, it's essential to develop a robust application that handles various scenarios that may arise during its use and operation. This includes proper error handling, such as timeouts or system failures.

Additionally, for a positive user experience, it's crucial to display an indication of progress or activity on the screen when awaiting a process. This is required because it provides a better user experience and prevents the user from leaving the platform.

Furthermore, one approach to prevent freezing is to implement a mechanism in the backend where a process A informs about the progress of another process B. The frontend can then continuously query process A to obtain metrics that can be displayed to the user. This way, the frontend can monitor the progress of the awaited process and update the user interface accordingly, preventing it from becoming unresponsive and enhancing user engagement.

It's also worth considering implementing techniques such as asynchronous processing or background tasks in the backend to minimize the impact on frontend responsiveness. These techniques allow the frontend to continue functioning while the backend processes the instruction in the background

Finally, one possible option to prevent freezing is to enable a process in the backend (Process A) to provide updates on the progress of another process (Process B). The frontend can continuously query Process A for updates on the progress of the awaited process, obtaining metrics that can be displayed in the user interface. This allows us to monitor the progress of the awaited process from the frontend, ensuring it doesn't become unresponsive. By delivering this information to the user, we enhance the user experience and provide value-added feedback.
