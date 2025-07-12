import { createFileRoute } from '@tanstack/react-router'
import getApi from "@/lib/api/api";

export const Route = createFileRoute('/')({
  component: Home,
})

async function Home() {
  return (
    <main className="main-layout w-screen overflow-x-hidden px-4 lg:px-80">
      Welcome YOPTA
    </main>
  );
}
