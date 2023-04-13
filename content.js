// content.js

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {

          const isUserLoggedIn = (document.querySelector("html").classList[1] !== "not-logged-in");
          
          if (isUserLoggedIn) {

            // If the poster is "verified", the string '\nVerified' will be included in this query, so remove it later
            // TODO: Why does this sometimes not work?
            const uploaderUsername = document.getElementsByClassName('_aaqt')[0].innerText;

            // Looks like: 2022-08-07T20:04:25.000Z
            const timestampUploaded = new Date(document.getElementsByClassName('_aaqe')[0].dateTime);

			const mediaCounterElement = document.getElementsByClassName('_acay');
			
			var numMediaInPost;
			
            if (mediaCounterElement.length == 0) { // When there is a post with a single image, there is no media counter element (why?)
				numMediaInPost = 1;
			}
			
			else {
				numMediaInPost = mediaCounterElement[0].childElementCount;
			}

            for (var i=0; i < numMediaInPost; i++) {

                const rawImageUrl = document.getElementsByClassName('_aagv')[i].children[0].src;

                console.log("Downloading media from ", rawImageUrl);

                downloadMediaFromPost(rawImageUrl, constructDownloadedFilename((uploaderUsername == null) ? "unknown" : uploaderUsername.split("\n")[0], timestampUploaded, "img"));      
            }

            
        }
        else {
            // TODO: Test if extension still requires login
            console.error("Extension can't function unless user is logged in");
        }
    }

      function downloadMediaFromPost(mediaUrl, filenameToSaveAs) {
          chrome.runtime.sendMessage({mediaUrl: mediaUrl, filename: filenameToSaveAs});
      }

      function constructDownloadedFilename(author, uploadDateObj, mediaFmt) {
          const today = new Date();
          const timestamp = 'DA_'.concat(today.getFullYear(), today.getMonth() + 1, today.getDate(),
                                  'T', today.getHours(), today.getMinutes(), today.getSeconds());

          const uploadDate = 'DC_'.concat(uploadDateObj.getFullYear(),
              uploadDateObj.getMonth()+1, // getMonth()'s return value is 0-indexed
              uploadDateObj.getDate(),
              'T', uploadDateObj.getHours(),
              uploadDateObj.getMinutes(),
              uploadDateObj.getSeconds());

          return "instagram__".concat(author, "__", timestamp, "__", uploadDate, (mediaFmt === "vid") ? "_v.mp4" : "_i.jpg");
      }
    } 
  );
