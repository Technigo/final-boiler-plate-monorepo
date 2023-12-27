# https://www.youtube.com/watch?v=BjOq9SEDzKY

# "set up backend first" - by code coach
but im working with frontend currently.
when user start to 'move'
api is supposed to record users place,
so, and then, having need to set up backend
but i think there should be reason, to focus on backend first, and i want to feel that
so lets hope that ill be done the basic frontend thing asap,
and get into, the real thing, called backend.

# was trying to enable autoplay when it is not muted
but it was not happening for me. 
so the place for me to move on is
1. make sure the user is playing the video, for at least 10 seconds, to have feeling of surrounding sound, temperature of winter, stuffs like that
2. and then, show specific message, given that user is ready to proceed

# State changed 1
App.jsx:16 State changed 2
App.jsx:16 State changed 3
App.jsx:16 State changed 1

what is meaning of this?

ChatGPT
The "State changed" messages with values 1, 2, 3 correspond to different states of the YouTube player. In the YouTube API, each state has a numerical code, and these codes are emitted when the state of the player changes. Here's what each code generally represents:

0 (UNSTARTED): The video has not yet started.
1 (ENDED): The video has ended.
2 (PLAYING): The video is currently playing.
3 (PAUSED): The video is paused.
5 (BUFFERING): The video is buffering.