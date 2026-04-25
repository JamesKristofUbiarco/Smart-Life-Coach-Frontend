// web/app/page.tsx
import Chat from "@/components/ui/chat";

export default function Home() {
  return (
    <main className="flex flex-col md:ml-62.5 pb-20 h-full">
      <Chat />
    </main>
  );
}
