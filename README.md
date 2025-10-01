# my-youtube

A highly scalable, fast-loading, and performant video streaming platform built with **React JS**, **Webpack**, and **Tailwind CSS**, leveraging real-time YouTube data.

## Features

- **Optimized Search:** Implements debouncing and caching using a Redux store to minimize network calls and improve performance.
- **Nested Comments:** Supports n-level nested comments, providing a structured discussion experience.
- **Live Comments:** Real-time comment updates for an engaging user experience.
- **Custom Shimmer Effects:** Smooth loading animations for videos and content to enhance UX.
- **Routing:** Seamless navigation using `react-router-dom`.

## Tech Stack

- **Frontend:** React JS, Tailwind CSS, Webpack
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **APIs:** YouTube Data API

## How it Works

1. **Search Functionality:** Type in the search bar to fetch real-time YouTube videos with optimized network calls.
2. **Video Playback:** Click a video to view it in a responsive player.
3. **Comments:** View nested comments and participate in live chat interactions.
4. **Loading UX:** Experience shimmer animations while content is loading.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your YouTube API key in `.env` file as `REACT_APP_YOUTUBE_API_KEY`.
4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000] in your browser.

## Acknowledgements

This project is inspired by **YouTube**, focusing on replicating the core functionalities with performance and UX in mind.
If you want, I can also make a **more visually rich version** with badges, GIFs of shimmer effects, and a **demo section** that will make your README stand out for portfolio purposes.

Do you want me to do that?
