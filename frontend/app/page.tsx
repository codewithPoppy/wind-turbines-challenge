import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import TurbineDetailModal from "@/components/TurbineDetailModal";
import { serverUrl } from "@/config/config";
import { TurbinesProvider } from "@/contexts/TurbinesContext";
import type { Turbine } from "@/types/turbine";

export default async function Home() {
  const data = await fetch(`${serverUrl}/turbines`);
  const turbines: Turbine[] = await data.json();

  return (
    <TurbinesProvider initialState={turbines}>
      <div className="w-full flex h-screen">
        <LeftSection />
        <RightSection />
      </div>
      <TurbineDetailModal />
    </TurbinesProvider>
  );
}
