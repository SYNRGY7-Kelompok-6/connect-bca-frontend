const mutasiData = [
  {
    tanggal: '17 Juni 2024',
    nama: 'Gacoan',
    norek: '23829128311298',
    nominal: '20.000',
    ket: 'Pembayaran',
    saldoAkhir: 'Rp 1.762.800',
  },
  {
    tanggal: '18 Juni 2024',
    nama: 'Santoso',
    norek: '23829128311345',
    nominal: '50.000',
    ket: 'Setoran',
    saldoAkhir: 'Rp 1.812.800',
  },
  {
    tanggal: '19 Juni 2024',
    nama: 'Rahman',
    norek: '23829128311456',
    nominal: '100.000',
    ket: 'Pembayaran',
    saldoAkhir: 'Rp 1.712.800',
  },
  {
    tanggal: '20 Juni 2024',
    nama: 'Indah',
    norek: '23829128311567',
    nominal: '150.000',
    ket: 'Setoran',
    saldoAkhir: 'Rp 1.862.800',
  },
  {
    tanggal: '21 Juni 2024',
    nama: 'Budi',
    norek: '23829128311678',
    nominal: '200.000',
    ket: 'Pembayaran',
    saldoAkhir: 'Rp 1.662.800',
  },
  {
    tanggal: '22 Juni 2024',
    nama: 'Joko',
    norek: '23829128311789',
    nominal: '75.000',
    ket: 'Setoran',
    saldoAkhir: 'Rp 1.737.800',
  },
  {
    tanggal: '23 Juni 2024',
    nama: 'Siti',
    norek: '23829128311890',
    nominal: '30.000',
    ket: 'Pembayaran',
    saldoAkhir: 'Rp 1.707.800',
  },
  {
    tanggal: '24 Juni 2024',
    nama: 'Ahmad',
    norek: '23829128311901',
    nominal: '120.000',
    ket: 'Setoran',
    saldoAkhir: 'Rp 1.827.800',
  },
  {
    tanggal: '25 Juni 2024',
    nama: 'Ayu',
    norek: '23829128312012',
    nominal: '45.000',
    ket: 'Pembayaran',
    saldoAkhir: 'Rp 1.782.800',
  },
  {
    tanggal: '26 Juni 2024',
    nama: 'Rina',
    norek: '23829128312123',
    nominal: '95.000',
    ket: 'Setoran',
    saldoAkhir: 'Rp 1.877.800',
  },
];

function InfoMutasiRekening() {
  return (
    <div id='main-saldo' className='col-span-9 flex flex-col gap-3 ml-12'>
      <div id='table' className='w-full flex flex-col gap-3'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-white text-2xl font-bold'>Mutasi Rekening</p>
            <p className='text-white font-semibold text-sm'>Periode 1 Jun 2024 - 30 Jun 2024</p>
          </div>
          <div className='flex gap-5 items-end'>
            <button className='flex gap-4 bg-primary-blue px-[15px] py-[10px] rounded-xl text-white font-semibold'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 4.5C4 4.10218 4.15804 3.72064 4.43934 3.43934C4.72064 3.15804 5.10218 3 5.5 3H20.5C20.8978 3 21.2794 3.15804 21.5607 3.43934C21.842 3.72064 22 4.10218 22 4.5V6.586C21.9999 7.11639 21.7891 7.62501 21.414 8L16 13.414V20.838C16 21.0255 15.9521 21.2099 15.8608 21.3737C15.7695 21.5375 15.6379 21.6753 15.4783 21.7739C15.3188 21.8724 15.1368 21.9286 14.9494 21.9371C14.7621 21.9455 14.5757 21.9059 14.408 21.822L10.691 19.964C10.4834 19.8602 10.3087 19.7006 10.1867 19.5031C10.0647 19.3057 10 19.0781 10 18.846V13.414L4.586 8C4.2109 7.62501 4.00011 7.11639 4 6.586V4.5ZM6 5V6.586L11.56 12.146C11.6994 12.2853 11.8101 12.4507 11.8856 12.6327C11.9611 12.8148 12 13.0099 12 13.207V18.382L14 19.382V13.207C14 12.809 14.158 12.427 14.44 12.147L20 6.585V5H6Z" fill="white"/>
              </svg>
              Filter
            </button>
            <div className='relative flex items-center'>
              <svg className='absolute ml-[10px]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14H14.71L14.43 13.73C15.4439 12.554 16.0011 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#1C1C1E"/>
              </svg>
              <input type="text" placeholder='Search by Nama' aria-placeholder='Search by Nama' className='bg-white p-[10px] gap-[10px] rounded-[10px] flex text-primary-blue font-semibold text-base pr-[10px] pl-10 w-[180px]' />
            </div>
          </div>
        </div>
        <table className="table-auto bg-primary-blue w-full rounded-[10px]">
          <thead className='bg-white'>
            <tr>
              <th className='rounded-l-[10px] py-2'>Tanggal</th>
              <th>Nama</th>
              <th>No Rekening</th>
              <th>Nominal</th>
              <th>Ket</th>
              <th className='rounded-r-[10px] py-2'>Saldo Akhir</th>
            </tr>
          </thead>
          <tbody className='text-white font-semibold text-base'>
            {
              mutasiData.map((data) => (
                <tr className='text-center' key={data.nama}>
                  <td className='py-1'>{data.tanggal}</td>
                  <td className=''>{data.nama}</td>
                  <td>{data.norek}</td>
                  <td>{data.nominal}</td>
                  <td>{data.ket}</td>
                  <td>{data.saldoAkhir}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='flex justify-between'>
        <div>
          <div className='bg-primary-blue rounded-[10px] py-[23px] px-[29px] text-white font-semibold text-[20px] w-[396px] flex flex-col gap-[14px]'>
              <span>Saldo Awal        : 1.782.800</span>
              <span>Mutasi Kredit     : 792.800  </span>
              <span>Mutasi Debit      : 1.560.000</span>
              <span>Saldo Akhir       : 2.550.000</span>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='pagination text-white flex bg-primary-blue divide-x h-[34px]'>
            <a href="#" className='grow flex items-center justify-center'>
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="ep:arrow-down-bold" clipPath="url(#clip0_778_1562)"> <path id="Vector" d="M5.13119 17.5573C4.96715 17.3347 4.875 17.0327 4.875 16.7178C4.875 16.4029 4.96715 16.1009 5.13119 15.8782L9.46244 10.0001L5.13119 4.12197C4.9718 3.89801 4.8836 3.59804 4.8856 3.28668C4.88759 2.97532 4.97961 2.67748 5.14185 2.45731C5.30408 2.23714 5.52354 2.11225 5.75296 2.10955C5.98238 2.10684 6.20341 2.22653 6.36844 2.44285L11.3183 9.16053C11.4824 9.38322 11.5745 9.68521 11.5745 10.0001C11.5745 10.315 11.4824 10.617 11.3183 10.8397L6.36844 17.5573C6.20435 17.78 5.98183 17.905 5.74981 17.905C5.51779 17.905 5.29528 17.78 5.13119 17.5573Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_778_1562">
                  <rect width="19" height="14" fill="white" transform="matrix(0 -1 1 0 0.5 19.5)"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="#" className='grow flex items-center justify-center'>1</a>
            <a href="#" className='grow flex items-center justify-center'>
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="ep:arrow-down-bold" clipPath="url(#clip0_778_1562)"> <path id="Vector" d="M5.13119 17.5573C4.96715 17.3347 4.875 17.0327 4.875 16.7178C4.875 16.4029 4.96715 16.1009 5.13119 15.8782L9.46244 10.0001L5.13119 4.12197C4.9718 3.89801 4.8836 3.59804 4.8856 3.28668C4.88759 2.97532 4.97961 2.67748 5.14185 2.45731C5.30408 2.23714 5.52354 2.11225 5.75296 2.10955C5.98238 2.10684 6.20341 2.22653 6.36844 2.44285L11.3183 9.16053C11.4824 9.38322 11.5745 9.68521 11.5745 10.0001C11.5745 10.315 11.4824 10.617 11.3183 10.8397L6.36844 17.5573C6.20435 17.78 5.98183 17.905 5.74981 17.905C5.51779 17.905 5.29528 17.78 5.13119 17.5573Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_778_1562">
                  <rect width="19" height="14" fill="white" transform="matrix(0 -1 1 0 0.5 19.5)"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
          <button className='bg-primary-blue py-[10px] px-9 text-white rounded-xl'>Unduh Mutasi</button>
        </div>
      </div>
    </div>
  )
}

export default InfoMutasiRekening
