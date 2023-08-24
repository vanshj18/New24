import React from 'react'

const NewsItem =(props)=>{

    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card mx-3" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:'92%',zIndex:'1'}}>{source}
          </span>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5><span className="badge text-bg-success">New</span>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-outline-success">Read More</a>
            </div>
            </div>
      </div>
    )
  }


export default NewsItem
