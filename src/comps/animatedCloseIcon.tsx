'use client'

import { Variants } from 'motion/react';
import * as motion from 'motion/react-client';

    const draw : Variants = {
        hidden: { pathLength: 0, opacity: 0},
        visible: (input: {delay?: number, duration?: number}) => {
            const delay = input?.delay ?? 0;
            const duration = input?.duration ?? 1;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength:{ delay, type: 'spring', duration, bounce: 0},
                    opacity:{ delay, duration: duration * 0.1}
                }
            }
        },
        hover: (input: {direction?: 'left'| 'right'}) => {
            const direction = input?.direction ?? 0;
            return {
                pathLength: 1,
                opacity: 1,
                rotate: direction === 'left' ? '0.25turn' : '-0.25turn',
                transition: {
                }
            }
        },
        click: (input: {scale: number}) => {
            return {
                scale: input.scale ?? 1
            }
        }
    }

export function AnimatedCloseIcon(){
    
    return <motion.svg viewBox={"0 0 600 600"} initial="hidden" animate="visible" whileHover="hover" className={'overflow-visible'} whileTap="click">
        <motion.line x1={180} x2={420} y1={180} y2={420} stroke="currentColor" strokeWidth={50} style={{strokeLinecap: 'round'}} variants={draw} custom={{delay: 0.0, duration:0.4, scale: 0.8}}/>
        <motion.line x1={180} x2={420} y1={420} y2={180} stroke="currentColor" strokeWidth={50} style={{strokeLinecap: 'round'}} variants={draw} custom={{delay: 0.2, duration:0.4, scale: 0.8}}/>
        <motion.rect width={520} height={520} x={40} y={40} variants={draw} custom={{delay: 0.5, duration:0.8, direction:'left', scale:0.8}} fill="transparent" stroke="currentColor" strokeWidth={60} style={{strokeLinecap: 'round'}} rx={100}/>
    </motion.svg>
}