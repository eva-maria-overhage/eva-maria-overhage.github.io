import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider} from "react-router";
import './index.css'
import Root from "./routes/Root.tsx";
import Imprint from "./routes/Imprint.tsx";
import Home from "@/routes/Home.tsx";
import Exhibitions from "./routes/Exhibitions.tsx";
import Artworks from "@/routes/Artworks.tsx";

const router = createHashRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "artworks",
                Component: Artworks
            },
            {
                path: "exhibitions",
                Component: Exhibitions,
            },
            {
                path: "about"
            },
        ]
    },{
        path: "/imprint",
        Component: Imprint
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
