import './index.css'

const FailureView = props => {
  const {onClickRetryBtn} = props

  const clickedRetry = () => {
    onClickRetryBtn()
  }

  return (
    <div className="BgFailure">
      <img
        className="FailImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="FailHead">Oops! Something Went Wrong</h1>
      <p className="FailPara">
        We cannot seem to find the page you are looking for{' '}
      </p>
      <button onClick={clickedRetry} type="button" className="FailBtn">
        Retry
      </button>
    </div>
  )
}
export default FailureView
