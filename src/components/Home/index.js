import {Component} from 'react'
import {Link} from 'react-router-dom'
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
class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedCoursesData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        coursesList: updatedCoursesData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccess = () => {
    const {coursesList} = this.state

    return (
      <ul className="CoursesListUl">
        {coursesList.map(eachCourse => (
          <Link
            key={eachCourse.id}
            className="Link"
            to={`/courses/${eachCourse.id}`}
          >
            <li className="CourseLi">
              <img
                className="CourseLogoImg"
                src={eachCourse.logoUrl}
                alt={eachCourse.name}
              />
              <p className="CourseName">{eachCourse.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => <FailureView onClickRetryBtn={this.onClickRetryBtn} />

  onClickRetryBtn = () => {
    this.getCoursesList()
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
        <div className="BgHome">
          <h1 className="HomeHead">Courses</h1>
          {this.renderAllPages()}
        </div>
      </>
    )
  }
}
export default Home
