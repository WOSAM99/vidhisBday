import castleBg from "../assets/vidhis-castle-bg.png";
import Hero from "./Hero";
import Story from "./Story";
import Countdown from "./Countdown";
import DressCode from "./DressCode";
import RSVP from "./RSVP";

export default function MainSite() {
  return (
    <main className="relative overflow-hidden bg-obsidian">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `url(${castleBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.18),rgba(11,11,15,0.78)_38%,rgba(11,11,15,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(198,168,91,0.16),transparent_28%),radial-gradient(circle_at_20%_30%,rgba(122,29,42,0.14),transparent_20%)]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-[32rem] h-96 w-96 rounded-full bg-wine/20 blur-3xl" />
      </div>

      <Hero />
      <Story />
      <Countdown />
      <DressCode />
      <RSVP />
    </main>
  );
}
