"use client";
import { createContext, useContext, useState } from "react";

//true = 3D render, false = 2D image, null = Loading 3D
interface SceneContextProps {
  shouldRender: boolean;
  setShouldRender: (value: boolean) => void;
}

const SceneContext = createContext<SceneContextProps>({
  shouldRender: true,
  setShouldRender: () => {},
});

export const useSceneContext = () => useContext(SceneContext);

export function SceneContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  return (
    <SceneContext.Provider value={{ shouldRender, setShouldRender }}>
      {children}
    </SceneContext.Provider>
  );
}
