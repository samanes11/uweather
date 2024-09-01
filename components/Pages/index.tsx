import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles


  return (
    <div style={{direction: "rtl", minHeight: "11vh", backgroundColor:"mediumturquoise"}}>
      <br-x />
      <Window title={" گروه پژوهشی اسپایدر"} style={{color: "#B4B4B4",minHeight: 200, margin: 10, width: "calc(100% - 20px)", backgroundColor: "steelblue", fontSize: 16}}>

        {/* #5E0058 */}
        <div style={{ width: "100%", height: 380, backgroundColor: "#268AB8", textAlign: "center", padding: 10, }}>
          <br />
          <br />
          Weather feels like: {props.data_condition}°c 🌡️
          <br />
          <br />
          Humidity: {props.humidity}% 💧
          <br />
          <br />
          Windspeed: {props.windspeed}(km) 💨
          <br />
          <br />
          Chanse of rain: {props.weather}% 🌧️
          <br />
          <br />
          Sunrise: {props.sunrise} 🌅
          <br />
          <br />
          Sunset: {props.sunset} 🌇
        </div>
      </Window>
      <div style={{direction: "rtl", minHeight: "11vh", backgroundColor:"mediumturquoise"}}>
        <br />
        {((props.time)as number).toLocaleString("en-uk")}
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
  let res = await fetch("https://irmapserver.ir/research/api/weather/");
  let data = await res.json();
  let data_condition = await data.current_condition;
  let weather = await data.weather;

  console.log(data_condition[0].temp_C)
  console.log(data.weather[0].hourly[0].chanceofrain)
  console.log(weather[0].humidity)
  console.log(data_condition[0].cloudcover)
  console.log(data.weather[0].astronomy[0].sunrise)
  console.log(data.weather[0].astronomy[0].sunset)
  console.log(weather[0].localObsDateTime)



  // console.log("DEGREEEEEEEEEEEEEEEEEEEEEEEEEE:", FeelsLikeC)

  return {
    props: {
      data: global.QSON.stringify({
        data_condition: data_condition[0].temp_C,
        weather: weather[0].hourly[0].chanceofrain,
        humidity: data_condition[0].humidity,
        windspeed: data_condition[0].windspeedKmph,
        sunrise: weather[0].astronomy[0].sunrise,
        sunset: weather[0].astronomy[0].sunset,
        session,
        time: data_condition[0].localObsDateTime,
        // nlangs,
      })
    },
  }
}