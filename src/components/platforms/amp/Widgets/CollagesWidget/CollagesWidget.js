import React from "react";
import s from "./CollagesWidget.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import { getPriceRange } from "@/utils/common";
import Link from "next/link";

const CollagesWidget = ({ className, data }) => {

  // console.log("data?.collegeName", data?.collegeName);
  return (
    <>
      <div className={`CollagesWidget ${className ? className : ""}`}>
        <div className="Top">
          <div className="left">
            <i></i>
            <div>
              <h2>
                <a href={`/college/${data?.collegeId}`}>
                  {data?.collegeName}
                </a>
              </h2>
              <span>
                <SpriteIcon className="IconHello" IconName="LocationIcon" width={18} height={19} /> {data?.collegeLoc?.city ?? data?.location?.city}
              </span>
            </div>
          </div>
          <div className="right">
            {data?.ratingValue && <p>
              {data?.ratingText} : <strong>{data?.ratingValue}</strong>
            </p>}
            {data?.scoreValue &&
              <p>
                {data?.scoreText}: <strong>{data?.scoreValue}</strong>
              </p>
            }
          </div>
        </div>

        <div className="CollagesInfo">
          <div>
            <ul className="Fees">
              {data?.collegeFees && (
                <li>
                  Fees:{" "}
                  <strong>
                    {console.log("College Fees:", data?.collegeFees)}
                    {getPriceRange({
                      maxPrice: data?.collegeFees,
                      minPrice: data?.collegeFees,
                    })}
                  </strong>
                </li>
              )}

              {data?.collegeAvgSalary && (
                <li>
                  Salary:{" "}
                  <strong>
                    {getPriceRange({
                      maxPrice: data?.collegeAvgSalary,
                      minPrice: data?.collegeAvgSalary,
                    })}
                  </strong>
                </li>
              )}
              {data?.courseCount && (
                <li>
                  Courses Offered: <strong>{data?.courseCount}</strong>
                </li>
              )}
              {data?.collegeExamsAccepted?.length && (
                <li>
                  Exams Accepted:{" "}
                  <strong>
                    {data.collegeExamsAccepted?.slice(0, 1)?.join(", ")}{" "}
                    {data.collegeExamsAccepted?.length > 2
                      ? " +" + (data.collegeExamsAccepted.length - 2).toString()
                      : ""}
                  </strong>
                </li>
              )}
            </ul>
            <ul className="Info">
              <li>
                <a href={`/college/${data.collegeId}/admissions`}>ADMISSIONS</a>
              </li>
              <li>
                <a href={`/college/${data.collegeId}/courses`}>COURSES</a>
              </li>
              {/* <li>
            <a href={`/college/${data.collegeId}-placements`}>PLACEMENTS</a>
          </li> */}
            </ul>
          </div>
          {data && data?.brochureMsid && (
            <a href={`/college/${data.collegeId}`}>
              <button data-buttontext="Brochure">Brochure</button>
            </a>
          )

          }
        </div>
      </div>
      <style jsx>
        {`
         .CollagesWidget {
  box-shadow: 0px 3px 12px #00000014;
  border: 0.3px solid #B5B5B5;
  border-radius: 5px;
  margin: 0;
}

.CollagesWidget.grid-3 {
  width: 100%;
      margin-bottom: 15px;
}

.CollagesWidget.grid-3 .Top {
  padding: 10px;
  display: block;
}

.CollagesWidget.grid-3 .Top i {
  display: none;
}

.CollagesWidget.grid-3 .Top .left h2 {
  font-size: 16px;
  padding-bottom: 4px;
}

.CollagesWidget.grid-3 .Top .left span {
  font-size: 12px;
  padding-bottom: 4px;
}

.CollagesWidget.grid-3 .Top .right p {
  font-size: 12px;
}

.CollagesWidget.grid-3 .CollagesInfo {
  display: block;
  padding: 10px;
}

.CollagesInfo button{
background: #224099 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
    border-radius: 5px;
    width: 100%;
    padding: 0 30px;
    height: 49px;
    border: 0;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.CollagesWidget.grid-3 .CollagesInfo p {
  font-size: 14px;
  margin-bottom: 10px;
}

.CollagesWidget.grid-3 .CollagesInfo ul.Fees {
  flex-wrap: wrap;
}

.CollagesWidget.grid-3 .CollagesInfo ul.Fees li {
  width: 50%;
  font-size: 12px;
  list-style-type: none;
}

.CollagesWidget.grid-3 .CollagesInfo ul.Fees li strong {
  display: block;
  padding-top: 2px;
}

.CollagesWidget.grid-3 .CollagesInfo ul.Info {
  flex-wrap: wrap;
  margin: 0 0 10px;
}

.CollagesWidget.grid-3 .CollagesInfo ul.Info li {
  width: 50%;
  list-style-type: none;
  padding: 0 0 5px 0;
  font-size: 12px;
}

.CollagesWidget.grid-1 .Top {
  padding: 10px 17px;
}

.CollagesWidget.grid-1 .Top .left h2 {
  font-size: 16px;
  padding-bottom: 4px;
}

 .Top .left h2 a {
    color: black;
    text-decoration: none;
}

.CollagesWidget.grid-1 .Top .left span {
  font-size: 12px;
  padding-bottom: 4px;
}

.CollagesWidget.grid-1 .CollagesInfo {
  padding: 10px;
}

.CollagesWidget.grid-1 .CollagesInfo ul.Fees li {
  font-size: 14px;
}

.CollagesWidget.grid-1 .CollagesInfo ul.Info {
  flex-wrap: wrap;
  margin: 10px 0 10px;
}

.CollagesWidget.grid-1 .CollagesInfo ul.Info li {
  font-size: 12px;
}

.CollagesWidget .Top {
  display: flex;
  align-items: center;
  background: #A6302E08 0% 0% no-repeat padding-box;
  border-radius: 5px 5px 0px 0px;
  padding: 20px 50px;
  justify-content: space-between;
  border-bottom: 1px solid #D9D9D9;
  padding: 10px;
  display: block;
  position: relative;
}

.CollagesWidget .Top .left {
  display: flex;
  align-items: center;
}

.CollagesWidget .Top .left i {
  border: 1px solid #D9D9D9;
  width: 110px;
  height: 54px;
  border-radius: 4px;
  margin-right: 18px;
  overflow: hidden;
  display: none;
}

.CollagesWidget .Top .left i img {
  width: 100%;
  height: 100%;
}

.CollagesWidget .Top .left h2 {
  color: #050038;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.CollagesWidget .Top .left span {
  color: #050038;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 6px 0;
}

.IconHello {
  width: 20px;
  height: 20px;
}

.CollagesWidget .Top .right {
  position: absolute;
  right: 6px;
  display: block;
  bottom: 6px;
}

.CollagesWidget .Top .right p {
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  border-right: 0.5px solid rgba(5, 0, 56, 0.2);
  margin: 0;
  border: 0;
  padding: 0;
}

.CollagesWidget .Top .right p:last-child {
  padding-right: 0;
  border: 0;
  margin-right: 0;
}

.CollagesWidget .Top .right p strong {
  color: #224099;
  font-weight: 800;
}

.CollagesWidget .CollagesInfo {
  width: 100%;
  padding: 10px;
  display: block;
}

.CollagesWidget .CollagesInfo p {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.CollagesWidget .CollagesInfo ul.Fees {
  display: flex;
  flex-wrap: wrap;
}

.CollagesWidget .CollagesInfo ul.Fees li {
  width: 50%;
  color: #050038;
  font-size: 16px;
  font-weight: normal;
  list-style-type: none;
  margin-bottom: 10px;
}

.CollagesWidget .CollagesInfo ul.Fees li strong {
  display: block;
  padding-top: 4px;
}

.CollagesWidget .CollagesInfo ul.Info {
  display: flex;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
}

.CollagesWidget .CollagesInfo ul.Info li {
  color: #3F9BFC;
  font-size: 14px;
  font-weight: 600;
  padding-right: 40px;
  list-style-type: none;
  width: 50%;
  padding-bottom: 7px;
}

.CollagesWidget .CollagesInfo ul.Info li a {
  color: #3F9BFC;
}

        `}
      </style>
    </>
  );
};



export default CollagesWidget;
