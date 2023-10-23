const renderRating = rating => (
  <div className="rating-love ">
    <span className="fa fa-star-o" />
    <span className="fa fa-star-o " />
    <span className="fa fa-star-o" />
    <span className="fa fa-star-o" />
    <span className="fa fa-star-o" />
    <span className="rate" style={{ width: `${(rating * 100) / 5}%` }}>
      <span className="fa fa-star full" />
      <span className="fa fa-star full" />
      <span className="fa fa-star full" />
      <span className="fa fa-star full" />
      <span className="fa fa-star full" />
    </span>
  </div>
);

export default renderRating;
