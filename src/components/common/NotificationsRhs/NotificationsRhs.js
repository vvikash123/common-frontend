import React from "react";
import s from "./NotificationsRhs.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";

const NotificationsRhs = ({data}) => {
  return (
    <div className={s['rhsWidget']}>
      <div className={s['rhsWidgetTop']}>
        <i><SpriteIcon IconName="Notifications" /></i>
        <p>{data?.college_info?.name || ""} Notifications</p>
      </div>
      <ul className={s['notifications']}>
        <li><a href="#">GATE 2025 Dates OUT</a></li>
        <li><a href="#">TNEA 2024 Counselling Round 3 Choice Filling (Starts); Link Here</a></li>
        <li><a href="#">TNEA Counselling 2024: Round 3 Choice Filling Starts; Check Details Here</a></li>
        <li><a href="#">TANCET Preparation Tips 2025</a></li>
      </ul>
      <div className={s['BtnRow']}>
      <button className={s['btn']}>View All Notifications</button>
      </div>
    </div>
  );
};

export default NotificationsRhs;
