import React from 'react';
import Image from 'next/image';

/**
 * LoginSVG component that renders a login illustration
 * @returns {JSX.Element} The rendered SVG component
 */
const LoginSVG: React.FC = () => {
  return (
    <Image 
      src="/login.svg" 
      alt="Login illustration"
      width={2500}
      height={1664}
      priority
    />
  );
};

export default LoginSVG; 