# Login_SignUp_App-React-Native
This is a React Native app that provides user authentication with login and sign-up forms, including email and password validation, "Remember Me" functionality, and password strength indicators.

## How to Run the Project

**Clone the repository:**

   git clone https://github.com/arjunjaver/Login_SignUp_App-React-Native.git

   cd Login_SignUp_App-React-Native

**Install dependencies:**

If you haven't installed Expo CLI, install it using:

npm install -g expo-cli



**Then, install the project dependencies:**

npm install



**Run the app:**
Use the following command to start the Expo project:
npx expo start

Scan the QR code with Expo Go (Android) or the Camera app (iOS)



## Design Choices
- **Formik**: Used for form handling and validation.
- **Yup**: For schema validation to ensure proper email format and password strength.
- **AsyncStorage**: Used for storing the email when the "remember me" checkbox is selected.
- **Expo**: Chosen for easier setup and development of the app.


## Assumptions & Limitations
- The login validation only works with a predefined set of credentials (`admin@gmail.com` and `Admin@12345`).
- The app doesn't store or manage real user data and is intended for demonstration purposes only.
- Limited password strength validation; it checks for uppercase letters, lowercase letters, numbers, and special characters but doesn't offer advanced feedback.
- This app is designed for learning and demonstration.
