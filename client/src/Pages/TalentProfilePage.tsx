import { Avatar, Badge, Button, Card, Divider } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconArrowLeft,
  IconBriefcase,
  IconCurrencyDollar,
  IconMapPin,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { talents } from "../Data/TalentData";
import RecommandedTalents from "../Components/FindTalent/RecommandedTalents";
import ExperienceCard from "../Components/FindTalent/Experience";
import CertificateCard from "../Components/FindTalent/Certificate";

const TalentProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const talent = talents.find((j) => j.id === Number(id));

  if (!talent) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
        <Divider size="xs" mx="md" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Job Seeker Not Found</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Page Container */}
        <div className="flex flex-col lg:flex-row gap-6">
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
                    <Avatar
                      src={talent.image}
                      size={130}
                      radius="xl"
                    />
                  </div>
                </div>

                <div className="mt-20 px-3">
                  {/* Name and Message Button */}
                  <div className="text-3xl font-semibold flex justify-between items-center">
                    {talent.name}
                    <Button color="green" variant="light">
                      Message
                    </Button>
                  </div>

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
                </div>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <IconMapPin className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Location</p>
                  <p className="font-medium">{talent.location}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconBriefcase className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Experience</p>
                  <p className="font-medium">{talent.experience} Years</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconCurrencyDollar className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Expected CTC</p>
                  <p className="font-medium">{talent.expectedCtc}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconUser className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Role</p>
                  <p className="font-medium">{talent.role}</p>
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
                {talent.certifications.map(cert => (
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

          {/* Right Section - Recommended Talents */}
          <div className="flex-1 lg:max-w-sm">
            <RecommandedTalents id={talent.id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TalentProfilePage;
