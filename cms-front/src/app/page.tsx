import { getMainMenu } from "@/src/services";
import { Navbar } from "@/src/components";
import { HomeContent } from "./HomeContent";

export default async function Home() {
  const menuItems = await getMainMenu();

  return (
    <div className="surface-ground min-h-screen">
      <Navbar items={menuItems} />
      <HomeContent />
    </div>
  );
}
