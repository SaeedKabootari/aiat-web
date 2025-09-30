import React, { useEffect, useState } from "react";
import USPopulationChart from "../components/Map/USPopulationChart";
import IRANPopulationChart from "../components/Map/IRANPopulationChart";
import CategoryAccordion from "../components/UI/CategoryAccordion";
import { getActionAx } from "../api";
import useErrorHandler from "../hooks/useErrorHandler";
import { parseMetricName } from "../utils/utils";

const GIS = () => {
  const [populationData, setPopulationData] = useState([]);

const [selectedMetric ,setSelectedMetric] = useState('number_of_kindergartens')

  const errorHandler = useErrorHandler();

//   const populationData =[
//     { name: 'مازندران', value: 1056 },
//     { name: 'خراسان رضوی', value: 2027 },
//     { name: 'فارس', value: 1195 },
//     { name: 'زنجان', value: 260 },
//     { name: 'مرکزی', value: 197 },
//     { name: 'قزوین', value: 138 },
//     { name: 'خوزستان', value: 1581 },
//     { name: 'آذربایجان شرقی', value: 621 },
//     { name: 'یزد', value: 411 },
//     { name: 'اردبیل', value: 429 },
//     { name: 'خراسان جنوبی', value: 469 },
//     { name: 'کرمانشاه', value: 334 },
//     { name: 'اصفهان', value: 2671 },
//     { name: 'آذربایجان غربی', value: 251 },
//     { name: 'ایلام', value: 198 },
//     { name: 'تهران', value: 673 },
//     { name: 'سمنان', value: 181 },
//     { name: 'چهارمحال و بختیاری', value: 367 },
//     { name: 'کهگیلویه و بویراحمد', value: 229 },
//     { name: 'گلستان', value: 1456 },
//     { name: 'همدان', value: 330 },
//     { name: 'بوشهر', value: 315 },
//     { name: 'لرستان', value: 561 },
//     { name: 'هرمزگان', value: 1343 },
//     { name: 'سیستان و بلوچستان', value: 800 },
//     { name: 'گیلان', value: 35 },
//     { name: 'کرمان', value: 904 },
//     { name: 'البرز', value: 306 },
//     { name: 'کردستان', value: 84 },
//     { name: 'خراسان شمالی', value: 286 },
//     { name: 'قم', value: 266 }
//   ]

  const getPopulation = async (metric) => {

    const{name , aggregation} =parseMetricName(metric)
    await getActionAx(
      `/api/amayesh/map/provinces/${name}?aggregation=${aggregation}`
    )
      .then((res) => {
        console.log('GIS' ,res.data.data);
        setPopulationData(res.data.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  useEffect(() => {
    getPopulation(selectedMetric);
  }, [selectedMetric]);


  const metricChangeHandler = (metric)=>{
    setSelectedMetric(metric)
  }


  return (
    <>
      <div className="flex h-full">
        <div className="w-[350px]  flex-shrink-0 h-full">
          {" "}
          <CategoryAccordion onMetricChange={metricChangeHandler} />
        </div>
        <div className="flex-1 h-full">
          {" "}
          <IRANPopulationChart populationData={populationData} />
        </div>

        {/* <USPopulationChart /> */}
      </div>
    </>
  );
};

export default GIS;
