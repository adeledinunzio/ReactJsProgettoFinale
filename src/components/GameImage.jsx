
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './GameImage.module.css'

export default function GameImage ({ image }){
  return(
    <LazyLoadImage
    className={styles.gameImage}
    alt="game image"
    effect="blur"
    wrapperProps={{
        style: {transitionDelay: "0.5s"},
    }}
    src={image} />

  )
  
};

