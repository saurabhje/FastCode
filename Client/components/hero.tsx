import { Button } from "./ui/button";
import Herocards from "./ui/heromode";
export default function Hero() {
    return (
        <div className="py-20 flex flex-col justify-center">
            <section className="flex flex-col items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-bold">Level up typing: Backspace is for losers!</h1>
                <p className="text-base md:text-xl text-muted-foreground lg:w-2/3">
                    Perfect for typing enthusiasts and coders looking to level up their skills, <span className="text-primary">Keyscripter</span> helps you improve typing speed and accuracy, leaving backspacing in the past.
                </p>
                <div className="flex gap-6 md:gap-10">
                    <Button ><a href="#game">Start typing</a></Button>
                    <Button variant="secondary" className="border border-neutral-700">Sign up</Button>
                </div>
            </section>
            <section className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-3xl">Unlock Your full Potential</h2>
                <p className="text-base md:text-xl text-muted-foreground m-4">Practing in different modes</p>
                <Herocards />
            </section>
        </div>
    )
}
