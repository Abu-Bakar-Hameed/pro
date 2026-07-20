import "./globals.css";
import Sidebar from "./component/sidebar";

export const metadata = {
  title: "Student Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 flex min-h-screen flex-col bg-white lg:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5">{children}</main>
      </body>
    </html>
  );
}