// import {
//   ActionIcon,
//   Avatar,
//   Badge,
//   Button,
//   Card,
//   Divider,
//   TagsInput,
//   Textarea,
// } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
// import {
//   IconArrowLeft,
//   IconBriefcase,
//   IconCamera,
//   IconDeviceFloppy,
//   IconMapPin,
//   IconPencil,
//   IconPlus,
// } from "@tabler/icons-react";
// import { motion } from "framer-motion";
// import ExperienceCard from "../Components/Profile/Experience";
// import { useAuth } from "../auth/auth";
// import { useState } from "react";
// import SelectInput from "../Components/Profile/SelectInput";
// import fields from "../Data/ProfileData";
// import ExperienceInput from "../Components/Profile/ExperienceInput";
// import CertificationCard from "../Components/Profile/Certificate";
// import CertificationInput from "../Components/Profile/CertificationInput";
// import { Paperclip } from "tabler-icons-react";

// const ProfilePage = () => {
//   const select = fields;
//   const navigate = useNavigate();
//   const [edit, setEdit] = useState([false,false, false, false, false, false, false]); // 6 slots now
//   const handleEdit = (index: number) => {
//     const newEdit = [...edit];
//     newEdit[index] = !newEdit[index];
//     setEdit(newEdit);
//   };

//   const talent = {
//     id: 1,
//     name: "T'Challa",
//     role: "Business Analyst",
//     company: "Wakanda Tech",
//     experience: "3 Years",
//     topskills: ["Business Strategy", "Data Modeling", "Agile"],
//     about: "Business Analyst bridging business goals and technology solutions.",
//     expectedCtc: "32 - 48 LPA",
//     location: "Wakanda",
//     image: "https://api.dicebear.com/7.x/adventurer/svg?seed=TChalla",
//     coverImage: "https://picsum.photos/id/1099/800/300",
//     experienceDetails: [
//       {
//         company: "Wakanda Tech",
//         logo: "https://logo.clearbit.com/google.com",
//         role: "Business Analyst",
//         duration: "2020 - Present",
//         location: "Wakanda",
//         description:
//           "Managed stakeholder requirements and data-driven strategies.",
//       },
//       {
//         company: "Google",
//         logo: "https://logo.clearbit.com/google.com",
//         role: "Software Engineer",
//         duration: "2024 - Present",
//         location: "Mountain View, CA",
//         description:
//           "Developed scalable web applications and collaborated on cross-functional teams.",
//       },
//     ],
//     certifications: [
//       {
//         title: "Certified Business Analyst Professional",
//         logo: "https://logo.clearbit.com/google.com",
//         issuer: "IIBA",
//         year: "2021",
//         issued: "Aug 2021",
//         credentialId: "CBA123",
//       },
//       {
//         title: "Agile Business Analyst",
//         logo: "https://logo.clearbit.com/google.com",
//         issuer: "Scrum Alliance",
//         year: "2022",
//         issued: "Sept 2022",
//         credentialId: "ABA123",
//       },
//     ],
//     resume: {
//       title: "TChalla_Resume.pdf",
//       fileUrl: "/resumes/tchalla.pdf",
//     },
//   };

//   const { user } = useAuth();
//   const name = user?.name || talent.name;

//   const [about, setAbout] = useState(talent.about);
//   const [skills, setSkills] = useState(talent.topskills);
//   const [addExp, setAddExp] = useState(false);
//   const [addCert, setAddCert] = useState(false);
//   const [resume, setResume] = useState(talent.resume.title);
//   const [coverImage, setCoverImage] = useState(talent.coverImage);
//   const [avatarImage, setAvatarImage] = useState(talent.image);

//   // handle file upload preview
//   const handleImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: "cover" | "avatar"
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileUrl = URL.createObjectURL(e.target.files[0]);
//       if (type === "cover") setCoverImage(fileUrl);
//       else setAvatarImage(fileUrl);
//     }
//   };
//   return (
//     <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-5">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex flex-col lg:flex-row gap-6 px-20">
//           {/* Left Section */}
//           <div className="flex-1">
//             {/* Header */}
//             <div className="flex items-center gap-4 mb-6">
//               <Button
//                 variant="light"
//                 color="green"
//                 onClick={() => navigate(-1)}
//               >
//                 <IconArrowLeft className="w-5 h-5 mr-2" /> Back
//               </Button>
//             </div>

//             <Card className="bg-mine-shaft-800 border-none p-6 rounded-2xl">
//               {/* Banner & Avatar */}
//               <div className="relative">
//                 <img
//                   className="rounded-t-2xl w-full h-52 object-cover"
//                   src={coverImage}
//                   alt="banner"
//                 />
//                 {/* Edit cover image */}
//                 {edit[6] && (
//                   <label className="absolute top-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer">
//                     <IconCamera className="text-white" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleImageUpload(e, "cover")}
//                     />
//                   </label>
//                 )}

//                 <div className="absolute left-5 -bottom-16 rounded-full h-40 w-40 overflow-hidden bg-mine-shaft-500 border-8 border-mine-shaft-950">
//                   <Avatar src={avatarImage} size={130} radius="xl" />
//                   {/* Edit avatar image */}
//                   {edit[6] && (
//                     <label className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer">
//                       <IconCamera className="text-white w-4 h-4" />
//                       {/* <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleImageUpload(e, "avatar")}
//                       /> */}
//                       <span>{avatarImage || "Upload Avatar"}</span>
//                       <input
//                         type="file"
//                         name="Image"
//                         accept="image/*"
//                         onChange={(e) => setAvatarImage(e.target.files?.[0]?.name || "")}
//                           required
//                           className="hidden"
//                         />
//                     </label>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-20 px-3">
//                 {/* Name & Edit */}
//                 <div className="text-3xl font-semibold flex justify-between items-center">
//                   {name}
//                   <ActionIcon
//                     onClick={() => handleEdit(0)}
//                     variant="subtle"
//                     size="lg"
//                     color="green"
//                   >
//                     {edit[0] ? (
//                       <IconDeviceFloppy stroke={1.5} />
//                     ) : (
//                       <IconPencil stroke={1.5} />
//                     )}
//                   </ActionIcon>
//                 </div>
//                 {edit[0] ? (
//                   <div className="flex gap-6 flex-wrap mt-3">
//                     <SelectInput {...select[0]} />
//                     <SelectInput {...select[1]} />
//                     <SelectInput {...select[2]} />
//                   </div>
//                 ) : (
//                   <>
//                     <div className="text-xl flex gap-1 items-center mt-2">
//                       <IconBriefcase stroke={1.5} /> {talent.role} •{" "}
//                       {talent.company}
//                     </div>
//                     <div className="text-lg flex gap-1 items-center text-mine-shaft-300 mt-1">
//                       <IconMapPin stroke={1.5} /> {talent.location}
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* About */}
//               <Divider size="xs" mx="md" className="my-4" />
//               <div className="mt-6 px-3 ">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold mb-2">About</h3>
//                   <ActionIcon
//                     onClick={() => handleEdit(1)}
//                     variant="subtle"
//                     size="lg"
//                     color="green"
//                   >
//                     {edit[1] ? <IconDeviceFloppy /> : <IconPencil />}
//                   </ActionIcon>
//                 </div>
//                 {edit[1] ? (
//                   <Textarea
//                     className="w-full rounded-lg"
//                     value={about}
//                     autosize
//                     placeholder="Write something about yourself..."
//                     minRows={3}
//                     onChange={(e) => setAbout(e.currentTarget.value)}
//                   />
//                 ) : (
//                   <p className="text-mine-shaft-300">{about}</p>
//                 )}
//               </div>

//               {/* Skills */}
//               <Divider size="xs" mx="md" className="my-4" />
//               <div className="mt-6 px-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold mb-2">Skills</h3>
//                   <ActionIcon
//                     onClick={() => handleEdit(2)}
//                     variant="subtle"
//                     size="lg"
//                     color="green"
//                   >
//                     {edit[2] ? <IconDeviceFloppy /> : <IconPencil />}
//                   </ActionIcon>
//                 </div>
//                 {edit[2] ? (
//                   <TagsInput
//                     label="Add your top skills"
//                     placeholder="Add skills"
//                     variant="filled"
//                     value={skills}
//                     onChange={setSkills}
//                   />
//                 ) : (
//                   <div className="flex flex-wrap gap-3">
//                     {skills.map((s, i) => (
//                       <Badge key={i} variant="light" color="violet">
//                         {s}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Experience */}
//               <Divider size="xs" mx="md" className="my-4" />
//               <div className="mt-6 px-3 flex flex-col gap-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold mb-2">Experience</h3>
//                   <div className="flex gap-2">
//                     <ActionIcon
//                       onClick={() => setAddExp(true)}
//                       variant="subtle"
//                       size="lg"
//                       color="green"
//                     >
//                       <IconPlus />
//                     </ActionIcon>
//                     <ActionIcon
//                       onClick={() => handleEdit(3)}
//                       variant="subtle"
//                       size="lg"
//                       color="green"
//                     >
//                       {edit[3] ? <IconDeviceFloppy /> : <IconPencil />}
//                     </ActionIcon>
//                   </div>
//                 </div>

//                 {talent.experienceDetails.map((exp, i) => (
//                   <ExperienceCard
//                     key={i}
//                     {...exp}
//                     editMode={edit[3]} // show edit/delete buttons if true
//                     onDelete={() => {
//                       talent.experienceDetails.splice(i, 1); // remove experience
//                       // trigger rerender by updating state
//                       setEdit([...edit]);
//                     }}
//                   />
//                 ))}
//                 {addExp && <ExperienceInput add setEdit={setAddExp} />}
//               </div>

//               {/* Certifications */}
//               <Divider size="xs" mx="md" className="my-4" />
//               <div className="mt-6 px-3 flex flex-col gap-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold mb-2">Certifications</h3>
//                   <div className="flex gap-2">
//                     <ActionIcon
//                       onClick={() => setAddCert(true)}
//                       variant="subtle"
//                       size="lg"
//                       color="green"
//                     >
//                       <IconPlus />
//                     </ActionIcon>
//                     <ActionIcon
//                       onClick={() => handleEdit(4)}
//                       variant="subtle"
//                       size="lg"
//                       color="green"
//                     >
//                       {edit[4] ? <IconDeviceFloppy /> : <IconPencil />}
//                     </ActionIcon>
//                   </div>
//                 </div>

//                 {talent.certifications.map((cert, i) => (
//                   <CertificationCard
//                     key={i}
//                     {...cert}
//                     editMode={edit[4]} // toggles edit/delete
//                     onDelete={() => {
//                       talent.certifications.splice(i, 1);
//                       setEdit([...edit]); // re-render
//                     }}
//                   />
//                 ))}
//                 {addCert && <CertificationInput addd setEdit={setAddCert} />}
//               </div>

//               {/* Resume */}
//               <Divider size="xs" mx="md" className="my-4" />
//               <div className="mt-6 px-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold mb-2">Resume</h3>
//                   <ActionIcon
//                     onClick={() => handleEdit(5)}
//                     variant="subtle"
//                     size="lg"
//                     color="green"
//                   >
//                     {edit[5] ? <IconDeviceFloppy /> : <IconPencil />}
//                   </ActionIcon>
//                 </div>
//                 {edit[5] ? (
//                   <>
//                     <div className="flex flex-col col-span-2">
//                       <label className="text-sm font-medium mb-1">
//                         Resume/CV <span className="text-red-500">*</span>
//                       </label>
//                       <label className="flex items-center gap-3 bg-mine-shaft-950 p-4 rounded-lg cursor-pointer hover:bg-mine-shaft-600">
//                         <Paperclip className="w-5 h-5 text-green-400" />
//                         <span>{resume || "Upload Resume"}</span>
//                         <input
//                           type="file"
//                           name="resume"
//                           onChange={(e) => setResume(e.target.files?.[0]?.name || "")}
//                           required
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   </>
//                 ) : (
//                   <p className="text-mine-shaft-300">{resume}</p>
//                 )}
//               </div>
//             </Card>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ProfilePage;


import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  TagsInput,
  Textarea,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
  IconCamera,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import ExperienceCard from "../Components/Profile/Experience";
import { useAuth } from "../auth/auth";
import { useState } from "react";
import SelectInput from "../Components/Profile/SelectInput";
import fields from "../Data/ProfileData";
import ExperienceInput from "../Components/Profile/ExperienceInput";
import CertificationCard from "../Components/Profile/Certificate";
import CertificationInput from "../Components/Profile/CertificationInput";
import { Paperclip } from "tabler-icons-react";

const ProfilePage = () => {
  const select = fields;
  const navigate = useNavigate();
  const [edit, setEdit] = useState([false, false, false, false, false, false, false]); // 7 slots now
  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
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
      {
        company: "Google",
        logo: "https://logo.clearbit.com/google.com",
        role: "Software Engineer",
        duration: "2024 - Present",
        location: "Mountain View, CA",
        description:
          "Developed scalable web applications and collaborated on cross-functional teams.",
      },
    ],
    certifications: [
      {
        title: "Certified Business Analyst Professional",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "IIBA",
        year: "2021",
        issued: "Aug 2021",
        credentialId: "CBA123",
      },
      {
        title: "Agile Business Analyst",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Scrum Alliance",
        year: "2022",
        issued: "Sept 2022",
        credentialId: "ABA123",
      },
    ],
    resume: {
      title: "TChalla_Resume.pdf",
      fileUrl: "/resumes/tchalla.pdf",
    },
  };

  const { user } = useAuth();
  const name = user?.name || talent.name;

  const [about, setAbout] = useState(talent.about);
  const [skills, setSkills] = useState(talent.topskills);
  const [addExp, setAddExp] = useState(false);
  const [addCert, setAddCert] = useState(false);
  const [resume, setResume] = useState(talent.resume.title);
  const [coverImage, setCoverImage] = useState(talent.coverImage);
  const [avatarImage, setAvatarImage] = useState(talent.image);

  // handle file upload preview
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "avatar"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      if (type === "cover") setCoverImage(fileUrl);
      else setAvatarImage(fileUrl);
    }
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
              {/* Banner & Avatar */}
              <div className="relative">
                <img
                  className="rounded-t-2xl w-full h-52 object-cover"
                  src={coverImage}
                  alt="banner"
                />
                {/* Edit cover image */}
                {(
                  <label className="absolute top-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer">
                    <IconCamera className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "cover")}
                    />
                  </label>
                )}

                <div className="absolute -bottom-16 rounded-full h-40 w-40 overflow-hidden bg-mine-shaft-500 border-8 border-mine-shaft-950">
                  <Avatar src={avatarImage} size={150} radius="xl"/>
                  {/* Edit avatar image */}
                  {(
                    <label className="absolute bottom-2 right-3 bg-mine-shaft-700 p-2 rounded-full cursor-pointer">
                      <IconCamera className="text-white w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "avatar")}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="mt-20 px-3">
                {/* Name & Edit */}
                <div className="text-3xl font-semibold flex justify-between items-center">
                  {name}
                  <div className="flex gap-2">
                    <ActionIcon
                      onClick={() => handleEdit(0)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      {edit[0] ? (
                        <IconDeviceFloppy stroke={1.5} />
                      ) : (
                        <IconPencil stroke={1.5} />
                      )}
                    </ActionIcon>
                  </div>
                </div>
                {edit[0] ? (
            
                    <div className="grid grid-cols-2 gap-4 mt-3">
                    <SelectInput {...select[0]} />
                    <SelectInput {...select[1]} />
                    <SelectInput {...select[2]} />
                  </div>
                 
                ) : (
                  <>
                    <div className="text-xl flex gap-1 items-center mt-2">
                      <IconBriefcase stroke={1.5} /> {talent.role} •{" "}
                      {talent.company}
                    </div>
                    <div className="text-lg flex gap-1 items-center text-mine-shaft-300 mt-1">
                      <IconMapPin stroke={1.5} /> {talent.location}
                    </div>
                  </>
                )}
              </div>

              {/* About */}
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3 ">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <ActionIcon
                    onClick={() => handleEdit(1)}
                    variant="subtle"
                    size="lg"
                    color="green"
                  >
                    {edit[1] ? <IconDeviceFloppy /> : <IconPencil />}
                  </ActionIcon>
                </div>
                {edit[1] ? (
                  <Textarea
                    className="w-full rounded-lg"
                    value={about}
                    autosize
                    placeholder="Write something about yourself..."
                    minRows={3}
                    onChange={(e) => setAbout(e.currentTarget.value)}
                  />
                ) : (
                  <p className="text-mine-shaft-300">{about}</p>
                )}
              </div>

              {/* Skills */}
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <ActionIcon
                    onClick={() => handleEdit(2)}
                    variant="subtle"
                    size="lg"
                    color="green"
                  >
                    {edit[2] ? <IconDeviceFloppy /> : <IconPencil />}
                  </ActionIcon>
                </div>
                {edit[2] ? (
                  <TagsInput
                    label="Add your top skills"
                    placeholder="Add skills"
                    variant="filled"
                    value={skills}
                    onChange={setSkills}
                  />
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {skills.map((s, i) => (
                      <Badge key={i} variant="light" color="violet">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  <div className="flex gap-2">
                    <ActionIcon
                      onClick={() => setAddExp(true)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      <IconPlus />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => handleEdit(3)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      {edit[3] ? <IconDeviceFloppy /> : <IconPencil />}
                    </ActionIcon>
                  </div>
                </div>

                {talent.experienceDetails.map((exp, i) => (
                  <ExperienceCard
                    key={i}
                    {...exp}
                    editMode={edit[3]}
                    onDelete={() => {
                      talent.experienceDetails.splice(i, 1);
                      setEdit([...edit]);
                    }}
                  />
                ))}
                {addExp && <ExperienceInput add setEdit={setAddExp} />}
              </div>

              {/* Certifications */}
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <div className="flex gap-2">
                    <ActionIcon
                      onClick={() => setAddCert(true)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      <IconPlus />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => handleEdit(4)}
                      variant="subtle"
                      size="lg"
                      color="green"
                    >
                      {edit[4] ? <IconDeviceFloppy /> : <IconPencil />}
                    </ActionIcon>
                  </div>
                </div>

                {talent.certifications.map((cert, i) => (
                  <CertificationCard
                    key={i}
                    {...cert}
                    editMode={edit[4]}
                    onDelete={() => {
                      talent.certifications.splice(i, 1);
                      setEdit([...edit]);
                    }}
                  />
                ))}
                {addCert && <CertificationInput add setEdit={setAddCert} />}
              </div>

              {/* Resume */}
              <Divider size="xs" mx="md" className="my-4" />
              <div className="mt-6 px-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">Resume</h3>
                  <ActionIcon
                    onClick={() => handleEdit(5)}
                    variant="subtle"
                    size="lg"
                    color="green"
                  >
                    {edit[5] ? <IconDeviceFloppy /> : <IconPencil />}
                  </ActionIcon>
                </div>
                {edit[5] ? (
                  <div className="flex flex-col col-span-2">
                    <label className="text-sm font-medium mb-1">
                    </label>
                    <label className="flex items-center gap-3 bg-mine-shaft-950 p-4 rounded-lg cursor-pointer hover:bg-mine-shaft-600">
                      <Paperclip className="w-5 h-5 text-green-400" />
                      <span>{resume || "Upload Resume"}</span>
                      <input
                        type="file"
                        name="resume"
                        onChange={(e) =>
                          setResume(e.target.files?.[0]?.name || "")
                        }
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <p className="text-mine-shaft-300">{resume}</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
