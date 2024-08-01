import { useState } from 'react';
import Popup from '../components/base/popup';
import Header from '../components/layout/header'
import InfoMutasiRekening from '../components/layout/infoMutasiRekening';
import InfoUser from '../components/layout/infouser'
import MenuFitur from '../components/layout/menufitur'
import MenuInfoSaldo from '../components/layout/menuInfoSaldo';



// console.log(location)
console.log(location.pathname === '/saldo-mutasi/mutasi-rekening')

function MutasiRekening() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  function handleButtonClick () {
    setIsPopupVisible(true)
  }

  function handleClosePopup () {
    setIsPopupVisible(false)
  }

  return (
    <div className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto mt-[50px] pb-[50px]">
        <div className="grid grid-cols-12 grid-flow-row mb-[50px] gap-[2.5rem]">
            <MenuInfoSaldo />
            <InfoMutasiRekening />
            <button onClick={handleButtonClick}>Show Popup</button>
            {
              isPopupVisible && (
                <Popup message={'tws'} svgSrc={''} svgAlt={''} labelButton={''} labelPopup={''} buttonText={'tes'} onButtonClick={handleClosePopup} />
              )
            }
        </div>
      </section>
    </div>
  )
}

export default MutasiRekening
