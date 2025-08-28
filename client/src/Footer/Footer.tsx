import React from "react";
import {
  Grid,
  Text,
  Anchor,
  Group,
  TextInput,
  Button,
  ActionIcon,
  Stack,
} from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandYoutube,
} from "@tabler/icons-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-mine-shaft-950 text-white">
      {/* Newsletter Section */}
      <div className="w-full px-6 py-8" style={{ borderBottom: "1px solid #333" }}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="xl" fw={600}>
              Never Want to Miss a Job Opportunity?
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group wrap="nowrap">
              <TextInput
                placeholder="Your email address"
                radius="md"
                style={{ flex: 1 }}
              />
              <Button radius="md" color="yellow">
                Subscribe
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </div>

      {/* Links Section */}
      <div className="w-full px-12 py-12">
        <Group  align="flex-start" grow gap="xl">
          {/* Contact */}
          <Stack style={{ minWidth: 400 }}>
            <Text fw={600} mb="sm">
              Contact Us
            </Text>
            <Text size="sm">Islamic University of Technology</Text>
            <Text size="sm">Board Bazar, Gazipur, Dhaka</Text>
            <Text size="sm">Post Code: 1704</Text>
            <Text size="sm" mt="sm">
              📞 +88 01234567890
            </Text>
            <Text size="sm">✉️ idontknow21@iut-dhaka.edu</Text>
            <Group mt="md">
              <ActionIcon component="a" href="#" variant="subtle" color="blue">
                <IconBrandLinkedin size={20} />
              </ActionIcon>
              <ActionIcon component="a" href="#" variant="subtle" color="pink">
                <IconBrandInstagram size={20} />
              </ActionIcon>
              <ActionIcon component="a" href="#" variant="subtle" color="gray">
                <IconBrandGithub size={20} />
              </ActionIcon>
              <ActionIcon component="a" href="#" variant="subtle" color="red">
                <IconBrandYoutube size={20} />
              </ActionIcon>
            </Group>
          </Stack>

          {/* Product */}
          <Stack style={{ minWidth: 200 }}>
            <Text fw={600} mb="sm">
              Product
            </Text>
            <Anchor href="/privacy-policy" c="gray.3">
              Find Job
            </Anchor>
            <Anchor href="/refund-policy" c="gray.3">
              Find Company
            </Anchor>
            <Anchor href="/shipping-policy" c="gray.3">
              Find Employee
            </Anchor>
          </Stack>

          {/* Company */}
          <Stack style={{ minWidth: 200 }}>
            <Text fw={600} mb="sm">
              Company
            </Text>
            <Anchor href="/about" c="gray.3">
              About Us
            </Anchor>
            <Anchor href="/contact" c="gray.3">
              Contact Us
            </Anchor>
            <Anchor href="/faq" c="gray.3">
              Privacy Policy
            </Anchor>
            <Anchor href="/faq" c="gray.3">
              Terms and Conditions
            </Anchor>
          </Stack>

          {/* Support */}
          <Stack style={{ minWidth: 200 }}>
            <Text fw={600} mb="sm">
              Support
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
        </Group>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-6 py-6" style={{ borderTop: "1px solid #333" }}>
        <Text size="sm" ta="center" c="dimmed">
          © {new Date().getFullYear()} | Powered by <strong>Team I Dont Know</strong>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
