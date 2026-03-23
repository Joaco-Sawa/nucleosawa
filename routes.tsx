import { createBrowserRouter } from "react-router";
import { RootLayout } from "./RootLayout.tsx";
import { Catalog } from "./components/Catalog.tsx";
import { ChallengesList } from "./components/ChallengesList.tsx";
import { ChallengeDetail } from "./components/ChallengeDetail.tsx";
import { ProfileView } from "./components/ProfileView.tsx";
import { MyExchangesView } from "./components/MyExchangesView.tsx";
import { Muro } from "./components/Muro.tsx";
import { NewsDetail } from "./components/NewsDetail.tsx";
import { ContestDetail } from "./components/ContestDetail.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Catalog />,
      },
      {
        path: "muro",
        element: <Muro />,
      },
      {
        path: "muro/:id",
        element: <NewsDetail />,
      },
      {
        path: "concurso/:id",
        element: <ContestDetail />,
      },
      {
        path: "desafios",
        element: <ChallengesList />,
      },
      {
        path: "desafios/:id",
        element: <ChallengeDetail />,
      },
      {
        path: "perfil",
        element: <ProfileView userPoints={15000} />,
      },
      {
        path: "mis-canjes",
        element: (
          <MyExchangesView 
            userPoints={15000} 
            onBack={() => window.history.back()} 
            onProfileClick={() => {}}
          />
        ),
      },
    ],
  },
]);