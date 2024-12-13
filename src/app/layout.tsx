import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: "Task Manager",
    description: "A simple task manager for my portfolio"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
