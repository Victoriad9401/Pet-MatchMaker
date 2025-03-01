import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoadingScreen.module.css";
import {ClipLoader} from "react-spinners";

const LoadingScreen = () => {
    return(
        <div className={styles.LoadingScreen}>

            <div className={styles.mainpaw}>
            <img className={styles.Lpaw}  src="/lpaw.png" alt="lpaw" />
            </div>
           < div className={styles.paw}>
                           <img className={styles.whitepaw}  src="/white paw.png" alt="whitepaw" />
                            <img className={styles.whitepaw2}   src="/white paw.png" alt="whitepaw2" />
                            <img className={styles.catpaw}  src="/catpaw.png" alt="catpaw " />
                            <img className={styles.catpaw2}  src="/catpaw.png" alt="catpaw2" />
            </div>

           <div className={styles.spinner}>

            <ClipLoader color="#3498db" size={50} />
          </div>
          <div className={styles.container}>
             
            <p className={styles.loadingText}>Loading...</p>
              </div>
            </div> 
              
               
        
    );
};

export default LoadingScreen;
