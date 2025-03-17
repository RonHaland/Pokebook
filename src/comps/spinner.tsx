'use client'

import { useMotionValue, useTime, useTransform } from 'motion/react';
import * as motion from 'motion/react-client'

export function Spinner(){
    const time = useTime();
    const cappedTime = useMotionValue(0);
    const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });
    const pathLength = useTransform(cappedTime, [0, 500, 1000], [0.05, 0.35, 0.05], { clamp: true });


    time.on("change", latest => {
        cappedTime.set(latest % 1000);
    })


    return <motion.svg viewBox="0 0 500 500" width="100%" height="100%" stroke="currentColor" fill="transparent" style={{rotate}}>
        <motion.circle cx={250} cy={250} r={200} strokeWidth={40} style={{pathLength, strokeLinecap: 'round'}} animate/>
    </motion.svg>
}