import Header from '../components/layout/header'
import InfoMutasiRekening from '../components/layout/infoMutasiRekening';
import InfoUser from '../components/layout/infouser'
import MenuFitur from '../components/layout/menufitur'
import MenuInfoSaldo from '../components/layout/menuInfoSaldo';



// console.log(location)
console.log(location.pathname === '/saldo-mutasi/mutasi-rekening')

function MutasiRekening() {
  return (
    <div className="bg-primary-dark-blue font-sans">
      <Header />
      <InfoUser />
      <MenuFitur />
      <section className="container mx-auto mt-[50px] pb-[50px]">
        <div className="grid grid-cols-12 grid-flow-row mb-[50px] gap-[2.5rem]">
            <MenuInfoSaldo />
            <InfoMutasiRekening />
        </div>
      </section>
    </div>
  )
}

export default MutasiRekening
