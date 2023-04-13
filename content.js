// content.js

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {

        try {
            const appLdJson = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText);
            const postAuthor = appLdJson.author.name;
            const uploadDateObj = new Date(Date.parse(appLdJson.datePublished));
            
            const postImagesObj = appLdJson.image;

            for (let i = 0; i < postImagesObj.length; i++) {

                const imgFilename = constructDownloadedFilename(postAuthor, uploadDateObj);

                // Execute the actual download
                downloadMediaFromPost(postImagesObj[i]['contentUrl'], imgFilename);
            }

        } catch (exception) {
            console.error(`Error using ld+json for Lemon8 extension: ${exception.name}: ${exception.message}`);
            console.log("Falling back to manual HTML scrape approach.");

            const postAuthor = document.getElementsByClassName("info")[0].innerText;

            const postImagesObj = document.getElementsByClassName("sharee-carousel-item current-height");

            for (let i = 0; i < postImagesObj.length; i++) {

                const imgFilename = constructDownloadedFilename(postAuthor, /* uploadDate */ null);

                // Execute the actual download
                downloadMediaFromPost(postImagesObj[i].childNodes[0].src, imgFilename);
            }
        }
    }

      function downloadMediaFromPost(mediaUrl, filenameToSaveAs) {
          chrome.runtime.sendMessage({mediaUrl: mediaUrl, filename: filenameToSaveAs});
      }

      function constructDownloadedFilename(author, uploadDateObj) {
          const today = new Date();

          const timestamp = 'DA_'.concat(today.getFullYear(), today.getMonth() + 1, today.getDate(),
                                  'T', today.getHours(), today.getMinutes(), today.getSeconds());

          function constructDateCreatedString(uploadDateObj) {
            return 'DC_'.concat(uploadDateObj.getFullYear(),
            uploadDateObj.getMonth()+1, // getMonth()'s return value is 0-indexed
            uploadDateObj.getDate(),
            'T', uploadDateObj.getHours(),
            uploadDateObj.getMinutes(),
            uploadDateObj.getSeconds());
          }

          return "lemon8__".concat(author, "__", timestamp, "__", (uploadDateObj == null) ? "" : constructDateCreatedString(uploadDateObj), "_i.jpg");
      }
    } 
  );
