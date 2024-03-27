'use client'
import styles from './dashboardMembers.module.css';
import Link from "next/link";
import { useSelector } from "react-redux";
import Button from "../utils/Button";
import MiniMemberRow from './MiniMemberRow';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MembersList from '../MemberList';


export default function DashboardMembers() {
    
    const router = useRouter();

const handleClick = () => {
    router.push('/invitation')
}

return(
<div className={styles.container} >
        <MembersList/>
        <Button text="+"  onClick={() => handleClick()} />
</div>
)}