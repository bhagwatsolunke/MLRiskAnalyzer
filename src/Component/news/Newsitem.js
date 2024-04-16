import React from 'react'

const Newsitem =(props)=> {

 
 
    let { title, description, imageUrl, newsUrl, author, date , source} = props;
    return (

      <div className="my-3">
        <div className="card" >
        <div style={{
          display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'0'
        }}>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"> {source} </span> 
          </div>
          
          <img src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2022/08/Wipro1-770x433.png" : imageUrl} className="card-img-top" alt="..."  />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn  btn-sn btn-primary" >Read more</a>
          </div>
        </div>
      </div>
    )
}

export default Newsitem