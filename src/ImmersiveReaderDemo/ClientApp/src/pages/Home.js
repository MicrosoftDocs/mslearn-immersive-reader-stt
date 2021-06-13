import { useEffect, useRef } from "react";
import * as ImmersiveReader from "@microsoft/immersive-reader-sdk";

// local imports
import { useSettings } from "../context";
export const Home = () => {
    const contentRef = useRef(null);
    const { settings } = useSettings();
    useEffect(() => {
        const launchImmersiveReader = async () => {
            debugger;
            await ImmersiveReader.launchAsync(
                settings.token,
                settings.subDomain,
                contentRef.current.innerText
            );
        };
        if (settings && contentRef) {
            launchImmersiveReader();
        }
    }, [settings, contentRef]);
    return (
        <div>
            <p ref={contentRef}>
                Where I want to start telling is the day I left Pencey Prep.
                Pency Prep is this school that’s in Agerstown, Pennsylvania. You
                probably heard about it. You’ve probably seen the ads, anyway.
                They advertise in about a thousand magazines, always showing
                some hot-shot guy on a horse jumping over a fence. Like as if
                all you ever did at Pencey was play polo all the time. I never
                even once saw a horse anywhere near the place. And underneath
                the guy on the horse’s picture, it always says: “Since 1888 we
                have been molding boys into splendid, clear-thinking young men.”
                Strictly for the birds. They don’t do any damn more molding at
                Pencey than they do at any other school. And I didn’t know
                anybody there that was splendid and clear-thinking and all.
                Maybe two guys. If that many. And they probably came to Pencey
                that way.
            </p>
        </div>
    );
};
