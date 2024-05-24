import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}
class CourseItemDetails extends Component {
  state = {
    courseDetails: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedCourseDetails = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }

      this.setState({
        courseDetails: updatedCourseDetails,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails

    return (
      <div className="CourseCont">
        <img className="CourseImg" src={imageUrl} alt={name} />
        <div className="CourseTextCont">
          <h1 className="CourseHead">{name}</h1>
          <p className="CoursePara">{description}</p>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => <FailureView onClickRetryBtn={this.onClickRetryBtn} />

  onClickRetryBtn = () => {
    this.getCourseDetails()
  }

  renderAllPages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.loading:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="BgCourse">{this.renderAllPages()}</div>
      </>
    )
  }
}
export default CourseItemDetails
