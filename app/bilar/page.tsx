import CarWithEngineSound from "../components/cool-to-have/CarWithEngineSound";
import FilterBar from "../components/car/FilterBar";
import PageContainer from "../components/utils/PageContainer";
import PageHeader from "../components/presentation/PageHeader";
import { VehicleCard } from "../components/car/VehicleCard";
import { carService } from "../service/carService";

export default function Bilar() {
  const cars = carService.getCarsSorted();
  return (
    <PageContainer>
      <PageHeader
        header="Bilar i vårt lager just nu"
        desc="Sök bland våra nya bilar, kontakta en säljare och boka en provkörning! Vi erbjuder finansiering till alla bilar, utan kontantinsats."
      />
      <FilterBar cars={cars} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, i) => (
          <VehicleCard key={i + car.name} car={car} />
        ))}
      </div> */}
      <CarWithEngineSound />
    </PageContainer>
  );
}
