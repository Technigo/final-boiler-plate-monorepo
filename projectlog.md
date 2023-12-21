VM803:1  Error fetching occasions: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
eval @ VM803:1
fetchOccasions @ restaurantStore.jsx:18
await in fetchOccasions (async)
(anonymous) @ occasion.jsx:33
commitHookEffectListMount @ react-dom.development.js:23150
commitPassiveMountOnFiber @ react-dom.development.js:24926
commitPassiveMountEffects_complete @ react-dom.development.js:24891
commitPassiveMountEffects_begin @ react-dom.development.js:24878
commitPassiveMountEffects @ react-dom.development.js:24866
flushPassiveEffectsImpl @ react-dom.development.js:27039
flushPassiveEffects @ react-dom.development.js:26984
(anonymous) @ react-dom.development.js:26769
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
VM803:1  Error fetching occasions: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON 
Jag får det här i viewport :/ har kollat igenom endpoints och rättat men misstänker att det kan lösas om vi får till en webadress, eller så är det jag som tänker fel //Alexandra

20231220
[ ](backend/routes/restaurantRoutes.js) la till denna som en grund för att kunna lägga in data, behöver byggas på för att få till de rätta fälten och sen kopplas till frontend


Att göra:
Express Routes (router.js files)
Observation: The routes are defined correctly. Ensure that the route paths ('/api/results', '/restaurants/search', '/occasion', '/mood', and '/restaurants') match the paths used in your frontend fetch calls. Also, confirm that the route handlers are correctly processing the request data.

Server Setup (server.js) Observation: The server setup appears to be correct. Ensure all routes are correctly mounted (app.use('/api', ...)). Check CORS settings to ensure your frontend can communicate with the backend, especially if they are running on different hosts or ports.

Mongoose Schema (restaurantModel.js) Observation: The schema seems correctly set up. Ensure that the field names used in the schema match those used in your frontend forms and API requests.

Potential Issues to Check:
Correct API Endpoints: Make sure the frontend fetch calls are targeting the correct backend endpoints.
Database Connection: Confirm that your MongoDB database is running and accessible.
Environment Variables: Check if all required environment variables (like MONGO_URL) are correctly set and accessible in your Node.js environment.
Console Logs: Use console.log in both your frontend and backend to trace the flow of data and catch any discrepancies.
Network Activity: Use the browser's developer tools to inspect network activity and see if requests are made correctly and what responses are received.
If the issue persists despite these checks, it may require a more detailed examination of your entire codebase and running environment, potentially indicating a more complex issue.


jag tror att problemet är med middleware: 
The middleware you should use in an Express application depends on the specific needs of your application. Here is a list of commonly used middlewares and their purposes:

Body Parser Middleware (express.json() and express.urlencoded()):

Included in Express 4.16+.
Parses incoming request bodies in a middleware before your handlers, available under the req.body property.
express.json() is for parsing JSON body data.
express.urlencoded() is for parsing URL-encoded data.
CORS Middleware (cors):

Enables Cross-Origin Resource Sharing (CORS).
Allows you to define which domains are permitted to access your API.