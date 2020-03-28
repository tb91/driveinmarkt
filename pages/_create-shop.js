import {
    useRouter
} from 'next/router';

import styles from './createShop.module.css'

const CreateShop = () => {
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/create-shop')
    });

    return (
    <div className={styles.container}>
        Create Shop
    </div>
    )
};

export default CreateShop;