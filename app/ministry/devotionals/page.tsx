import { DevotionalArchive, DevotionalHero, TodaysDevotional } from "./devotionals";

export default function Devotionals() {
    return (
        <div>
            <DevotionalHero />
            <TodaysDevotional />
            <DevotionalArchive />
        </div>
    )
}