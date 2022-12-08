function Card1(props){
    let classes=()=>{
        let bg = props.bgcolor ? 'bg-' + props.bgcolor : '';
        let txt = props.txtcolor? ' text-' + props.txtcolor : ' text-white';
        return 'card ' + bg + txt + ' card-container bg-gn';
    }

    return(
        <div className="container card-container">
            {/* <div className={classes()} style={{maxWidth: "18rem"}}> */}
            <div className={classes()} style={{maxWidth: "18rem", backgroundColor: props.customBg}}>
                <div className="card-header">{props.header}</div>
                <div className="card-body">
                    {props.title && (<h5 className="card-title">{props.title}</h5>)}
                    {props.text && (<p className="card-text">{props.text}</p>)}
                    {props.body}
                    {props.status && (<div className="status" id='createStatus'>{props.status}</div>)}
                </div>
            </div>
        </div>
    )
}
export default Card1