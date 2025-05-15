import style from "./GetNotified.module.scss";
function GetNotified(props) {
  return (
    <>
      <div className={`${style["articleNotification"]}`}>
         <i className={`${style["circleIcon"]}`}></i>
          <p><strong>Get Notified</strong> about <br/> the latest updates <br/> on Allergy!</p>
          <button>Get Notified</button>
        </div>
    </>
  );
}

export default GetNotified;
