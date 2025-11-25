import SellCar from "../components/car/SellCar";
import PageContainer from "../components/utils/PageContainer";
import { carService } from "../service/carService";

export default function SellCarPage() {
  return (
    <PageContainer>
      <SellCar />
    </PageContainer>
  );
}
