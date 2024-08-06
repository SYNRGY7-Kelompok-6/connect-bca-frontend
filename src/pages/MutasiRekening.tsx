import { useEffect, useState } from 'react';
import MutasiLayout from '../components/layout/MutasiLayout';
import useBankStatement from '../contexts/useBankStatement';
import { useLoading } from '../contexts/useLoading';
import Preloading from "../components/base/preloading/preloading";

function MutasiRekening() {
  // const [isPopupVisible, setIsPopupVisible] = useState(false)
  const { bankStatement, accountMonthly, fetchBankStatement, fetchMutation, fetchAccountMonthly } = useBankStatement();
  const { loading, setLoading } = useLoading();
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const currentDate = new Date();
          if (!bankStatement) {
            await fetchBankStatement()
          }
          if (!accountMonthly) {
            await fetchAccountMonthly(currentDate.getMonth() + 1)
          }
          setHasFetchedData(true)
        } catch (error) {
          console.log('unexpected error occured')
        } finally {
          setLoading(false)
        }
      }

      fetchData()

    }
  }, [hasFetchedData, setLoading, fetchMutation, bankStatement, accountMonthly, fetchBankStatement, fetchAccountMonthly])

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
