
import HomePage from "@/components/Pages/HomePage";
import { AuthProvider } from "@/context/AuthContext";
import { CursorProvider } from "@/context/CursorContext";

export default function Home() {
  return (
    <main className="relative z-10 cursor-none">
      <CursorProvider>
        <HomePage />
      </CursorProvider>
    </main>
  );
}
