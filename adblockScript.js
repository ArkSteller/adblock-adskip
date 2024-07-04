//Additional function to removeAds from youtube - AdBlock Function.
function blockAds() {
  const autoSkipAdsStatus = true;
  if (Boolean(autoSkipAdsStatus) === true) {
    // console.log("Inside BlockAds");
    let hyper = false;
    let originalPlayback;

    function handleAds() {
      // Function to click on the "Skip ad" button
      function clickSkipButton(selector) {
        // Attempt to find the button using the provided selector
        const button = document.querySelector(selector);

        // If the button exists
        if (button) {
          console.log(`Clicked on ${selector}`); // Log the selector being clicked
          button.click(); // Perform the click action
          return true; // Return true indicating the button was clicked
        }

        // If the button does not exist
        return false; // Return false indicating the button was not clicked
      }

      // Try clicking on the skippable ad button
      if (clickSkipButton(".ytp-skip-ad-button")) {
        return; // If the button was clicked, exit the function
      }

      // Try clicking on the modern skippable ad button
      if (clickSkipButton(".ytp-ad-skip-button-modern")) {
        return; // If the button was clicked, exit the function
      }

      // If neither button was found and clicked, the function will end without errors

      // Speed through ads that can't be skipped (yet).
      const adElement = document.querySelectorAll(
        ".video-ads.ytp-ad-module"
      )[0];
      const adActive =
        adElement && window.getComputedStyle(adElement).display !== "none";
      if (adActive) {
        if (!hyper) {
          originalPlayback =
            document.getElementsByTagName("video")[0].playbackRate;
          hyper = true;
        }
        document.getElementsByTagName("video")[0].playbackRate = 6.7;
      } else {
        if (hyper) {
          document.getElementsByTagName("video")[0].playbackRate =
            originalPlayback;
          hyper = false;
        }
      }
    }

    // Initialize and observe changes
    let counter = 0;
    const observer = new MutationObserver((mutations) => {
      // Randomize querySelector
      const playerAdsId = ["#player-ads", "#player_ads"][
        Math.floor(Math.random() * 2)
      ];
      // Remove ads banner.
      if (document.querySelector(playerAdsId)) {
        document.querySelector(playerAdsId).remove();
      }
      // Give the browser time to breathe
      if (counter++ % (2 + Math.floor(Math.random() * 3)) === 0) return;

      handleAds();
    });

    observer.observe(document.body, { subtree: true, childList: true });
  }
}

// Runing Additional function to removeAds from youtube - AdBlock Function.
// blockAds();
