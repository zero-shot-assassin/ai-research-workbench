type HeaderProps = {
    title: string;
};

export function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h1 className="text-lg font-semibold">{title}</h1>
        </header>
    );
}