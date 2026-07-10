import { MetroHighlights } from "@/components/home/MetroHighlights";
import { WeeklyBands } from "@/components/home/WeeklyBands";
import { StatsStrip } from "@/components/home/StatsStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { CityBrowse } from "@/components/home/CityBrowse";
import { BrandOverview } from "@/components/home/BrandOverview";
import { StationComparison } from "@/components/home/StationComparison";
import { MapTeaser } from "@/components/home/MapTeaser";
import { GasulTeaser } from "@/components/home/GasulTeaser";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FuelCalculator } from "@/components/fuel/FuelCalculator";
import { ContactSection } from "@/components/forms/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ReportPriceSection } from "@/components/forms/ReportPriceSection";
import { metroSnapshot, weeklyBands } from "@/data/snapshot";
import { stations } from "@/data/stations";
import { brandOverview } from "@/data/brands";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <StatsStrip snapshot={metroSnapshot} />
      <WeeklyBands bands={weeklyBands} weekLabel={metroSnapshot.weekLabel} />
      <MetroHighlights snapshot={metroSnapshot} />
      <CityBrowse />
      <BrandOverview brands={brandOverview} />
      <StationComparison stations={stations} />
      <MapTeaser />
      <GasulTeaser />
      <HowItWorks />
      <FuelCalculator
        brands={brandOverview}
        metroDieselAvg={metroSnapshot.avgDiesel}
        metroUnleadedAvg={metroSnapshot.avgUnleaded}
      />
      <ReportPriceSection stations={stations} />
      <ContactSection />
      <FaqSection />
    </main>
  );
}
