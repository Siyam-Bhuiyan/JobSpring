import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import ExperienceCard from "../Components/Profile/Experience";
import CertificateCard from "../Components/Profile/Certificate";
import { useAuth } from "../auth/auth";
import { useState } from "react";
import SelectInput from "../Components/Profile/SelectInput";
import fields from "../Data/ProfileData";

const ProfilePage = () => {
  const select = fields;
  const navigate = useNavigate();
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
    // You can add more logic here to handle editing specific sections based on the index
  };
  const talent = {
    id: 1,
    name: "T'Challa",
    role: "Business Analyst",
    company: "Wakanda Tech",
    experience: "3 Years",
    topskills: ["Business Strategy", "Data Modeling", "Agile"],
    about: "Business Analyst bridging business goals and technology solutions.",
    expectedCtc: "32 - 48 LPA",
    location: "Wakanda",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=TChalla",
    coverImage: "https://picsum.photos/id/1099/800/300",
    experienceDetails: [
      {
        company: "Wakanda Tech",
        logo: "https://logo.clearbit.com/google.com",
        role: "Business Analyst",
        duration: "2020 - Present",
        location: "Wakanda",
        description:
          "Managed stakeholder requirements and data-driven strategies.",
      },
    ],
    certifications: [
      {
        title: "Certified Business Analyst Professional",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "IIBA",
        year: "2021",
        issued: "2021",
        credentialId: "CBA123",
      },
      {
        title: "Agile Business Analyst",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Scrum Alliance",
        year: "2022",
        issued: "2022",
        credentialId: "ABA123",
      },
    ],
    resume: {
      title: "TChalla_Resume.pdf",
      fileUrl: "/resumes/tchalla.pdf",
    },
  };
  const { user } = useAuth();
  const name = user?.name;
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Page Container */}
        <div className="flex flex-col lg:flex-row gap-6 px-20">
          {/* Left Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="light"
                color="green"
                onClick={() => navigate(-1)}
              >
                <IconArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
            </div>

            <Card className="bg-mine-shaft-800 border-none p-6 rounded-2xl">
              <div>
                {/* Banner & Avatar */}
                <div className="relative">
                  <img
                    className="rounded-t-2xl w-full h-52 object-cover"
                    src={talent.coverImage}
                    alt="banner"
                  />
                  <div className="absolute left-5 -bottom-16 rounded-full h-40 w-40 overflow-hidden bg-mine-shaft-500 border-8 border-mine-shaft-950">
                    <Avatar src={talent.image} size={130} radius="xl" />
                  </div>
                </div>

                <div className="mt-20 px-3">
                  {/* Name and Message Button */}
                  <div className="text-3xl font-semibold flex justify-between items-center">
                    {name}
                    <ActionIcon
                      onClick={() => handleEdit(0)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      {edit[0] ? (
                        <IconDeviceFloppy
                          className="w-4/5 h-4/5 text-mine-shaft-400"
                          stroke={1.5}
                        />
                      ) : (
                        <IconPencil
                          className="w-4/5 h-4/5 text-mine-shaft-400"
                          stroke={1.5}
                        />
                      )}
                    </ActionIcon>
                  </div>
                  {edit[0] ? (
                    <>
                      <div className="flex gap-10 [&>*]:w-1/2">
                        <SelectInput {...select[0]} />
                        <SelectInput {...select[1]} />
                      </div>
                      <SelectInput {...select[2]} />
                    </>
                  ) : (
                    <>
                      {/* Role & Company */}
                      <div className="text-xl flex gap-1 items-center mt-2">
                        <div className="flex items-center gap-1">
                          <IconBriefcase stroke={1.5} /> {talent.role} •{" "}
                          {talent.company}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="text-lg flex gap-1 items-center text-mine-shaft-300 mt-1">
                        <div className="flex items-center gap-1">
                          <IconMapPin stroke={1.5} /> {talent.location}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-mine-shaft-300">{talent.about}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3">
                <div className="text-lg font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-3">
                  {(talent.topskills ?? []).map(
                    (job: string, index: number) => (
                      <Badge
                        key={index}
                        variant="filled"
                        radius="lg"
                        size="lg"
                        color="violet"
                        className="text-black px-3 py-1"
                      >
                        {job}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3 flex flex-col gap-6">
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                {talent.experienceDetails.map((exp, index) => (
                  <div key={index}>
                    <ExperienceCard
                      company={exp.company}
                      role={exp.role}
                      duration={exp.duration}
                      location={exp.location}
                      description={exp.description}
                    />
                  </div>
                ))}
              </div>

              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3 flex flex-col gap-5">
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                {talent.certifications.map((cert) => (
                  <CertificateCard
                    key={cert.credentialId}
                    title={cert.title}
                    issuer={cert.issuer}
                    issued={cert.issued}
                    credentialId={cert.credentialId}
                  />
                ))}
              </div>

              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3">
                <h3 className="text-lg font-semibold mb-2">Resume</h3>
                <p className="text-mine-shaft-300">{talent.resume.title}</p>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
