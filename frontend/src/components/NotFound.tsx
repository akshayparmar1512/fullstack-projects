
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge}>
                    PAGE NOT FOUND
                </div>

                <div className={styles.errorNumber}>
                    4<span>0</span>4
                </div>

                <h1>Oops! Lost Your Way?</h1>

                <p className={styles.description}>
                    The page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <div className={styles.divider}></div>

                <Link to="/" className={styles.homeButton}>
                    <span>←</span> Back to Home
                </Link>

                <p className={styles.footerText}>
                    Let's get you back on track.
                </p>
            </div>
        </div>
    );
}

export default NotFound;