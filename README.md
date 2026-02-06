🎬 Movie Discovery App

A React Native mobile application built with Expo that allows users to discover popular movies, search movies, view detailed information (cast & reviews), and submit reviews with image attachments.

🛠 Tech Stack

React Native
Expo
Expo Router
Axios
TMDB API
Expo Image Picker
EAS Build

🔑 Environment Setup

Create a .env file in the project root:
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
For production APK builds, the API key is configured using EAS environment variables.

▶️ Run Locally
npm install
npx expo start

Open using Expo Go on a real device.

📦 APK Build (Android)
The APK is generated using Expo EAS Build.
eas build -p android --profile preview
Build type: APK
Signing handled via Expo remote keystore

🌐 APIs Used (TMDB)

/movie/popular
/search/movie
/movie/{id}
/movie/{id}/credits
/movie/{id}/reviews

TMDB does not support uploading user reviews or images.
The review upload feature is implemented as a mock upload to demonstrate file handling.

Note
TMDB API access may be restricted in certain regions (including India).
While running the project locally or using the APK, please ensure that a VPN is enabled if movie data does not load.
