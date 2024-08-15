export const formatToIDR = (value: number) => {
    return `Rp.${value.toLocaleString("id-ID")}.00`;
  };
  
  export const formatNumber = (value: number) => {
    return value.toLocaleString("id-ID");
  };
  