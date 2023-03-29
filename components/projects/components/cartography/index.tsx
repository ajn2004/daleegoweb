import styles from '@/styles/Home.module.css';
import CartogScene from './cartogScene';


const Cartography = ()=>{
  // const SceneComponent = basicScene
  return(
    <div
    className={styles.vrcontainer}
    >
      <CartogScene />
      </div>
  );
};
export default Cartography;
