import { useEffect, useState } from "react";

const Counter = ({ from = 0, to = 100, duration = 2, tag: Tag, className = ""}) => {
  const [count, setCount] = useState(from);
  const stepTime = (duration * 1000) / (to - from); // Adjust speed

  useEffect(() => {
    let current = from;
    let stepTime = (duration * 1000) / (to - from); // Calculate step time
    const interval = setInterval(() => {
      current++;
      setCount(current);
      if (current >= to) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [from, to, stepTime]);

  return <Tag className={className}>{count}</Tag>;
};

export default Counter;