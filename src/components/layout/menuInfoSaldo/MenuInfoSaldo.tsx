import { Link } from "react-router-dom"

const buttons = [
  {
    name: 'Informasi Saldo Rekening',
    path: '/saldo-mutasi/info-saldo-rekening'
  },
  {
    name: 'Informasi Saldo Investasi',
    path: '/saldo-mutasi/info-saldo-investasi'
  },
  {
    name: 'Mutasi Rekening',
    path: '/saldo-mutasi/mutasi-rekening'
  },
  {
    name: 'Mutasi Pinjaman',
    path: '/saldo-mutasi/mutasi-pinjaman'
  },
  {
    name: 'Mutasi Dana Pensiun',
    path: '/saldo-mutasi/mutasi-dana-pensiun'
  },
]

function MenuInfoSaldo() {
  return (

    <div id='menu-info-saldo' className='h-[20.75rem] bg-primary-blue rounded-[10px] col-span-3' >
      <div className='p-[14px] text-white text-base font-semibold flex gap-4'>
        <button className='border-2 border-dotted w-8 h-8'>-</button>
        <p className='content-center'>Informasi Saldo & Mutasi</p>
      </div>
      <div className='bg-white text-base font-semibold text-primary-blue'>
        {
          buttons.map((button) => (
            <Link className='w-full' key={button.name} to={button.path} >
              <button className={`p-[13px] text-start w-full
                ${ location.pathname === button.path
                  ? (
                    'bg-primary-blue text-white'
                  ) : (
                    'text-primary-blue'
                  )
                } `}>
                {button.name}
              </button>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default MenuInfoSaldo
