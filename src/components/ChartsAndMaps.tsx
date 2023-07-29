import {Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
)

interface CountryInfo {
  _id: number,
  lat: number,
  long: number
}

interface CountryData {
  country: string,
  countryInfo: CountryInfo,
  cases: number,
  deaths: number,
  recovered: number
}

interface AllData {
  cases: number,
  deaths: number,
  recovered: number,
  todayCases: number,
  todayDeaths: number,
  todayRecovered: number
}

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState<object>()
  const [allData, setAllData] = useState<AllData>()
  const [countryData, setCountryData] = useState<CountryData[]>()
  const navigate = useNavigate()
  const {condition} = useParams()
  
  const data =  {
    labels: chartData && Object.keys(chartData),
    datasets: [
      {
        label: `Number of ${condition} vs Time`,
        data: chartData && Object.values(chartData),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ]
  }

  const options: object= {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    },
    scales:{
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
  
  useEffect(()=>{
    const fetchData = async(condition: string) =>{
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        .then(res => res.json())
        .then(data => {
          if(condition === 'cases'){
            setChartData(data.cases)
          } else if(condition === 'deaths'){
            setChartData(data.deaths)
          } else if(condition === 'recovered'){
            setChartData(data.recovered)
          }
        })
        .catch(err => new Error(err))
    }
    if(condition?.length){
      fetchData(condition)
    }
  },[condition])

  useEffect(() => {
    const fetchData = async() => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then(res => res.json())
        .then(data => {
          setAllData(data)
        })
    }
    const fetchCountryData = async() => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data =>{ 
          setCountryData(data)
        })
    }
    fetchData()
    fetchCountryData()
  },[])

  const pieData = {
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [{
      label: 'All Time Data',
      data: [allData?.cases, allData?.deaths, allData?.recovered],
      backgroundColor: ['blue', 'red', 'lightgreen']
    }]
  }

  const pieDataToday = {
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [{
      label: `Today's Data`,
      data: [allData?.todayCases, allData?.todayDeaths, allData?.todayRecovered],
      backgroundColor: ['blue', 'red', 'lightgreen']
    }]
  }

  return (
    <div className='flex flex-col w-full md:w-3/4 m-2 gap-5'>
      <div className='w-full text-center md:text-3xl text-xl font-bold'>Covid Dashboard</div>
      {allData ? 
        <div className='w-full flex justify-center lg:h-96 h-48 sm:gap-2'>
          <div className='sm:w-1/3 w-1/2 border-2 sm:p-2 flex flex-col'>
            <div className='text-center md:text-lg font-semibold underline'>All Time Data</div>
            <div className='flex justify-center h-4/5'>
              <Pie
                data={pieData}>
              </Pie>
            </div>
          </div>
          <div className='sm:w-1/3 w-1/2 border-2 sm:p-2 flex flex-col'>
            <div className='text-center md:text-lg font-semibold underline'>Today's Data</div>
            <div className='flex justify-center h-4/5'>
              <Pie
                data={pieDataToday}>
              </Pie>
            </div>
          </div>
        </div> :
        <div className='flex w-full justify-center mb-5 font-semibold text-lg'>Loading...</div>
      }
      <hr className='w-5/6 mx-auto border-gray-600'></hr>
      {chartData ? 
        <div className='border-2'>
          <Line 
            data={data}
            options={options}>
          </Line>
        </div> :
        <div className='flex w-full justify-center mb-5 font-semibold text-lg'>Loading...</div>}
      <div className='flex justify-center gap-2'>
        <button className='text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center dark:focus:ring-yellow-900' 
          onClick={() => navigate('/charts/cases')}>Cases</button>
        <button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' 
          onClick={() => navigate('/charts/deaths')}>Deaths</button>
        <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' 
          onClick={() => navigate('/charts/recovered')}>Recovered</button>
      </div>
      <hr className='w-5/6 mx-auto border-gray-600'></hr>
      <div>
      <MapContainer center={[20.5937, 78.9629]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countryData ? countryData.map(item => (
          <Marker key={item.country} position={[item.countryInfo.lat, item.countryInfo.long]}>
            <Popup>
              <div className='text-center mb-1 font-semibold'>{item.country}</div>
              <div>Cases: {item.cases}</div>
              <div>Deaths: {item.deaths}</div>
              <div>Recovered: {item.recovered}</div>
            </Popup>
          </Marker>
        )) :
        ''}
      </MapContainer>
      </div>
    </div>
  )
}

export default ChartsAndMaps
