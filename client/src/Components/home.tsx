import React from "react";
import { Container, Stack, Title, Text, Anchor, Button, Card, Image, Group } from "@mantine/core";
import "../styles/Home.css"

const Home: React.FC = () => {
  return (
    <Container className="home-container">
      {/* Hero Section */}
      <Stack className="hero-section">
        <Title order={1} className="hero-title">
          Welcome to JobSpring
        </Title>
        <Text className="hero-text ">
          Find your dream job or hire top talent from a wide range of industries...
        </Text>
        <Button className="hero-button" >
          Get Started
        </Button>
      </Stack>

      {/* Featured Jobs Section */}
      <Stack className="featured-section">
        <Title order={2} className="section-title">Featured Jobs</Title>
        <Group className="card-group">
          <Card className="job-card">
            <Card.Section>
              <Image src="https://via.placeholder.com/200x150" alt="Software Engineer" />
            </Card.Section>
            <Text className="job-title">Software Engineer</Text>
            <Text className="job-desc">Join a fast-growing tech company and work on exciting projects.</Text>
          </Card>

          <Card className="job-card">
            <Card.Section>
              <Image src="https://via.placeholder.com/200x150" alt="Marketing Specialist" />
            </Card.Section>
            <Text className="job-title">Marketing Specialist</Text>
            <Text className="job-desc">Drive brand growth and digital campaigns for leading companies.</Text>
          </Card>

          <Card className="job-card">
            <Card.Section>
              <Image src="https://via.placeholder.com/200x150" alt="UI/UX Designer" />
            </Card.Section>
            <Text className="job-title">UI/UX Designer</Text>
            <Text className="job-desc">Design engaging interfaces for web and mobile applications.</Text>
          </Card>
        </Group>
      </Stack>

      {/* Quick Links Section */}
      <Stack className="quick-links-section">
        <Title order={2} className="section-title">Quick Links</Title>
        <Group className="links-group">
          <Anchor href="/jobs/it">IT Jobs</Anchor>
          <Anchor href="/jobs/marketing">Marketing</Anchor>
          <Anchor href="/jobs/design">Design</Anchor>
          <Anchor href="/jobs/hr">HR</Anchor>
        </Group>
      </Stack>

      {/* Footer Section */}
      <Stack className="footer-section">
        <Text className="footer-text">© 2025 JobHub. All rights reserved.</Text>
      </Stack>
    </Container>
  );
};

export default Home;
