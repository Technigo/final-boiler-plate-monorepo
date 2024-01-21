### FIX FIRST; BACKEND
### Admin
- Upgrade or delete users directly from the user list?
- Add an admin list just like the user list?
- Implement logging and monitoring solutions to track application performance and errors.
- Admin accounts should be protected with additional security measures such as two-factor authentication (2FA), strong password policies, and regular password changes.
- Consider logging and monitoring admin activities for security and audit purposes.
- Monitor admin login attempts and set up alerts for any suspicious activity.
- monitor for unusual activities.
### API and Recipes
- make recipes show up in the order they are posted in cocktails.jsx
- sort cocktails by the four categories
- should we upload smaller images?

### FIX FIRST; FRONTEND: 
### Admin Panel: 
- Upgrade user - not working correctly - check this
- Upgrade or delete users directly from the user list?
- Add an admin list just like the user list?
- User register and login (ready in backend)
- Roles work in postman admin login, but dont seem to be passed to frontend
- When roles are passed to frontend, make sure protected routes check role as well (code ready, commented out)
- CSS admin routes

### Admin Panel:
- Most of it 

### Public Interface:
- Disclamer to enter the page
- a header under the navbar separated from the loading of cocktails on homepage so that the user sees something else before the loading message. 
- Restructure cocktails.jsx and integrate it with zustand's exploreRecipesStore.jsx
- instagram carousell, or some way to display images from our instagram, perhaps one at a time that change?

### Public Interface styling:
- Add recipes to the page with images asap  
- Make the search function stick to the top of page while fetching and typing. Use placeholder for this?
- Add padding under recipes that display after search is compleated
- Change gap on tablet in cocktails.jsx to 20px
- Search bar: when not typing the text moves back over the icon, fix it so it stays 25(?)px to the right

### IMPROVEMENTS LATER ON:
- make email for page
- change or upgrade the deployed api so it perhaps loads faster. Perhaps render is not the best option. 
- later on, change the animation to a cocktailglass while loading
- Implement delayed loading message activation (2-3 seconds), didn't work with the animation this time around.
- if the loading takes longer than people tend to bother to wait, it would be fun with a more personalised message like "Thank you for your patience while our cocktail recipes are stirring up! Remember, as the saying goes, 'Good things come to those who wait.'
- dropdown menu to choose from when admins choose tags, colors, flavourprofile and so on for come consistency and for a organised way to structure the "filered by category" when we make it work
- change the navbar to:
x change hamburericon to X when closing menu
x new logo?
x Home is only displayed as logo
x Cocktails
x Info --> About us 
       --> Contact us text
x Log in for users; users can save fav cocktails and perhaps only they can comment later on? 
x I think we should hide Amin? If we want it on page for convenience we can make it a transparent button or something?
- change footer: add pinterest and email?
- make a pinterest page, add to 

### DONE:
- loading.. message 
- contact us
