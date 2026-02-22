import dynamic from "next/dynamic";

// Important: import the client wrapper, not `sanity`, and disable SSR
const StudioClient = dynamic(() => import("./StudioClient"), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}