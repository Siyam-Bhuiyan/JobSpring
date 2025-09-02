// CompanyMarquee.tsx
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Box } from "@mantine/core";

const companies = [
  "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  "https://cdn.worldvectorlogo.com/logos/pinterest-3.svg",
  "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
  "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
  "https://cdn.worldvectorlogo.com/logos/oracle-6.svg",
  "https://cdn.worldvectorlogo.com/logos/walmart-4.svg",
  "https://cdn.worldvectorlogo.com/logos/google-icon-1.svg",
  "https://cdn.worldvectorlogo.com/logos/amazon-dark.svg",
];

const CompanyMarquee: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ height: 80 }} />; // placeholder for SSR

  return (
    <Marquee speed={55} gradient={false} pauseOnHover>
      {companies.map((logo, idx) => (
        <Box
          key={idx}
          w={140}
          h={56}
          mx="lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt={`company-${idx}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </Box>
      ))}
    </Marquee>
  );
};

export default CompanyMarquee;
