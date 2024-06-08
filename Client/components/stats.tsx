export default function Stats({ accuracy, wpm }: { accuracy: string | null; wpm: string | null }) {
    return (
      <div className="self-start flex gap-5 mt-2">
        <p>Speed: {wpm ? `${wpm}` : '0.00'} WPM</p>
        <p>Accuracy: {accuracy ? `${accuracy}` : '0.00'}%</p>
      </div>
    );
  }
  