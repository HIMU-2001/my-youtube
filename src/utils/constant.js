export const YOUTUBE_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/2/20/YouTube_2024.svg";

export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&key=" +
  process.env.REACT_APP_YOUTUBE_API_KEY;

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=";

export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?";
export const CHANNEL_LOGO =
  "https://images-platform.99static.com//jvtXzkRQ7zM5DMQN9cNFaTy4fAo=/155x142:655x642/fit-in/500x500/99designs-contests-attachments/80/80823/attachment_80823213";

export const USER_AVATAR =
  "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg";

export const commentsData = [
  {
    name: "Sara Claire",
    text: "Came for the thumbnail, stayed for the content 😅",
    replies: [
      {
        name: "Alex Cook",
        text: "This is going straight to my favorites 💯",
        replies: [],
      },
      {
        name: "Same Baker",
        text: "Back here again, this never gets old 😌",
        replies: [],
      },
      {
        name: "Manuel Shaw",
        text: "Can’t believe this is free content 😳",
        replies: [
          {
            name: "Ryan Smith",
            text: "Randomly recommended, and I’m glad it was 🙌",
            replies: [],
          },
          {
            name: "Alex Cook",
            text: "This is going straight to my favorites 💯",
            replies: [
              {
                name: "Alex Cook",
                text: "This is going straight to my favorites 💯",
                replies: [],
              },
              {
                name: "Same Baker",
                text: "Back here again, this never gets old 😌",
                replies: [],
              },
              {
                name: "Manuel Shaw",
                text: "Can’t believe this is free content 😳",
                replies: [],
              },
            ],
          },
          {
            name: "Same Baker",
            text: "Back here again, this never gets old 😌",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Ryan Smith",
    text: "Randomly recommended, and I’m glad it was 🙌",
    replies: [],
  },
  {
    name: "Alex Cook",
    text: "This is going straight to my favorites 💯",
    replies: [],
  },
  {
    name: "Same Baker",
    text: "Back here again, this never gets old 😌",
    replies: [],
  },
  {
    name: "Manuel Shaw",
    text: "Can’t believe this is free content 😳",
    replies: [],
  },
];
