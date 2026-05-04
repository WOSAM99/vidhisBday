import Hero from "./Hero";
import Story from "./Story";
import Countdown from "./Countdown";
import DressCode from "./DressCode";
import RSVP from "./RSVP";

export default function MainSite() {
  return (
    <main className="relative overflow-hidden bg-obsidian">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-castle-mist" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.15),rgba(11,11,15,0.96))]" />
        <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-[32rem] h-96 w-96 rounded-full bg-wine/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-60 bg-[linear-gradient(180deg,rgba(198,168,91,0.08),transparent)]" />
      </div>

      <Hero />
      <Story />
      <Countdown />
      <DressCode />
      <RSVP />
    </main>
  );
}
