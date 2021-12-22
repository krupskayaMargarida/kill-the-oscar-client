// We are deconstructing props object directly in the parentheses of the function
import "./CommentCard.css";
<link
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  rel="stylesheet"
  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
  crossorigin="anonymous"
/>;

function CommentCard({ comment }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="flex-comments media g-mb-30 media-comment">
            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div className="fotoDescri">
                <img
                  className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                  src={comment.addedBy?.image}
                  alt=" Description"
                />
                <div className="g-mb-15">
                  <a href={`/profile/${comment.addedBy._id}`}>
                    <b>{comment.addedBy?.name} </b>
                  </a>
                  made a post.
                  <br />
                  <span className="g-color-gray-dark-v4 g-font-size-12">
                    {comment.createdAt}
                  </span>
                  <br />
                </div>
              </div>
              <div className="commentText">
                <hr />
                <p>{comment.text}</p>
              </div>

              <ul className="list-inline d-sm-flex my-0">
                <li className="list-inline-item g-mr-20">
                  <a
                    className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                    href="#!"
                  >
                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                  </a>
                </li>
                <li className="list-inline-item g-mr-20">
                  <a
                    className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                    href="#!"
                  >
                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                  </a>
                </li>
                <li className="list-inline-item ml-auto">
                  <a
                    className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                    href="#!"
                  >
                    <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
