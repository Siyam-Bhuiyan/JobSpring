// import React from "react";
// import { Title, Text, Card, Image, Group, Button } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";
// import Marquee from "react-fast-marquee";

// const companies = [
//   { name: "Google", logo: "https://logo.clearbit.com/google.com", link: "https://google.com" },
//   { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", link: "https://amazon.com" },
//   { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", link: "https://microsoft.com" },
//   { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", link: "https://netflix.com" },
//   { name: "Apple", logo: "https://logo.clearbit.com/apple.com", link: "https://apple.com" },
// ];

// const jobs = [
//   { title: "Frontend Developer", img: "https://source.unsplash.com/400x250/?coding", desc: "React, JS, HTML, CSS" },
//   { title: "Backend Developer", img: "https://source.unsplash.com/400x250/?server", desc: "Node.js, Python, Java" },
//   { title: "Data Scientist", img: "https://source.unsplash.com/400x250/?data", desc: "ML, AI, Python" },
//   { title: "UI/UX Designer", img: "https://source.unsplash.com/400x250/?design", desc: "Figma, Sketch, XD" },
//   { title: "Cloud Engineer", img: "https://source.unsplash.com/400x250/?cloud", desc: "AWS, Azure, GCP" },
// ];

// const Showcase: React.FC = () => {
//   return (
//     <div className="w-full py-10">
//       {/* Trusted by Section */}
//       <div className="text-center mb-12">
//         <Title order={2} fw={700}>Trusted By 1000+ Companies</Title>

//         <Marquee speed={50} gradient={false} className="mt-6">
//           {companies.map((company, index) => (
//             <a
//               href={company.link}
//               key={index}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mx-8 inline-block"
//             >
//               <img src={company.logo} alt={company.name} className="h-12" />
//             </a>
//           ))}
//         </Marquee>
//       </div>

//       {/* Browse Categories Section */}
//       <div className="px-10">
//         <Title order={2} fw={700} className="mb-2">Browse Job Category</Title>
//         <Text c="dimmed" mb={8}>
//           Explore diverse job opportunities tailored to your skills. Start your career journey today!
//         </Text>

//         <Carousel
//           slideSize="25%"

//           slideGap="md"

//           withControls
//           withIndicators
//         >
//           {jobs.map((job, index) => (
//             <Carousel.Slide key={index}>
//               <Card shadow="sm" padding="lg" radius="md" withBorder>
//                 <Card.Section>
//                   <Image src={job.img} height={160} alt={job.title} />
//                 </Card.Section>
//                 <Group justify="space-between" mt="md" mb="xs">
//                   <Text fw={600}>{job.title}</Text>
//                 </Group>
//                 <Text size="sm" c="dimmed">{job.desc}</Text>
//                 <Button variant="light" fullWidth mt="md" radius="md">
//                   Apply Now
//                 </Button>
//               </Card>
//             </Carousel.Slide>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default Showcase;
import { Box, Container, Grid, Title, Text, Card, Group } from "@mantine/core";
import {
  IconCurrencyDollar,
  IconUsers,
  IconSpeakerphone,
  IconCode,
  IconPalette,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import CompanyMarquee from "./CompanyMarquee";
import { companyData } from "../../Data/CompanyData";
import { Link } from "react-router-dom";

const companies = [
  "https://cdn.worldvectorlogo.com/logos/pinterest-3.svg",
  "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg", 
  "https://cdn.worldvectorlogo.com/logos/oracle-6.svg", 
  "https://cdn.worldvectorlogo.com/logos/walmart-4.svg",
  "https://cdn.worldvectorlogo.com/logos/tesla-1.svg",
  "https://cdn.worldvectorlogo.com/logos/ibm.svg",
  "https://cdn.worldvectorlogo.com/logos/airbnb-2.svg",
  

];

const categories = [
  {
    icon: <IconCurrencyDollar size={40} color="black" />,
    title: "Finance",
    desc: "Manage financial records and transactions",
    jobs: "800+ new job posted",
  },
  // {
  //   icon: <IconUsers size={40} color="black" />,
  //   title: "Human Resource",
  //   desc: "Recruit, manage, and support company employees",
  //   jobs: "600+ new job posted",
  // },
  {
    icon: <IconSpeakerphone size={40} color="black" />,
    title: "Digital Marketing",
    desc: "Promote brands online with marketing strategies",
    jobs: "1k+ new job posted",
  },
  {
    icon: <IconCode size={40} color="black" />,
    title: "Web Developer",
    desc: "Build and maintain websites for clients",
    jobs: "2k+ new job posted",
  },
  {
    icon: <IconPalette size={40} color="black" />,
    title: "Arts & Design",
    desc: "Create visual content for branding and media",
    jobs: "500+ new job posted",
  },
];

const CompaniesAndCategories = () => {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);
  return (
    <Box bg="mine-shaft-900" w="100%">
      <Container size="lg" w="100%">
        {/* Trusted Companies */}
        <Title order={1} ta="center" mb="xl" fw={700}>
          Trusted By <span className="text-bright-sun-500">1000+ </span>{" "}
          Companies
        </Title>
        <Group justify="center" gap="xl" w="100%" mb={70} wrap="wrap">
          {companies.map((logo, index) => (
            <Box key={index} w={100} h={40}>
              <img
                src={logo}
                alt="company-logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          ))}
        </Group>
        <div className="flex justify-center">
          {companyData.map((company, index) => (
            <Link
              to={`/login`}
              key={index}
              rel="noopener noreferrer"
              className="mx-8 inline-block"
            >
              <img src={company.logo} alt={company.name} className="h-12" />
            </Link>
          ))}
        </div>

        {/* <CompanyMarquee /> */}

        {/* Job Categories */}
        <Box ta="center" mb={40} mt={60}>
          <Title order={1} fw={700}>
            Browse <span className="text-bright-sun-500">Job</span> Category
          </Title>
          <Text c="mineShaft.4" maw={600} mx="auto" mt="sm">
            Explore diverse job opportunities tailored to your skills. Start
            your career journey today!
          </Text>
        </Box>

        <Grid>
          {categories.map((cat, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }} key={index}>
              <div className="shadow-lg rounded-md border border-bright-sun-500 p-6 text-center bg-transparent hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <Box
                  w={60}
                  h={60}
                  mx="auto"
                  mb="md"
                  className="bg-bright-sun-500 rounded-full flex items-center justify-center "
                >
                  {cat.icon}
                </Box>
                <Text fw={600} fz="lg" mb="xs">
                  {cat.title}
                </Text>
                <Text c="gray.4" fz="sm" mb="md">
                  {cat.desc}
                </Text>
                <Text c="bright-sun-500" fw={500}>
                  {cat.jobs}
                </Text>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CompaniesAndCategories;
