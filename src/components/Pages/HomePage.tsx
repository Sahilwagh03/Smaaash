import Hero from "@/components/Hero";
import SmaaashHighlights from "@/components/SmaaashHighlights";
import SocialFloating from "@/components/socialFloating";
import { TimelineProvider } from "@/hooks/TimeLineProvider";

type Props = {}

const HomePage = (props: Props) => {
    return (
        <TimelineProvider>
            <Hero enableVideo />
            <SmaaashHighlights />
            <SocialFloating />
        </TimelineProvider>
    )
}

export default HomePage