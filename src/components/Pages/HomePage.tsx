import Hero from "@/components/Hero";
import SmaaashHighlights from "@/components/SmaaashHighlights";
import SocialFloating from "@/components/socialFloating";
import { TimelineProvider } from "@/hooks/TimeLineProvider";
import CustomMarquee from "../marquee";
import OurCenter from "../ourCenter";
import CursorFollower from "../cursorFollowing";
import CalloutSection from "../calloutSection";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <CursorFollower />
            <Hero enableVideo />
            <SmaaashHighlights />
            <OurCenter />
            <CustomMarquee />
            <CalloutSection/>
            <SocialFloating />
        </>
    )
}

export default HomePage