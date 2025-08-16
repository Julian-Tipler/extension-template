import {
  RouterProvider,
  createHashRouter,
  Outlet,
  redirect,
} from "react-router-dom";
import { Login } from "./views/Login";
import { Splash } from "./views/Splash";

const App = () => {
  const router = createHashRouter([
    {
      id: "root",
      path: "/",
      element: (
        <div className="app">
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Splash />,
          loader: protectedLoader,
        },
        {
          path: "/login",
          index: true,
          element: <Login />,
        },
        {
          path: "*",
          element: <div>Error</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<></>} />;
};

export default App;

async function protectedLoader() {
  try {
    // Check for auth state in storage
    const yourMomSessionToken = await new Promise((resolve) => {
      chrome.storage.local.get(["yourMomSessionToken"], function(result) {
        resolve(result.yourMomSessionToken);
      });
    });

    if (!yourMomSessionToken) {
      return redirect("/login");
    }
    return null;
  } catch (error) {
    console.error("Auth error:", error);
    return redirect("/login");
  }
}
