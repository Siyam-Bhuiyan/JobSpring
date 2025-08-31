import { useParams } from "react-router-dom";
import { Avatar, Badge, Button, Divider, Text } from "@mantine/core";
import RecommandedTalents from "../FindTalent/RecommandedTalents";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { talents } from "../../Data/TalentData";

const ProfilePage = () => {
  const { talentId } = useParams<{ talentId: string }>();

  const talent = talents.find((t) => t.name.replace(/\s/g, "-") === talentId);

  if (!talent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Talent not found</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100vh] bg-mine-shaft-950 font-[Poppins,sans-serif] text-white p-5">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Banner & Avatar */}
          <div className="relative">
            <img
              className="rounded-t-2xl w-full h-52 object-cover"
              src="/src/assets/cover.jpg"
              alt="banner"
            />
            <Avatar
              src={talent.image}
              size={120}
              radius="xl"
              className="absolute -bottom-16 left-5 border-8 border-mine-shaft-950"
            />
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
              <Text className="flex items-center gap-1">
                <IconBriefcase stroke={1.5} /> {talent.role} • {talent.company}
              </Text>
            </div>

            {/* Location */}
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300 mt-1">
              <Text className="flex items-center gap-1">
                <IconMapPin stroke={1.5} /> {talent.location}
              </Text>
            </div>
          </div>

          <Divider size="xs" mx="md" className="my-4" />

          {/* About */}
          <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5">
            <div className="text-lg font-semibold mb-3">About</div>
            <div className="text-sm text-mine-shaft-300">{talent.about}</div>
          </div>

          {/* Skills */}
          <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5">
            <div className="text-lg font-semibold mb-3">Skills</div>
            <div className="flex flex-wrap gap-3">
              {talent.topskills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="filled"
                  radius="sm"
                  color="violet"
                  className="text-black px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience / Certifications / Resume */}
          {["Experience", "Certifications", "Resume"].map((section, idx) => (
            <div
              key={idx}
              className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5"
            >
              <div className="text-lg font-semibold mb-3">{section}</div>
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <Avatar src={talent.image} size={50} radius="xl" />
                  <div>
                    <div className="text-lg font-semibold">{talent.name}</div>
                    <Text size="sm" className="text-gray-400">
                      {talent.role} • {talent.company}
                    </Text>
                  </div>
                </div>
                <div className="text-sm">Jan 2018 - March 2022</div>
              </div>
              <div className="text-gray-400 text-sm line-clamp-3 mb-6">
                {talent.about}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - Recommended Talents */}
        <div className="flex-1 lg:max-w-sm">
          <RecommandedTalents id={talent.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
