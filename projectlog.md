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