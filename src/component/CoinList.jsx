import { useRef, useState } from "react";
import { useEffect } from "react";
import { coinData } from "./coin-data";

import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from "@mui/material/CircularProgress";

const CoinList = () => {
    const defaultCoins = useRef([]);
    const[coins , setCoins] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
                const data = response.ok ? await response.json() : coinData;
                console.log(data)
                // const data = await response.json();
                setCoins(data);
                defaultCoins.current = data;
            }catch(error){
                console.error('error',error);
            }
        
    };
    fetchData();
},[]);

const searchCrypto = (event)=> {
    console.log(event)

    const newCoins = coins.filter((coin) => coin.id.includes(event.target.value) || coin.symbol.includes(event.target.value));
    setCoins(newCoins);
}

if(coins.length==0){
    return<>Loading...</>
    // <CircularProgress color="secondary" />
}

const columns = [
    { field: 'image', headerName: 'Picture', width: 100,  renderCell: (params) => <img width={20} height={20} src={params.value} /> },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'current_price', headerName: 'Price', width: 130 },
    { field: 'heigh_24h', headerName: 'Height price', width: 130 },
    { field: 'low_24h', headerName: 'Low price', width: 130 },]

return(
    <div>
        <h1>Crypto Price</h1>
        <input onChange={searchCrypto}></input>

        {/* {coins.map((coin)=>(
            <div>
                {coin.name} {coin.title}
            </div>
        ))} */}

   <DataGrid
        rows={coins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
)
};

export default CoinList;