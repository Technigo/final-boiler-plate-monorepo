// import React from "react";

// export const Youglish = () => {
//   const tag = document.createElement("script");

//   tag.src = "https://youglish.com/public/emb/widget.js";
//   const firstScriptTag = document.getElementsByTagName("script")[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//   // 3. This function creates a widget after the API code downloads.
//   let widget;
//   function onYouglishAPIReady() {
//     widget = new YG.Widget("widget-1", {
//       width: 640,
//       components: 9, //search box & caption
//       events: {
//         onFetchDone: onFetchDone,
//         onVideoChange: onVideoChange,
//         onCaptionConsumed: onCaptionConsumed,
//       },
//     });
//     // 4. process the query
//     widget.fetch("courage", "english");
//   }

//   let views = 0,
//     curTrack = 0,
//     totalTracks = 0;

//   // 5. The API will call this method when the search is done
//   function onFetchDone(event) {
//     if (event.totalResult === 0) alert("No result found");
//     else totalTracks = event.totalResult;
//   }

//   // 6. The API will call this method when switching to a new video.
//   function onVideoChange(event) {
//     curTrack = event.trackNumber;
//     views = 0;
//   }

//   // 7. The API will call this method when a caption is consumed.
//   function onCaptionConsumed(event) {
//     if (++views < 3) widget.replay();
//     else if (curTrack < totalTracks) widget.next();
//   }
//   return <div className="widget-1 h-20 w-20"></div>;
// };
