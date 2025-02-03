
import HomePage from "@/components/Pages/HomePage";
import { CursorProvider } from "@/context/CursorContext";

export default function Home() {
  return (
    <main className="relative z-10 -mt-24">
      <CursorProvider>
        <HomePage />
      </CursorProvider>
    </main>
  );
}
