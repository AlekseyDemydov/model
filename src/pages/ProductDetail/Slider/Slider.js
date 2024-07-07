import Carousel from 'react-bootstrap/Carousel';
import config from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductSlider({ images }) {
    return (
      <Carousel>
        {images.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <img
            crossOrigin="anonymous"
              className="d-block w-100"
              src={`${config.baseURL}${imageUrl}`}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  
  export default ProductSlider;