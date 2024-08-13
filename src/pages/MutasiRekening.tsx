import MutasiLayout from '../components/layout/MutasiLayout';
import { useLoading } from '../contexts/useLoading';
import Preloading from "../components/base/preloading/preloading";

function MutasiRekening() {
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
