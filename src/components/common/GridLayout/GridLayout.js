import style from "./GridLayout.module.scss"

const GridLayout = ({children}) => {

    return(
        <div className={`${style["grid-layout"]}`}>
        {children}
       </div>
    )
}

export default GridLayout;