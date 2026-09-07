import { useEffect, useState } from "react"
import RestCard from "./restCard";
import Shimmer from "./Shimmer";
export default function Restaurant(){
    
    const [RestData,setRestData] = useState([]);

    useEffect(()=>{
        
        async function fetchData() {
  try {
    const swiggyAPI =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5759&lng=77.3345&is-seo-homepage-enabled=true";

    const response = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(swiggyAPI)
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    setRestData(
      data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
  } catch (error) {
    console.error("Restaurant API Error:", error);
  }
}
    fetchData();
    },[])
    //console.log(RestData);
    //Shimmer Effect
    if(RestData.length==0)
        return <Shimmer></Shimmer>
    return(
        <div className="flex flex-wrap w-[80%] mx-auto mt-20 gap-5">
           {
              RestData.map((restInfo)=><RestCard key={restInfo?.info?.id} restInfo={restInfo}></RestCard>)
           }
        </div>
    )
} 
//https://proxy.corsfix.com/?