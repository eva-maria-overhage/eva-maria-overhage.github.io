import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router";
import './index.css'
import Root from "./routes/Root.tsx";
import Imprint from "./routes/Imprint.tsx";
import Home, {HomeLoader} from "@/routes/Home.tsx";
import Exhibitions, {loader as ExhibitionsLoader} from "./routes/Exhibitions.tsx";
import Artworks, {ArtworkLoader} from "@/routes/Artworks.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: HomeLoader,
            },
            {
                path: "artworks",
                Component: Artworks,
                loader: ArtworkLoader
            },
            {
                path: "exhibitions",
                Component: Exhibitions,
                loader: ExhibitionsLoader
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
