"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    endTime: string; // ISO string format
    startTime: string; // ISO string format
}

export function CountdownTimer({ endTime, startTime }: CountdownTimerProps) {
    console.log("CountdownTimer mounted", startTime, endTime);

    // Define a phase state to differentiate between before start, ongoing, and ended.
    const [timeLeft, setTimeLeft] = useState("");
    const [phase, setPhase] = useState<"before" | "ongoing" | "ended">(
        "before",
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const start = new Date(startTime);
            const end = new Date(endTime);

            console.log("now", now, "start", start, "end", end);

            if (now < start) {
                // Before booking start: countdown until start time
                setPhase("before");
                const diff = start.getTime() - now.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor(
                    (diff % (1000 * 60 * 60)) / (1000 * 60),
                );
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                const formatted = [
                    hours.toString().padStart(2, "0"),
                    minutes.toString().padStart(2, "0"),
                    seconds.toString().padStart(2, "0"),
                ].join(":");
                setTimeLeft(formatted);
            } else if (now >= start && now < end) {
                // Booking is ongoing: countdown until end time
                setPhase("ongoing");
                const diff = end.getTime() - now.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor(
                    (diff % (1000 * 60 * 60)) / (1000 * 60),
                );
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                const formatted = [
                    hours.toString().padStart(2, "0"),
                    minutes.toString().padStart(2, "0"),
                    seconds.toString().padStart(2, "0"),
                ].join(":");
                setTimeLeft(formatted);
            } else {
                // Booking has ended
                setPhase("ended");
                setTimeLeft("00:00:00");
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startTime, endTime]);

    console.log("CountdownTimer timeLeft", timeLeft);

    return (
        <div className="font-mono text-4xl font-bold tracking-wider">
            {phase === "before" && (
                <div className="text-2xl text-yellow-600">
                    Booking starts in {timeLeft}
                </div>
            )}
            {phase === "ongoing" && timeLeft}
            {phase === "ended" && "Booking ended"}
        </div>
    );
}
