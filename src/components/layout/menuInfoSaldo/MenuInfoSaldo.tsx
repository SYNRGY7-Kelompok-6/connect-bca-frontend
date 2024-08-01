import Dropdown from "../dropdown"

const navList = [
  {
    label: 'Informasi Saldo Rekening',
    href: '/saldo-mutasi/info-saldo-rekening'
  },
  {
    label: 'Informasi Saldo Investasi',
    href: '/saldo-mutasi/info-saldo-investasi'
  },
  {
    label: 'Mutasi Rekening',
    href: '/saldo-mutasi/mutasi-rekening'
  },
  {
    label: 'Mutasi Pinjaman',
    href: '/saldo-mutasi/mutasi-pinjaman'
  },
  {
    label: 'Mutasi Dana Pensiun',
    href: '/saldo-mutasi/mutasi-dana-pensiun'
  },
]

function MenuInfoSaldo() {
  const activeNav = window.location.pathname
  return (
    <Dropdown items={navList} buttonLabel="Informasi Saldo & Mutasi" activeItem={activeNav} />
  )
}

export default MenuInfoSaldo
