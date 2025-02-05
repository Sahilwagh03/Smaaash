import Hero from "@/components/Hero";
import SmaaashHighlights from "@/components/SmaaashHighlights";
import SocialFloating from "@/components/socialFloating";
import CustomMarquee from "../marquee";
import OurCenter from "../ourCenter";
import CursorFollower from "../cursorFollowing";
import CallToAction from "../callToAction";
import Gallery from "../gallery";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <CursorFollower />
            <Hero enableVideo />
            <SmaaashHighlights />
            <OurCenter />
            {/* <CustomMarquee /> */}
            <CallToAction/>
            <SocialFloating />
        </>
    )
}

export default HomePage