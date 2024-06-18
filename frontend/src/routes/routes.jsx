import { Route } from "react-router-dom"

import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import { Progress } from "../components/Progress/MyProgress"
import { Play } from "../components/Play"
import { Math } from "../components/Games/Math"
import { Swedish } from "../components/Games/Swedish"
import { English } from "../components/Games/English"
import { OmOss } from "../components/About"

// Define the 'routes' variable as a JSX expression.
const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/progress" element={<Progress />} />
    <Route path="/spela" element={<Play />} />
    <Route path="/spela/matte" element={<Math />} />
    <Route path="/spela/svenska" element={<Swedish />} />
    <Route path="/spela/engelska" element={<English />} />
    <Route path="/om-oss" element={<OmOss />} />
    <Route path="*" element={<NotFound />} />
  </>
)

// Export the 'routes' variable as the default export of this module.
export default routes
