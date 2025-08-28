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
import {
  Box,
  Container,
  Grid,
  Title,
  Text,
  Card,
  Group,
} from "@mantine/core";
import {
  IconCurrencyDollar,
  IconUsers,
  IconSpeakerphone,
  IconCode,
  IconPalette,
} from "@tabler/icons-react";
import React from "react";

const companies = [
  "https://cdn.worldvectorlogo.com/logos/microsoft.svg",
  "https://cdn.worldvectorlogo.com/logos/pinterest-1.svg",
  "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
  "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
  "https://cdn.worldvectorlogo.com/logos/oracle-6.svg",
  "https://cdn.worldvectorlogo.com/logos/walmart.svg",
  "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
  "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
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
  return (
    <Box bg="#2d2d2d" c="white" >
      <Container size="lg">
        {/* Trusted Companies */}
        <Title order={1} ta="center" mb="xl" fw={700}>
          Trusted By <span style={{ color: "#FFD700" }}>1000+ </span> Companies
        </Title>
        <Group justify="center" gap="xl" mb={60} wrap="wrap">
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

        {/* Job Categories */}
        <Box ta="center" mb={40}>
          <Title order={1} fw={700}>
            Browse <span style={{ color: "#FFD700" }}>Job</span> Category
          </Title>
          <Text c="gray.4" maw={600} mx="auto" mt="sm">
            Explore diverse job opportunities tailored to your skills. Start your
            career journey today!
          </Text>
        </Box>

        <Grid>
          {categories.map((cat, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Card
                shadow="sm"
                radius="md"
                withBorder
                p="lg"
                style={{
                  borderColor: "#FFD700",
                  textAlign: "center",
                  background: "transparent",
                }}
              >
                <Box
                  w={60}
                  h={60}
                  mx="auto"
                  mb="md"
                  style={{
                    background: "#FFD700",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cat.icon}
                </Box>
                <Text fw={600} fz="lg" mb="xs" c="white">
                  {cat.title}
                </Text>
                <Text c="gray.4" fz="sm" mb="md">
                  {cat.desc}
                </Text>
                <Text c="yellow" fw={500}>
                  {cat.jobs}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CompaniesAndCategories;
