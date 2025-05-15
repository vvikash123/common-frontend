import style from "./GridLhs.module.scss"

const GridLhs = ({children}) => {

    return(
        <div className={`${style["grid-lhs"]}`}>
        {children}
       </div>
    )
}

export default GridLhs;