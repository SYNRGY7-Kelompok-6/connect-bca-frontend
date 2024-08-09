import MutasiLayout from '../components/layout/MutasiLayout';
import { useLoading } from '../contexts/useLoading';
import Preloading from "../components/base/preloading/preloading";

function MutasiRekening() {
  // const [isPopupVisible, setIsPopupVisible] = useState(false)
  const { loading} = useLoading();

  return (
    <>
      {
        loading ? (
          <Preloading />
        ) : (
          <MutasiLayout />
        )
      }
    </>
  )
}

export default MutasiRekening
