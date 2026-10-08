'use client';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Slide from '@mui/material/Slide';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

function MailSent() {
    const [authStatus, setAuthStatus] = useState(true);
    const [count, setCount] = useState(0);
    const [stop, setStop] = useState(false);
    const [variant, setVariant] = useState<LinearProgressProps['variant']>("indeterminate");
    const [progress, setProgress] = useState<LinearProgressProps['value']>(100);
    const router = useRouter();

    useEffect(() => {
        if (stop) return;
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [stop]);

    useEffect(() => {
        if (count === 2) {
            setStop(true);
            setVariant("determinate");
            setProgress(progress);
            router.push('/');
        }
    }, [count, router]);

    return (
        <Slide direction="left" in={authStatus} timeout={{
            enter: 300,
            exit: 300,
        }} mountOnEnter unmountOnExit>
            <Container maxWidth="xs" sx={{
                bgcolor: 'white', borderRadius: 2, boxShadow: 4, p: 4, my: 10
            }}>
                <Typography variant='h5' className='py-6'>
                    Confirm your mail. Please follow the link from your inbox.
                    Check the spam folder if needed.
                </Typography>
                <Typography variant='h5' className='py-6'>
                    Check the spam folder if needed.
                </Typography>
                <LinearProgress aria-label="Loading…" variant={variant} value={progress} />
            </Container>
        </Slide>
    );
}

export default function MailComponent() {
    return (
        <MailSent />
    );
}