import Hero from "@/components/Hero";
import SmaaashHighlights from "@/components/SmaaashHighlights";
import SocialFloating from "@/components/socialFloating";
import { TimelineProvider } from "@/hooks/TimeLineProvider";
import CustomMarquee from "../marquee";
import OurCenter from "../ourCenter";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <Hero enableVideo />
            <SmaaashHighlights />
            <OurCenter />
            <div className="py-4">
                <CustomMarquee />
            </div>
            <SocialFloating />
        </>
    )
}

export default HomePage