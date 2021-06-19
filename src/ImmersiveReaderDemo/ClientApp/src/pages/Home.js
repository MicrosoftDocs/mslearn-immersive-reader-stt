import { useEffect } from "react";
import * as ImmersiveReader from "@microsoft/immersive-reader-sdk";

// local imports
import { useSettings } from "../context";

const content = {
  chunks: [
    {
      content: "The quick brown fox jumps over the lazy dog",
      lang: "en-US",
    },
  ],
};

export const Home = () => {
  const { settings } = useSettings();
  useEffect(() => {
    const launchImmersiveReader = async () => {
      await ImmersiveReader.launchAsync(
        settings.token,
        settings.subDomain,
        content
      );
    };
    if (settings) {
      launchImmersiveReader();
    }
  }, [settings]);
  return <div></div>;
};
