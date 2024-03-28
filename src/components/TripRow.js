'use client'
import styles from './triprow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTrip, updateMyTrips } from '@/reducers/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TripRow(props) {
    const token = useSelector((state) => state.user.value.token);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    const urlBackend = process.env.NEXT_PUBLIC_URL_BACKEND 

    useEffect(() => { 
      fetch(`${urlBackend}users/isAdmin`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {currentTripId: props._id, token: token} )
          }).then(response => response.json())
          .then(data => {
              data && setIsAdmin(data.isAdmin)
          })    
    }, []);

    const handleGoToDash = () => {
      dispatch(updateCurrentTrip(props));
      router.push('/');
    }

    return (
      <div className={styles.row}>
          <span className={styles.tripName}>{props.name}</span>
          {isAdmin ? <span className={styles.adminBadge}>ADMIN</span> : <span className={styles.inviteBadge}>INVITÉ</span>}         
          <button className={styles.goButton} onClick={() => handleGoToDash(props)}>Go</button>                   
      </div>
    );
  }