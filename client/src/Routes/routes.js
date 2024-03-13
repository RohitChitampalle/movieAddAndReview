import {
    createBrowserRouter
} from "react-router-dom";
import Movie from "../components/Movie/Movie";
import Review from "../components/Review/Review";
import Dashboard from "../components/Dashboard/Dashboard";
import MovieDetails from "../components/Movie/MovieDetails";
const router = createBrowserRouter(
    [

        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/movie",
            element: <Movie/>
        },
        {
            path: "/review",
            element: <Review/>
        },{
            path:"/movie/:id/review",
            element:<MovieDetails/>
        }

    ]




)

export default router