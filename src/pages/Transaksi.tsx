import React, { useEffect, useState } from 'react';
import Preloading from '../components/base/preloading';
import Header from '../components/layout/header';
import InfoUser from '../components/layout/infouser/InfoUser';
import MenuFitur from '../components/layout/menufitur/MenuFitur';
import Dropdown from '../components/layout/dropdown';
import { useLoading } from '../contexts/useLoading';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import useBankStatement from '../contexts/useBankStatement';
import DaftarRekening from '../components/layout/daftarrekening';
import RekeningBaru from '../components/layout/rekeningbaru';
import TransferForm from '../components/layout/TransferForm';
import TransferConfirmation from '../components/layout/TransferConfirmation';

const Transaksi: React.FC = () => {
  const location = useLocation();
  const { loading, setLoading } = useLoading();
  const { fetchLoginInfo } = useAuth();
  const { fetchBankStatement, fetchAccountMonthly } = useBankStatement();

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (!hasFetchedData) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchLoginInfo(),
            fetchBankStatement(),
            fetchAccountMonthly(8),
          ]);
          setHasFetchedData(true);
        } catch (err) {
          console.error('Error fetching data', err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [
    hasFetchedData,
    fetchLoginInfo,
    fetchBankStatement,
    fetchAccountMonthly,
    setLoading,
  ]);

  const renderContent = () => {
    switch (location.pathname) {
      case '/transaksi/rekening':
        return <RekeningBaru />;
      case '/transaksi/transfer':
        return <TransferForm />;
      case '/transaksi/transfer/confirmation':
        return <TransferConfirmation />;
      default:
        return <DaftarRekening />;
    }
  };

  return (
    <div className="font-sans bg-primary-dark-blue">
      {loading ? (
        <Preloading />
      ) : (
        <>
          <Header />
          <InfoUser />
          <MenuFitur />
          <section className="container mx-auto mt-[50px] pb-[50px]">
            <div className="flex flex-row gap-[80px]">
              <Dropdown
                buttonLabel="Transaksi Transfer"
                activeItem={location.pathname}
                items={[
                  {
                    label: 'Transfer Antar Rek. BCA',
                    href: '/transaksi',
                  },
                  {
                    label: 'Transfer Antar Bank',
                    href: '/transaksi/antar-bank',
                  },
                  {
                    label: 'Transfer RTGS',
                    href: '/transaksi/rtgs',
                  },
                  {
                    label: 'Transfer Kliring',
                    href: '/transaksi/kliring',
                  },
                  {
                    label: 'Transfer Dana Pensiun',
                    href: '/transaksi/dana-pensiun',
                  },
                ]}
              />
              {renderContent()}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Transaksi;
