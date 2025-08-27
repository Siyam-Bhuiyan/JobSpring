import React from "react";
import {
  Container,
  Grid,
  Text,
  Anchor,
  Group,
  TextInput,
  Button,
  ActionIcon,
  Stack,
  Flex,
} from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandYoutube,
} from "@tabler/icons-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-pharlap-950 px-6 text-white">
      {/* Newsletter Section */}
      <Container size="lg" py="lg" style={{ borderBottom: "1px solid #333" }}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="xl" fw={600}>
              Sign up for our Newsletter
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group wrap="nowrap">
              <TextInput
                placeholder="Your email address"
                radius="md"
                style={{ flex: 1 }}
              />
              <Button radius="md" color="blue">
                Subscribe
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Links Section */}
      <Container size="lg" py="xl">
        <Flex justify="space-between" wrap="wrap" gap="xl">
          <div className="flex p-4">
            {/* Contact */}
            <Stack style={{ minWidth: 350 }}>
              <Text fw={600} mb="sm">
                Contact Us
              </Text>
              <Text size="sm">Islamic University of Technology</Text>
              <Text size="sm">Board Bazar, Gazipur, Dhaka</Text>
              <Text size="sm">Post Code: 1704</Text>
              <Text size="sm" mt="sm">
                📞 +88 01234567890
              </Text>
              <Text size="sm">✉️ sadiaafrin21@iut-dhaka.edu</Text>
              <Group mt="md">
                <ActionIcon
                  component="a"
                  href="#"
                  variant="subtle"
                  color="blue"
                >
                  <IconBrandLinkedin size={20} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="#"
                  variant="subtle"
                  color="pink"
                >
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="#"
                  variant="subtle"
                  color="gray"
                >
                  <IconBrandGithub size={20} />
                </ActionIcon>
                <ActionIcon component="a" href="#" variant="subtle" color="red">
                  <IconBrandYoutube size={20} />
                </ActionIcon>
              </Group>
            </Stack>

            {/* Information */}
            <Stack style={{ minWidth: 200 }}>
              <Text fw={600} mb="sm">
                Information
              </Text>
              <Anchor href="/privacy-policy" c="gray.3">
                Privacy Policy
              </Anchor>
              <Anchor href="/refund-policy" c="gray.3">
                Refund Policy
              </Anchor>
              <Anchor href="/shipping-policy" c="gray.3">
                Shipping Policy
              </Anchor>
              <Anchor href="/term-conditions" c="gray.3">
                Terms & Conditions
              </Anchor>
              <Anchor href="/blogs" c="gray.3">
                Blogs
              </Anchor>
            </Stack>

            {/* Account */}
            <Stack style={{ minWidth: 200 }}>
              <Text fw={600} mb="sm">
                Account
              </Text>
              <Anchor href="/about" c="gray.3">
                About Us
              </Anchor>
              <Anchor href="/faq" c="gray.3">
                FAQ
              </Anchor>
              <Anchor href="/contact" c="gray.3">
                Contact
              </Anchor>
            </Stack>

            {/* Quick Links */}
            <Stack style={{ minWidth: 200 }}>
              <Text fw={600} mb="sm">
                Quick Check
              </Text>
              <Anchor href="#" c="gray.3">
                Jobs
              </Anchor>
              <Anchor href="#" c="gray.3">
                Blogs
              </Anchor>
              <Anchor href="#" c="gray.3">
                Companies
              </Anchor>
              <Anchor href="#" c="gray.3">
                Applications
              </Anchor>
            </Stack>
          </div>
        </Flex>
      </Container>

      {/* Bottom Section */}
      <Container size="lg" py="md" style={{ borderTop: "1px solid #333" }}>
        <Text size="sm" ta="center" c="dimmed">
          © {new Date().getFullYear()} | Powered by{" "}
          <strong>Team Taranga</strong>
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
