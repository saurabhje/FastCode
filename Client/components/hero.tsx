import { Button } from "./ui/button";

type HeroProps = {
    onStartTypingClick: () => void
}
export default function Hero(props: HeroProps) {
    const { onStartTypingClick } = props;
    return (
        <div className="py-20 flex flex-col justify-center">
            <section className="flex flex-col items-center gap-4">
                <h1 className="text-4xl md:text-5xl font-bold">Level up typing: Backspace is for losers!</h1>
                <p className="text-base md:text-xl text-muted-foreground lg:w-2/3">
                    Perfect for typing enthusiasts and coders looking to level up their skills, <span className="text-primary">Keyscripter</span> helps you improve typing speed and accuracy, leaving backspacing in the past.
                </p>
                <div className="flex gap-6 md:gap-10">
                    <Button onClick={onStartTypingClick}>Start typing</Button>
                    <Button variant="secondary" className="border border-neutral-700"><a href="/register">Sign up</a></Button>
                </div>
            </section>
        </div>
    )
}