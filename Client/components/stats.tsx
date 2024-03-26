export default function Stats({ accuracy, wpm }: { accuracy: string | null; wpm: string | null }) {
    return (
      <div className="flex gap-5 mt-2">
        <p>{wpm ? `Speed: ${wpm} WPM` : ''}</p>
        <p>{accuracy ? `Accuracy: ${accuracy}%` : ''}</p>
      </div>
    );
  }
  