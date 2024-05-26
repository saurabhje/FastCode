type statcardProps = {
    title: string,
    value: string
}
export default function StatCard({title, value}: statcardProps) {
    return (
        <div className="flex flex-col items-center justify-center border-2 border-gray-600 rounded-lg p-3">
            <p className='text-2xl font-semibold'>{value}</p>
            <p className="text-muted-foreground text-sm">{title}</p>
        </div>
    )
}