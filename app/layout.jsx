import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = {
  title: {
    default: "University of Swat | Knowledge, Character & Opportunity",
    template: "%s | University of Swat",
  },
  description:
    "Official university website concept for the University of Swat, Khyber Pakhtunkhwa, Pakistan. Explore admissions, academics, research and campus life.",
  keywords: [
    "University of Swat",
    "higher education",
    "Swat",
    "admissions",
    "research",
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
