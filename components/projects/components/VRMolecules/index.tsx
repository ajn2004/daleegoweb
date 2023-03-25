import styles from '@/styles/Home.module.css';
import BasicScene from './basicScene';


const VRMolecules = ()=>{
  // const SceneComponent = basicScene
  return(
    <div
    className={styles.vrcontainer}
    >
      <BasicScene />
      </div>
  );
};
export default VRMolecules;
