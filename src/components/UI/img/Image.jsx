import './image.css'
import startImage from './images/start.jpg';
const Image = () => {
    return(
        <div className="image-block">
          <img src={startImage} alt="Start" />
        </div>
    )
}

export default Image