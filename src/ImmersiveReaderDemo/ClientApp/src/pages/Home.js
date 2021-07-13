import { useEffect, useState } from "react";
import * as ImmersiveReader from "@microsoft/immersive-reader-sdk";

// local imports
import { useSettings } from "../context";
import { Pronunciation } from "../components";

export const Home = () => {
  const { settings } = useSettings();
  const [text] = useState("The quick brown fox jumps over the lazy dog");

  useEffect(() => {
    const launchImmersiveReader = async () => {
      await ImmersiveReader.launchAsync(settings.token, settings.subDomain, {
        chunks: [
          {
            content: text,
            lang: "en-US",
          },
        ],
      });
    };
    if (settings) {
      launchImmersiveReader();
    }
  }, [text, settings]);
  return (
    <div className="row">
      <div className="col-6 offset-6">
        <Pronunciation referenceText={text} />
      </div>
    </div>
  );
};
