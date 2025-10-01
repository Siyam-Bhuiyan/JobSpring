import { TextInput, Button } from "@mantine/core";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { IconBriefcase } from "@tabler/icons-react";

const CertificationInput = (props: any) => {
  const [title, setTitle] = useState(props.initialData?.title || "");
  const [issuer, setIssuer] = useState(props.initialData?.issuer || "");
  const [issued, setIssued] = useState<Date | null>();
  const [credentialId, setCredentialId] = useState(
    props.initialData?.credentialId || ""
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.addd ? "Add " : "Edit "} Certification
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className="flex-1">
          <TextInput
            label="Certification Title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Enter certification name"
            required
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="Company"
            leftSection={<IconBriefcase size={14} />}
            value={issuer}
            onChange={(e) => setIssuer(e.currentTarget.value)}
            placeholder="Company name"
            required
          />
        </div>
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className="flex-1">
          <MonthPickerInput
            label="Issue Date"
            placeholder="Pick Date"
            value={issued}
            required
            onChange={(value) => setIssued(value ? new Date(value) : null)}
          />
        </div>
        <div className="flex-1">
          <TextInput
            label="Certificate ID"
            value={credentialId}
            required
            placeholder="Enter ID"
            onChange={(event) => setCredentialId(event.currentTarget.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => props.setEdit(false)} color="green">Save</Button>
        <Button color="red" variant="outline" onClick={() => props.setEdit(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertificationInput;
