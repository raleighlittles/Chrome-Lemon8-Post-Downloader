# Background


# About

This is a Chrome extension for downloading [Lemon8](https://en.wikipedia.org/wiki/Lemon8) posts. Lemon8 is a social media application similar to Instagram, but owned by TikTok.

# Installation

1. Go to the main Chrome Extensions page: chrome://extensions/

2. Click "Load unpacked":

![adding-extension-screenshot](./docs/adding-extension-to-chrome.png)

3. Point to the directory where you cloned this repo.

# Usage/Features

Navigate to a specific Lemon8 post's page, e.g: `https://www.lemon8-app.com/doktoradreamer/7154627074488140289` then click the "Lemon8 Post Downloader" in your browser actions toolbar:

![screenshot-of-usage](./docs/browser-action-example.png)

Downloaded images/video contain the following in the filename, if available:

1. The uploader's username
2. The date the post was uploaded
3. The date the post was downloaded

![screenshot-of-saved-file](./docs/saved-image-results.png)

# Features roadmap

- [ ] Add support for parsing date uploaded 