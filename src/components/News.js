import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)


  const updateNews = async(pageNo)=> {
    props.setProgress(15);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
  document.title= `${props.category} - Real News`
    updateNews();
  },[])

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page+1)
  //  updateNews();
  // };

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <>
        <h1 className="text-center" style={{margin: '30px 30px', marginTop:'90px'}}>Real News - Top {props.category} headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          // loading={this.setState.loading}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={element.description? element.description.slice(0, 80): ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-evenly">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={ this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "sports",
  // apiKey:"532dc1ac38d745539c7a49fc551dbbe0"
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  // apiKey: PropTypes.string
};

export default News;
