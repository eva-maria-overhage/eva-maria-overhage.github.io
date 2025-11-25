import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider} from "react-router";
import './index.css'
import Root, { loader as RootLoader } from "./routes/Root.tsx";
import Imprint from "./routes/Imprint.tsx";
import Home, { loader as HomeLoader } from "@/routes/Home.tsx";
import Exhibitions, { loader as ExhibitionsLoader} from "./routes/Exhibitions.tsx";
import Artworks, { loader as ArtworksLoader } from "@/routes/Artworks.tsx";
import NotFound from "@/routes/NotFound.tsx";

const router = createHashRouter([
    {
        path: "/",
        loader: RootLoader,
        Component: Root,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                loader: HomeLoader,
                Component: Home
            },
            {
                path: "artworks",
                loader: ArtworksLoader,
                Component: Artworks
            },
            {
                path: "exhibitions",
                loader: ExhibitionsLoader,
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
